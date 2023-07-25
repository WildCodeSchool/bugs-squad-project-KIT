import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/dashboard',
  clientId: '734363817336-u22h0urol9chonde49e1lq3o3f3i12sf.apps.googleusercontent.com',
  scope:
    'openid profile email https://www.googleapis.com/auth/userinfo.profile' +
    ' https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar' +
    ' https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.readonly' +
    '  https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose' +
    ' https://www.googleapis.com/auth/gmail.modify' +
    ' https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.settings.basic' +
    ' https://mail.google.com/',
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
  private gmail = 'https://gmail.googleapis.com';

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {
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
  emails(userId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, { headers: this.authHeader() });
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, {
      headers: this.authHeader(),
    });
  }

  sendMail(userId: string, mail: any): Observable<any> {
    return this.httpClient.post(`${this.gmail}/gmail/v1/users/${userId}/messages/send`, mail, {
      headers: this.authHeader(),
    });
  }
  signOut() {
    this.oAuthService.logOut();
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
    });
  }

  async deleteEmail(userId: string, id: string): Promise<void> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    await this.httpClient
      .delete(`${this.gmail}/gmail/v1/users/${userId}/messages/${id}`, { headers })
      .toPromise()
      .then((res: any) => {
        console.log('Email deleted successfully', res);
      })
      .catch((error) => {
        console.error('Error deleting email:', error);
      });
  }
}
