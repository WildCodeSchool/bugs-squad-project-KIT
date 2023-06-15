import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  rssLinks: string[] = ['http://www.alsacreations.com/rss/actualites.xml'];
  constructor(private http: HttpClient) {}
  addRssLink(link: string): void {
    this.rssLinks.push(link);
  }
  getRssLinks(): string[] {
    return this.rssLinks;
  }
  getRssData(url: string): Observable<any> {
    const rssApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${url}`;
    return this.http.get(rssApiUrl);
  }
}
