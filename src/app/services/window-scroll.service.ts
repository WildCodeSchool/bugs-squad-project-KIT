import { Injectable } from '@angular/core';

@Injectable()
export class WindowScrollService {
  shouldShowButton(): boolean {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollThreshold = 500;

    return scrollPosition > scrollThreshold;
  }
}
