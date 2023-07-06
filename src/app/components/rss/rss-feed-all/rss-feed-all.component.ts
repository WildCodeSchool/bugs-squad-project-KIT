import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/RssFeedService/rss.service';

@Component({
  selector: 'app-rss-feed-all',
  templateUrl: './rss-feed-all.component.html',
  styleUrls: ['./rss-feed-all.component.scss'],
})
export class RssFeedAllComponent {
  @Input() rssLink!: string[];
  rssDataItems: any[] = [];

  constructor(public rssFeedService: RssFeedService) {}

  ngOnInit(): void {
    this.getRssData();
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
