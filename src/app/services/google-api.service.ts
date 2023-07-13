import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const authgoogle = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/dashboard',
  userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  clientId: '734363817336-u22h0urol9chonde49e1lq3o3f3i12sf.apps.googleusercontent.com',
  clientSecret: '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',
  token_endpoint: 'https://oauth2.googleapis.com/token',
  responseType: 'code',
  scope: 'openid profile email',
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

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {
    // confiure oauth2 service
    oAuthService.configure(authgoogle);
    // manually configure a logout url, because googles discovery document does not provide it
    oAuthService.logoutUrl = 'https://accounts.google.com/logout';
    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    oAuthService.loadDiscoveryDocument().then(() => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      oAuthService.tryLoginImplicitFlow().then(() => {
        // when not logged in, redirecvt to google for login
        // else load user profile
        if (oAuthService.hasValidAccessToken()) {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo);
          });
        }
      });
    });
  }

  private getAccessToken(): string {
    console.log(this.oAuthService.getAccessToken());
    return this.oAuthService.getAccessToken();
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
    });
  }

  connectWithGoogle() {
    this.oAuthService.initLoginFlow();
    this.getAccessToken();
    this.getUserInfo().subscribe((userInfo) => {
      console.log(userInfo);
      this.userProfileSubject.next(userInfo);
    });
  }

  private getUserInfo() {
    return this.httpClient.get('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: this.authHeader(),
    }) as Observable<UserInfo>;
  }
}
