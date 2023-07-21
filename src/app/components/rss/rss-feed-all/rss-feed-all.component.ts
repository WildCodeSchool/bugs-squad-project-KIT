import { Component, Input, OnInit } from '@angular/core';
import { RssFeedService } from '../../../services/rssService/rss.service';
import { RssItem } from '../../../interface/rss.interface';

@Component({
  selector: 'app-rss-feed-all',
  templateUrl: './rss-feed-all.component.html',
  styleUrls: ['./rss-feed-all.component.scss'],
})
export class RssFeedAllComponent implements OnInit {
  @Input() rssDataItems!: RssItem[];

  constructor(public rssService: RssFeedService) {}

  ngOnInit(): void {
    this.subscribeToRssFeedsUpdated();
  }

  subscribeToRssFeedsUpdated(): void {
    this.rssService.onRssFeedsUpdated().subscribe(() => {});
  }

  getClean(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }
}
