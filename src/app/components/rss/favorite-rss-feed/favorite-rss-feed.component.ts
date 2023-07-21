import { Component } from '@angular/core';
import { RssFeedService } from '../../../services/rssService/rss.service';
import { RssFeed } from '../../../models/RssFeed';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-rss-feed',
  templateUrl: './favorite-rss-feed.component.html',
  styleUrls: ['./favorite-rss-feed.component.scss'],
})
export class FavoriteRssFeedComponent {
  favoriteRssFeeds: RssFeed[] = [];

  constructor(public rssService: RssFeedService, private router: Router) {}

  ngOnInit(): void {
    this.rssService.getFavoriteRssFeeds().subscribe({
      next: (rssFeeds: RssFeed[]) => {
        this.favoriteRssFeeds = rssFeeds;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  selectedRssFeed(data: RssFeed): void {
    this.rssService.selectedRssFeed = data;
    this.router.navigate(['/rss']);
  }
}
