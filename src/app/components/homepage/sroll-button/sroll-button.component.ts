import { Component, HostListener, Inject } from '@angular/core';
import { WindowScrollService } from 'src/app/services/window-scroll.service';

@Component({
  selector: 'app-scroll-button',
  template: `
    <button (click)="scrollDown()" *ngIf="showButton">Scroll Down</button>
  `,
})
export class ScrollButtonComponent {
  showButton = false;

  constructor(@Inject(WindowScrollService) private windowScrollService: WindowScrollService) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showButton = this.windowScrollService.shouldShowButton();
  }

  scrollDown() {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }
}
