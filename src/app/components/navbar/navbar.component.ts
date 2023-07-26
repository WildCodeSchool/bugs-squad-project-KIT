import { Component } from '@angular/core';
import { APP_ROUTES } from 'src/data/routes';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private _appRoutes: string[] = [APP_ROUTES.home];

  isBelow764 = false;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private oauthService: OAuthService) {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches))
      .subscribe((result) => {
        this.isBelow764 = result;
      });
  }

  showOptions() {
    const options = document.querySelector('.profile-btn');
    if (options) options.classList.toggle('active');
  }
  public get hasHeader(): boolean {
    return this._appRoutes.includes(this.router.url);
  }

  logout() {
    this.oauthService.logOut();
  }
}
