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
  activeCardIndex = 0;

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

  getTruncated(description: string, maxLength: number): string {
    const cleanDescription = description.replace(/<[^>]+>/g, '');
    if (cleanDescription.length > maxLength) {
      return `${cleanDescription.slice(0, maxLength)} ...`;
    } else {
      return cleanDescription;
    }
  }
  formatTitle(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  }
  toggleCardVisibility(index: number): void {
    this.activeCardIndex = index;
  }
}
