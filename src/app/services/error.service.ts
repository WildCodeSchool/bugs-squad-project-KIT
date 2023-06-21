import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router) {}
  handleError(statusCode: number) {
    if (statusCode === 404) {
      this.router.navigate(['/404']);
    } else if (statusCode === 500) {
      this.router.navigate(['/500']);
    }
  }
}
