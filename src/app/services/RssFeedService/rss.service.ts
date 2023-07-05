import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  rssLinks: string[] = [
    'https://sharadcodes.github.io/feed.xml',
    'https://openai.com/blog/rss.xml',
    'https://css-tricks.com/feed/',
    'https://www.webdesignernews.com/feed',
  ];
  private apiKey = 'ocgvg1llehvfjejyglkyv9xjx9uqb9nfgtntlay3';
  constructor(private http: HttpClient) {}
  addRssLink(link: string): void {
    this.rssLinks.push(link);
  }
  getRssLinks(): string[] {
    return this.rssLinks;
  }
  getRssData(url: string, count?: number, orderBy?: string): Observable<any> {
    let rssApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${url}&api_key=${this.apiKey}`;
    if (count) {
      rssApiUrl += `&count=${count}`;
    }
    if (orderBy) {
      rssApiUrl += `&order_by=${orderBy}`;
    }
    return this.http.get(rssApiUrl);
  }

  addFeedTitleToItems(rssData: any): void {
    if (Array.isArray(rssData?.items)) {
      const feedTitle = rssData.feed.title;
      rssData.items.forEach((item: any): void => {
        item.feedTitle = feedTitle;
      });
    }
  }

  sortRssDataItemsByDate(rssDataItems: any[]): void {
    rssDataItems?.sort((a, b) => {
      const dateA: Date = new Date(a.pubDate);
      const dateB: Date = new Date(b.pubDate);
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
