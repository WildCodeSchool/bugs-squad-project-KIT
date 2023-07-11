import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RssFeed } from '../../models/RssFeed';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  rssLinks: string[] = [];
  private apiUrl = 'http://localhost:8080/api/rssFeeds';
  private rssFeedsUpdatedSubject: Subject<void> = new Subject<void>();
  constructor(private http: HttpClient) {}
  addRssLink(url: string): Observable<any> {
    const rssFeedData: { url: string } = { url: url };
    return this.http.post(this.apiUrl, rssFeedData).pipe(
      catchError((error: any) => {
        console.error("Une erreur s'est produite lors de la requête POST", error);
        throw error;
      })
    );
  }
  getAllRssFeeds(): Observable<RssFeed[]> {
    return this.http.get<RssFeed[]>(this.apiUrl);
  }

  getRssData(url: string, count?: number, orderBy?: string): Observable<any> {
    let rssApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${url}&api_key=${environment.keyApi}`;
    if (count) {
      rssApiUrl += `&count=${count}`;
    }
    if (orderBy) {
      rssApiUrl += `&order_by=${orderBy}`;
    }
    return this.http.get(rssApiUrl);
  }

  addFeedTitleFaviconToItems(rssData: any): void {
    if (Array.isArray(rssData?.items)) {
      const feedTitle = rssData.feed.title;
      const feedFavicon = rssData.feed.image;
      rssData.items.forEach((item: any): void => {
        item.feedTitle = feedTitle;
        item.feedFavicon = feedFavicon;
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
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  rssFeedsUpdated(): void {
    this.rssFeedsUpdatedSubject.next();
  }

  onRssFeedsUpdated(): Observable<void> {
    return this.rssFeedsUpdatedSubject.asObservable();
  }
}
