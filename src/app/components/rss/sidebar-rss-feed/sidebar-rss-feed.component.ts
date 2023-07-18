import { Component } from '@angular/core';
import { RssFeedService } from '../../../services/RssFeedService/rss.service';
import { RssFeed } from '../../../models/RssFeed';
import { RssResponse } from '../../../interface/RssResponse';

@Component({
  selector: 'app-sidebar-rss-feed',
  templateUrl: './sidebar-rss-feed.component.html',
  styleUrls: ['./sidebar-rss-feed.component.scss'],
})
export class SidebarRssFeedComponent {
  isOpen = false;
  rssLink!: string[];
  rssData: any[] = [];
  constructor(public rssFeedService: RssFeedService) {}
  ngOnInit(): void {
    this.getRssData();
    this.subscribeToRssFeedsUpdated();
  }

  getRssData(): void {
    this.rssFeedService.getAllRssFeeds().subscribe({
      next: (response: RssFeed[]): void => {
        this.rssLink = response.map((rssFeed: RssFeed) => rssFeed.url);
        this.fetchRssData();
      },
      error: (error: any): void => {
        console.error('Erreur lors de la récupération des flux RSS', error);
      },
    });
  }
  fetchRssData(): void {
    this.rssLink.forEach((link: string) => {
      this.rssFeedService.getRssData(link).subscribe({
        next: (response: RssResponse): void => {
          this.rssData?.push(response.feed);
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
}
