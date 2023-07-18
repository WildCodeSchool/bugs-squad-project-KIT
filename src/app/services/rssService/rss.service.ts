import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RssFeed } from '../../models/RssFeed';
import { catchError } from 'rxjs/operators';
import { APP_ROUTES_API } from '../../../data/apiRoutes';
import { RssDataFeeds, RssDataItems, RssResponse } from '../../interface/rss.interface';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private rssFeedsUpdatedSubject: Subject<void> = new Subject<void>();
  private _rssFeeds!: RssFeed;
  private _rssDataFeeds: RssDataFeeds[] = [];
  private _rssDataItems: RssDataItems[] = [];

  get rssFeeds(): RssFeed {
    return this._rssFeeds;
  }

  set rssFeeds(value: RssFeed) {
    this._rssFeeds = value;
  }

  get rssDataFeeds(): RssDataFeeds[] {
    return this._rssDataFeeds;
  }

  set rssDataFeeds(value: RssDataFeeds[]) {
    this._rssDataFeeds = value;
  }

  get rssDataItems(): RssDataItems[] {
    return this._rssDataItems;
  }

  set rssDataItems(value: RssDataItems[]) {
    this._rssDataItems = value;
  }

  constructor(private http: HttpClient) {}

  getAllRssFeeds(): Observable<RssFeed> {
    return this.http.get<RssFeed>(APP_ROUTES_API.RSS);
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
  addRssLink(url: string): Observable<RssFeed> {
    const rssFeedData: { url: string } = { url: url };
    return this.http.post<RssFeed>(APP_ROUTES_API.RSS, rssFeedData).pipe(
      catchError((error: any) => {
        console.error("Une erreur s'est produite lors de la requête POST", error);
        throw error;
      })
    );
  }

  deleteRssFeed(id: number | undefined): Observable<any> {
    return this.http.delete(APP_ROUTES_API.RSS + `/${id}`);
  }

  addFeedTitleFaviconToItems(rssData: RssResponse): void {
    if (Array.isArray(rssData?.items)) {
      const feedTitle = rssData.feed.title;
      const feedFavicon = rssData.feed.image;
      rssData.items.forEach(
        (item: { title: string; pubDate: string; link: string; feedTitle?: string; feedFavicon?: string }) => {
          item.feedTitle = feedTitle;
          item.feedFavicon = feedFavicon;
        }
      );
    }
  }

  sortRssDataItemsByDate(rssDataItems: RssDataItems[]): void {
    rssDataItems.forEach((rssDataItem) => {
      rssDataItem.items.sort((a, b) => {
        const dateA = new Date(a.pubDate);
        const dateB = new Date(b.pubDate);
        return dateB.getTime() - dateA.getTime();
      });
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
