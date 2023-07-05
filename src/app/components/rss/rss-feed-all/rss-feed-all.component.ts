import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/rss.service';

@Component({
  selector: 'app-rss-feed-all',
  templateUrl: './rss-feed-all.component.html',
  styleUrls: ['./rss-feed-all.component.scss'],
})
export class RssFeedAllComponent {
  @Input() rssLink!: string[];
  rssData?: any;
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
  sortRssDataItemsByDate() {
    this.rssDataItems?.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);

      if (dateA > dateB) {
        return -1; // a vient avant b
      } else if (dateA < dateB) {
        return 1; // b vient avant a
      } else {
        return 0; // les dates sont égales
      }
    });
  }
  // Clean HTML tag descriptions
  getClean(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
