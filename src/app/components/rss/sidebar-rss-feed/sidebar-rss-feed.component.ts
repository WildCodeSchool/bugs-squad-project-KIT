import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-rss-feed',
  templateUrl: './sidebar-rss-feed.component.html',
  styleUrls: ['./sidebar-rss-feed.component.scss']
})
export class SidebarRssFeedComponent {
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
