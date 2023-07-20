import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RssFeed } from '../../models/RssFeed';
import { catchError } from 'rxjs/operators';
import { APP_ROUTES_API } from '../../../data/apiRoutes';
import { RssItem, RssResponse } from '../../interface/rss.interface';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private rssFeedsUpdatedSubject: Subject<void> = new Subject<void>();
  private _rssFeeds: RssFeed[] = [];
  private _rssDataItems: RssItem[] = [];

  get rssFeeds(): RssFeed[] {
    return this._rssFeeds;
  }

  set rssFeeds(value: RssFeed[]) {
    this._rssFeeds = value;
  }

  get rssDataItems(): RssItem[] {
    return this._rssDataItems;
  }

  set rssDataItems(value: RssItem[]) {
    this._rssDataItems = value;
  }

  constructor(private http: HttpClient) {}

  getAllRssFeeds(): Observable<RssFeed[]> {
    return this.http.get<RssFeed[]>(APP_ROUTES_API.RSS);
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
  addRssLink(rssFeed: { url: string; title: string }): Observable<RssFeed> {
    return this.http.post<RssFeed>(APP_ROUTES_API.RSS, rssFeed).pipe(
      catchError((error: any) => {
        console.error("Une erreur s'est produite lors de la requête POST", error);
        throw error;
      })
    );
  }

  deleteRssFeed(feedId: number | undefined) {
    return this.http.delete(`${APP_ROUTES_API.RSS}/${feedId}`) as Observable<RssFeed>;
  }
  
  updateRssFeed(feedId: number | undefined, updateData: RssFeed): Observable<RssFeed> {
    const url = `${APP_ROUTES_API.RSS}/${feedId}`;
    return this.http.put<RssFeed>(url, updateData );
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

  sortRssDataItemsByDate(rssDataItems: RssItem[]): void {
    rssDataItems.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      return dateB.getTime() - dateA.getTime();
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
