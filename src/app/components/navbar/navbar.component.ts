import { Component } from '@angular/core';
import { APP_ROUTES } from 'src/data/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private _appRoutes: string[] = [APP_ROUTES.home];

  constructor(private router: Router) {}
  showOptions() {
    const options = document.querySelector('.profile-btn');
    if (options) options.classList.toggle('active');
  }

  public get hasHeader(): boolean {
    return this._appRoutes.includes(this.router.url);
  }
}
