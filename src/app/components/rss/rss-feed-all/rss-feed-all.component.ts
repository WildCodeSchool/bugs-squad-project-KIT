import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/RssFeedService/rss.service';
import { Observable } from 'rxjs';
import {RssFeed} from "../../../models/RssFeed";

@Component({
  selector: 'app-rss-feed-all',
  templateUrl: './rss-feed-all.component.html',
  styleUrls: ['./rss-feed-all.component.scss'],
})
export class RssFeedAllComponent {
  rssLink!: string[];
  rssDataItems: any[] = [];

  constructor(public rssFeedService: RssFeedService) {}

  ngOnInit(): void {
    this.rssFeedService.getAllRssFeeds().subscribe({
      next: (response: RssFeed[]): void => {
        this.rssLink = response.map((rssFeed: RssFeed) => rssFeed.url);
        this.getRssData();
      },
      error: (error: any): void => {
        console.error('Erreur lors de la récupération des flux RSS', error);
      },
    });
  }
  getRssData(): void {
    this.rssLink.forEach((link: string) => {
      this.rssFeedService.getRssData(link, 20).subscribe({
        next: (response: any): void => {
          const rssData = response;
          this.rssFeedService.addFeedTitleToItems(rssData);
          this.rssDataItems?.push(...rssData.items);
          this.rssFeedService.sortRssDataItemsByDate(this.rssDataItems);
        },
        error: (error: any): void => {
          console.error('Erreur lors de la récupération du flux RSS', error);
        },
      });
    });
  }
  getClean(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }
}
