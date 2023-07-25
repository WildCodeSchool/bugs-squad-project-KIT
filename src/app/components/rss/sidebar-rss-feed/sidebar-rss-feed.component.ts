import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RssFeedService } from '../../../services/rssService/rss.service';
import { ToastrService } from 'ngx-toastr';
import { RssFeed } from '../../../models/RssFeed';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component';
import { RssItem } from '../../../interface/rss.interface';

@Component({
  selector: 'app-sidebar-rss-feed',
  templateUrl: './sidebar-rss-feed.component.html',
  styleUrls: ['./sidebar-rss-feed.component.scss'],
})
export class SidebarRssFeedComponent {
  isOpen = false;
  @Input() rssFeeds!: RssFeed[];
  @Output() feedSelected = new EventEmitter<RssFeed | null>();
  rssFeedSelect = true;
  constructor(public rssService: RssFeedService, private toastr: ToastrService, private dialog: MatDialog) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  onFeedSelected(feed: RssFeed): void {
    this.feedSelected.emit(feed);
    this.rssFeedSelect = false;
  }
  resetFeedSelection(): void {
    this.feedSelected.emit(null);
    this.rssFeedSelect = true;
  }
  toggleFavorite(feed: RssFeed): void {
    feed.favorite = !feed.favorite;
    this.rssService.updateRssFeed(feed.id, feed).subscribe(
      (response) => {
        if (feed.favorite) {
          this.toastr.success(`Le flux ${feed.title} a été mis dans vos favoris !`);
        } else {
          this.toastr.info(`Le flux ${feed.title} a été retiré des favoris !`);
        }
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la requête PUT", error);
      }
    );
  }

  openConfirmationModal(rssFeed: RssFeed): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '400px',
      data: {
        rssFeed,
        message: `Etes-vous sûr de vouloir supprimer le  flux RSS ${rssFeed.title} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRssFeed(rssFeed);
      }
    });
  }
  deleteRssFeed(rssFeed: RssFeed) {
    const deletedFeedIndex = this.rssService.rssFeeds.findIndex((feed) => feed.id === rssFeed.id);
    if (deletedFeedIndex !== -1) {
      const deletedFeedTitle = this.rssService.rssFeeds[deletedFeedIndex].title;
      this.rssService.deleteRssFeed(rssFeed.id).subscribe(() => {
        this.rssService.rssFeeds.splice(deletedFeedIndex, 1);
        this.rssService.rssDataItems = this.rssService.rssDataItems.filter(
          (dataItem: RssItem) => dataItem.feedTitle !== deletedFeedTitle
        );
        this.rssService.sortRssDataItemsByDate(this.rssService.rssDataItems);
        this.toastr.success('Le flux a été supprimé !');
      });
    }
  }
}
