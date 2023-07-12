import { Component } from '@angular/core';
import { RssFeedService } from '../../../services/rssFeedService/rss.service';
import { RssFeed } from '../../../models/RssFeed';
import { RssResponse } from '../../../interface/RssResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar-rss-feed',
  templateUrl: './sidebar-rss-feed.component.html',
  styleUrls: ['./sidebar-rss-feed.component.scss'],
})
export class SidebarRssFeedComponent {
  isOpen = false;
  rssFeed!: RssFeed[];
  rssData: any[] = [];
  constructor(public rssFeedService: RssFeedService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getRssData();
    this.subscribeToRssFeedsUpdated();
  }

  getRssData(): void {
    this.rssFeedService.getAllRssFeeds().subscribe({
      next: (response: RssFeed[]): void => {
        this.rssFeed = response;
        this.fetchRssData();
      },
      error: (error: any): void => {
        console.error('Erreur lors de la récupération des flux RSS', error);
      },
    });
  }
  fetchRssData(): void {
    this.rssFeed.forEach((rssFeed: RssFeed) => {
      this.rssFeedService.getRssData(rssFeed.url).subscribe({
        next: (response: RssResponse): void => {
          const modifiedResponse = { ...response.feed, id: rssFeed.id };
          this.rssData?.push(modifiedResponse);
          console.log(this.rssData);
        },
        error: (error: any): void => {
          console.error('Erreur lors de la récupération du flux RSS', error);
        },
      });
    });
  }
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  subscribeToRssFeedsUpdated(): void {
    this.rssFeedService.onRssFeedsUpdated().subscribe(() => {
      this.getRssData();
    });
  }
  deleteRssFeed(id: number) {
    const confirmMessage = 'Êtes-vous sûr de vouloir supprimer ce flux RSS ?';
    if (confirm(confirmMessage)) {
      this.rssFeedService.deleteRssFeed(id).subscribe(() => {
        const index = this.rssData.findIndex((feed) => feed.id === id);
        if (index !== -1) {
          this.rssData.splice(index, 1);
        }
        this.toastr.success('Le flux a été supprimé !');
      });
    }
  }
}
