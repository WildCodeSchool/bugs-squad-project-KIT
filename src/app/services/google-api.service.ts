import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/dashboard',
  clientId: '734363817336-u22h0urol9chonde49e1lq3o3f3i12sf.apps.googleusercontent.com',
  scope:
    'openid profile email https://www.googleapis.com/auth/userinfo.profile' +
    ' https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
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

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(authCodeFlowConfig);
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout';
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        oAuthService.loadUserProfile().then((userProfile) => {
          this.userProfileSubject.next(userProfile as UserInfo);
        });
      });
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }
}
