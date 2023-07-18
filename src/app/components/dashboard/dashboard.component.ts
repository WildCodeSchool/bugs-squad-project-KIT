import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo?: UserInfo;

  constructor(private readonly googleApiService: GoogleApiService, private oauthService: OAuthService) {}

  ngOnInit(): void {
    this.googleApiService.userProfileSubject.subscribe((userInfo) => {
      this.userInfo = userInfo;
      console.log(this.userInfo);
      console.log('je suis dans le dashboard');
      this.oauthService.getIdToken();
      console.log(this.oauthService.getIdToken());
    });
  }

  isLoggedIn(): boolean {
    return this.googleApiService.isLoggedIn();
  }

  signOut() {
    this.googleApiService.signOut();
  }
}
