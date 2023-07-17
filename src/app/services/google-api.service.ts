import { Injectable } from '@angular/core';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const authgoogle = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/dashboard',
  userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  clientId: '734363817336-u22h0urol9chonde49e1lq3o3f3i12sf.apps.googleusercontent.com',
  client_secret: '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',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  responseType: 'code',
  scope: 'openid profile email ',
};

export interface UserInfo {
  info: {
    sub: string;
    email: string;
    name: string;
    picture: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  userProfileSubject = new Subject<UserInfo>();

  private getJwtToken() {
    const idToken = this.oauthService.getIdToken();
    return idToken ? idToken.split('.')[1] : null;
  }

  constructor(private oauthService: OAuthService, private router: Router, private httpClient: HttpClient) {
    // Useful for debugging:
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);
      }
    });
  }

  getAccessToken(): Promise<string> {
    return this.httpClient
      .get('https://oauth2.googleapis.com/token', {
        headers: this.authHeader(),
      })
      .toPromise() as Promise<string>;
  }

  private getRefreshToken(): string {
    console.log(this.oauthService.getRefreshToken());
    return this.oauthService.getRefreshToken();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  signOut() {
    this.oauthService.revokeTokenAndLogout();
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
    });
  }

  connectWithGoogle() {
    this.oauthService.configure(authgoogle);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.getUserInfo().subscribe((userInfo) => {
          this.userProfileSubject.next(userInfo);
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.oauthService.initLoginFlow();
      }
    });
  }

  private getUserInfo() {
    return this.httpClient.get('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: this.authHeader(),
    }) as Observable<UserInfo>;
  }

  getGoogleCalendarEvents() {
    return this.httpClient.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: this.authHeader(),
    });
  }

  getGoogleCalendarList() {
    return this.httpClient.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: this.authHeader(),
    });
  }

  getGoogleCalendarEventById(id: string) {
    return this.httpClient.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
      headers: this.authHeader(),
    });
  }
}
