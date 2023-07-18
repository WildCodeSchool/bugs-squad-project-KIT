import { Injectable } from '@angular/core';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  signOut() {
    this.oauthService.revokeTokenAndLogout().then(() => this.router.navigate(['/home']));
  }
  connectWithGoogle() {
    this.oauthService.configure(authgoogle);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.oauthService.loadUserProfile().then((userProfile) => {
          this.userProfileSubject.next(userProfile as UserInfo);
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.oauthService.initImplicitFlow();
      }
    });
  }
}
