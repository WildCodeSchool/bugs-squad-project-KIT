import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isMobile = false;
  isHome = false;
  constructor(private deviceService: DeviceDetectorService) {
    this.checkDevice();
  }
  checkDevice() {
    const isDesktop = this.deviceService.isDesktop();
    this.isMobile = !isDesktop;
  }

  ngOnInit() {
    if (window.location.pathname === '/home') {
      this.isHome = true;
    }
  }
}
