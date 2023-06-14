import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobile = false;
  constructor(private deviceService: DeviceDetectorService) {
    this.epicFunction();
  }

  epicFunction() {
    const isDesktop = this.deviceService.isDesktop();
    this.isMobile = !isDesktop;
  }
}
