import { Component, Input } from '@angular/core';
import { RssFeedService } from '../../../services/rssService/rss.service';
import { RssFeed } from '../../../models/RssFeed';
import { ToastrService } from 'ngx-toastr';
import { RssDataFeeds, RssDataItems } from '../../../interface/rss.interface';

@Component({
  selector: 'app-sidebar-rss-feed',
  templateUrl: './sidebar-rss-feed.component.html',
  styleUrls: ['./sidebar-rss-feed.component.scss'],
})
export class SidebarRssFeedComponent {
  isOpen = false;
  @Input() rssDataFeeds!: RssDataFeeds[];
  constructor(public rssService: RssFeedService, private toastr: ToastrService) {}
  ngOnInit(): void {
    console.log(this.rssDataFeeds);
    this.subscribeToRssFeedsUpdated();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  subscribeToRssFeedsUpdated(): void {
    this.rssService.onRssFeedsUpdated().subscribe(() => {});
  }
  // deleteRssFeed(id: number) {
  //   const confirmMessage = 'Êtes-vous sûr de vouloir supprimer ce flux RSS ?';
  //   if (confirm(confirmMessage)) {
  //     this.rssFeedService.deleteRssFeed(id).subscribe(() => {
  //       const index = this.rssData.findIndex((feed) => feed.id === id);
  //       if (index !== -1) {
  //         this.rssData.splice(index, 1);
  //       }
  //       this.toastr.success('Le flux a été supprimé !');
  //     });
  //   }
  // }
}
