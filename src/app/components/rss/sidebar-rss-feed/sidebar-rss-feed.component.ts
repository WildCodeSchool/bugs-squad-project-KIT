import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/rssService/rss.service';
import { ToastrService } from 'ngx-toastr';
import { RssFeed } from '../../../models/RssFeed';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-sidebar-rss-feed',
  templateUrl: './sidebar-rss-feed.component.html',
  styleUrls: ['./sidebar-rss-feed.component.scss'],
})
export class SidebarRssFeedComponent {
  isOpen = false;
  @Input() rssFeeds!: RssFeed[];
  constructor(public rssService: RssFeedService, private toastr: ToastrService, private dialog: MatDialog) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  openConfirmationModal(rssFeed: RssFeed): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '400px',
      data: {
        rssFeed,
        message: 'Etes-vous sûr de vouloir supprimer ce flux RSS ?',
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
        this.rssService.rssDataItems = this.rssService.rssDataItems.map((dataItem) => {
          return {
            items: dataItem.items.filter((item) => item.feedTitle !== deletedFeedTitle),
          };
        });
        this.rssService.sortRssDataItemsByDate(this.rssService.rssDataItems);
        this.toastr.success('Le flux a été supprimé !');
      });
    }
  }
}
