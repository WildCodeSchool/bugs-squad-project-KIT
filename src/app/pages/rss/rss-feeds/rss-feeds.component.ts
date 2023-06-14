import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/rss.service';

@Component({
  selector: 'app-rss-feeds',
  templateUrl: './rss-feeds.component.html',
  styleUrls: ['./rss-feeds.component.scss'],
})
export class RssFeedsComponent {
  @Input() rssLink!: string;
  rssData?: any;

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.getRssData();
  }
  getRssData() {
    this.rssFeedService.getRssData(this.rssLink).subscribe({
      next: (response: object) => {
        this.rssData = response;
        console.log(this.rssData);
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération du flux RSS', error);
      },
    });
  }
  getTruncatedDescription(description: string): string {
    const maxLength = 50;
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    } else {
      return description;
    }
  }
}
