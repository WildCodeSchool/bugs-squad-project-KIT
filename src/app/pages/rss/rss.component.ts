import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RssModalComponent } from '../../components/modals/rss-modal/rss-modal.component';
import { RssFeedService } from '../../services/rssService/rss.service';
import { ToastrService } from 'ngx-toastr';
import { RssFeed } from '../../models/RssFeed';
import { RssDataFeeds, RssResponse } from '../../interface/rss.interface';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss'],
})
export class RssComponent {
  constructor(private dialog: MatDialog, public rssService: RssFeedService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadRssFeeds();
  }

  loadRssFeeds(): void {
    this.rssService.getAllRssFeeds().subscribe({
      next: (rssFeeds: RssFeed): void => {
        this.rssService.rssFeeds = rssFeeds;
        this.loadRssDataItems();
      },
      error: (error: any): void => {
        console.error('Erreur lors de la récupération des flux RSS', error);
      },
    });
  }

  loadRssDataItems(): void {
    const urls: string[] = Object.values(this.rssService.rssFeeds).map((rssFeed: RssFeed) => rssFeed.url);
    urls.forEach((url: string) => {
      this.rssService.getRssData(url).subscribe({
        next: (response: RssResponse): void => {
          if (response) {
            this.rssService.addFeedTitleFaviconToItems(response);
            const rssFeeds = {
              status: response.status,
              feed: response.feed,
            };
            const rssItems = {
              items: response.items,
            };
            this.rssService.rssDataFeeds.push(rssFeeds);
            this.rssService.rssDataItems.push(rssItems);
          }
        },
      });
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(RssModalComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rssService.getRssData(result).subscribe({
          next: (response: RssResponse): void => {
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
