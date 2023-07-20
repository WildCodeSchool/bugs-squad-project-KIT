import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RssModalComponent } from '../../components/modals/rss-modal/rss-modal.component';
import { RssFeedService } from '../../services/rssService/rss.service';
import { ToastrService } from 'ngx-toastr';
import { RssFeed } from '../../models/RssFeed';
import { RssResponse } from '../../interface/rss.interface';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss'],
})
export class RssComponent {
  isLargeScreen = true;
  feedSelected!: RssFeed;

  constructor(private dialog: MatDialog, public rssService: RssFeedService, private toastr: ToastrService) {
    this.checkScreenSize();
  }

  onFeedSelected(feed: RssFeed): void {
    this.feedSelected = feed;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 600;
  }
  ngOnInit(): void {
    this.loadRssFeeds();
  }
  loadRssFeeds(): void {
    this.rssService.getAllRssFeeds().subscribe({
      next: (rssFeeds: RssFeed[]): void => {
        this.rssService.rssFeeds = rssFeeds;
        this.loadRssDataItems();
      },
      error: (error: any): void => {
        console.error('Erreur lors de la récupération des flux RSS', error);
      },
    });
  }
  loadRssDataItems(): void {
    this.rssService.rssDataItems = [];
    this.rssService.rssFeeds.forEach((rssFeed: RssFeed) => {
      const url = rssFeed.url;
      this.rssService.getRssData(url).subscribe({
        next: (response: RssResponse): void => {
          if (response) {
            this.rssService.addFeedTitleFaviconToItems(response);
            this.rssService.rssDataItems.push(...response.items);
            this.rssService.sortRssDataItemsByDate(this.rssService.rssDataItems);
          }
        },
      });
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(RssModalComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rssService.getRssData(result).subscribe({
          next: (response: RssResponse): void => {
            if (response) {
              const updatedResult = {
                url: result,
                title: response.feed.title,
              };
              this.rssService.addRssLink(updatedResult).subscribe({
                next: (postResponse: RssFeed): void => {
                  this.toastr.success('Le flux ' + response.feed.title + ' est ajouté!', 'Succès!!');
                  this.updateRssData();
                },
                error: (postError: any): void => {
                  this.toastr.error("Une erreur s'est produite lors de l'enregistrement du flux Rss", 'Erreur!!');
                  console.error("Une erreur s'est produite lors de la requête POST", postError);
                },
              });
            }
          },
          error: (error: any): void => {
            this.toastr.error("L'URL du flux RSS n'est pas valide", 'Erreur!!');
            console.error("L'URL du flux RSS n'est pas valide", error);
          },
        });
      }
    });
  }

  private updateRssData(): void {
    this.loadRssFeeds();
    this.rssService.sortRssDataItemsByDate(this.rssService.rssDataItems);
  }
}
