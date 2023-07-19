import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/rssService/rss.service';
import { ToastrService } from 'ngx-toastr';
import { RssDataFeeds } from '../../../interface/rss.interface';
import { RssFeed } from '../../../models/RssFeed';

@Component({
  selector: 'app-sidebar-rss-feed',
  templateUrl: './sidebar-rss-feed.component.html',
  styleUrls: ['./sidebar-rss-feed.component.scss'],
})
export class SidebarRssFeedComponent {
  isOpen = false;
  @Input() rssDataFeeds!: RssDataFeeds[];
  constructor(public rssService: RssFeedService, private toastr: ToastrService) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  deleteRssFeed(id: number) {
    const confirmMessage = 'Êtes-vous sûr de vouloir supprimer ce flux RSS ?';
    const rssFeedsArray = Object.values(this.rssService.rssFeeds) as RssFeed[];
    const rssFeed = rssFeedsArray.find((feed) => feed.id === id);
    console.log(rssFeed);
    this.rssService.deleteRssFeed(rssFeed?.id).subscribe(() => {
      const deletedFeedIndex = this.rssService.rssDataFeeds.findIndex((feed) => feed.id === id);
      if (deletedFeedIndex !== -1) {
        const deletedFeedTitle = this.rssService.rssDataFeeds[deletedFeedIndex].feed.title;
        this.rssService.rssDataFeeds.splice(deletedFeedIndex, 1);
        this.rssService.rssDataItems = this.rssService.rssDataItems.map((dataItem) => {
          return {
            items: dataItem.items.filter((item) => item.feedTitle !== deletedFeedTitle),
          };
        });
      }
      this.rssService.sortRssDataItemsByDate(this.rssService.rssDataItems);
      this.toastr.success('Le flux a été supprimé !');
    });
  }
}
