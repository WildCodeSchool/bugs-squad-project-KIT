import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/rss.service';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.scss'],
})
export class RssFeedComponent {
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
        console.log('RSS Data', this.rssData);
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération du flux RSS', error);
      },
    });
  }
  getClean(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }
  toggleCardVisibility(index: number): void {
    this.activeCardIndex = index;
  }
}
