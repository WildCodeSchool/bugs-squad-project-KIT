import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RssModalComponent } from '../../components/modals/rss-modal/rss-modal.component';
import { RssFeedService } from '../../services/RssFeedService/rss.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss'],
})
export class RssComponent {
  constructor(private dialog: MatDialog, private rssService: RssFeedService, private toastr: ToastrService) {}

  openModal(): void {
    const dialogRef = this.dialog.open(RssModalComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rssService.getRssData(result).subscribe({
          next: (response: any): void => {
            if (response) {
              this.rssService.addRssLink(result).subscribe({
                next: (postResponse: any): void => {
                  this.toastr.success('Le flux ' + response.feed.title + ' est ajouté!', 'Succès!!');
                  this.rssService.rssFeedsUpdated();
                },
                error: (postError: any): void => {
                  this.toastr.error("Une erreur s'est produite lors de l'enregistrement du flux Rss", 'Erreur!!');
                  console.error("Une erreur s'est produite lors de la requête POST", postError);
                },
              });
            }
          },
          error: (error: any): void => {
            this.toastr.error("L'URL du flux RSS n'est pas valide", 'Erreur!!');
            console.error("L'URL du flux RSS n'est pas valide", error);
          },
        });
      }
    });
  }
}
