import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../../../services/rssFeedService/rss.service';
import { RssFeed } from '../../../models/RssFeed';

@Component({
  selector: 'app-rss-feed-all',
  templateUrl: './rss-feed-all.component.html',
  styleUrls: ['./rss-feed-all.component.scss'],
})
export class RssFeedAllComponent implements OnInit {
  rssLink!: string[];
  rssDataItems: any[] = [];

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
        next: (response: any): void => {
          const rssData = response;
          this.rssFeedService.addFeedTitleFaviconToItems(rssData);
          this.rssDataItems?.push(...rssData.items);
          this.rssFeedService.sortRssDataItemsByDate(this.rssDataItems);
        },
        error: (error: any): void => {
          console.error('Erreur lors de la récupération du flux RSS', error);
        },
      });
    });
  }

  subscribeToRssFeedsUpdated(): void {
    this.rssFeedService.onRssFeedsUpdated().subscribe(() => {
      this.getRssData();
    });
  }

  getClean(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }
}
