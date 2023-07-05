import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/rss.service';

@Component({
  selector: 'app-rss-feed-all',
  templateUrl: './rss-feed-all.component.html',
  styleUrls: ['./rss-feed-all.component.scss'],
})
export class RssFeedAllComponent {
  @Input() rssLink!: string[];
  rssDataItems?: any[] = [];

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.getRssData();
  }

  getRssData() {
    this.rssLink.forEach((link: string) => {
      this.rssFeedService.getRssData(link).subscribe({
        next: (response: any) => {
          const rssData = response;
          this.addFeedTitleToItems(rssData);
          this.rssDataItems?.push(...rssData.items);
          this.sortRssDataItemsByDate();
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération du flux RSS', error);
        },
      });
    });
  }

  //Add feed title to each list item
  addFeedTitleToItems(rssData: any) {
    if (Array.isArray(rssData?.items)) {
      const feedTitle = rssData.feed.title;
      rssData.items.forEach((item: any) => {
        item.feedTitle = feedTitle;
      });
    }
  }
  //Allows you to sort the table according to publication dates
  sortRssDataItemsByDate() {
    this.rssDataItems?.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  // Clean HTML tag descriptions
  getClean(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }
  // Format date in French format
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
