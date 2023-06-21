import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  rssLinks: string[] = [
    'https://news.ycombinator.com/rss',
    'https://openai.com/blog/rss.xml',
    'https://css-tricks.com/feed/',
    'https://www.webdesignernews.com/feed',
  ];
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
