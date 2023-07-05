import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RssModalComponent } from '../../components/modals/rss-modal/rss-modal.component';
import { RssFeedService } from '../../services/rss.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss'],
})
export class RssComponent {
  rssFeedService: string[];

  constructor(private dialog: MatDialog, private rssService: RssFeedService) {
    this.rssFeedService = rssService.rssLinks;
  }

  openModal(): void {
    const dialogRef = this.dialog.open(RssModalComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rssService.addRssLink(result);
      }
    });
  }
}
