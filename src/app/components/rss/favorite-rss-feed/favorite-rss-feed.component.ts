import { Component } from '@angular/core';
import { RssFeedService } from '../../../services/rssService/rss.service';
import { RssFeed } from '../../../models/RssFeed';
import { RssDataFeed, RssResponse } from '../../../interface/rss.interface';

@Component({
  selector: 'app-favorite-rss-feed',
  templateUrl: './favorite-rss-feed.component.html',
  styleUrls: ['./favorite-rss-feed.component.scss'],
})
export class FavoriteRssFeedComponent {
  favoriteRssFeeds: RssFeed[] = [];
  favoriteRssFeedsData: RssDataFeed[] = [];

  constructor(public rssService: RssFeedService) {}

  ngOnInit(): void {
    this.rssService.getFavoriteRssFeeds().subscribe({
      next: (rssFeeds: RssFeed[]) => {
        this.favoriteRssFeeds = rssFeeds;
        this.favoriteRssFeeds.forEach((rssFeed: RssFeed) => {
          this.rssService.getRssData(rssFeed.url).subscribe({
            next: (rssData: RssResponse) => {
              this.favoriteRssFeedsData.push(rssData.feed);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        });
        console.log(this.favoriteRssFeedsData);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
