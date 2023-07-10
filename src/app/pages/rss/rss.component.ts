import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RssModalComponent } from '../../components/modals/rss-modal/rss-modal.component';
import { RssFeedService } from '../../services/RssFeedService/rss.service';

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
        this.rssService.getRssData(result).subscribe({
          next: (response: any): void => {
            if (response.status === 'ok') {
              this.rssService.addRssLink(result).subscribe({
                next: (postResponse: any): void => {
                  console.log("C'est enregistré en base de données");
                },
                error: (postError: any): void => {
                  console.error("Une erreur s'est produite lors de la requête POST", postError);
                }
              });
            }
          },
          error: (error: any): void => {
            console.error("L'URL du flux RSS n'est pas valide", error);
          },
        });
      }
    });
  }
}
