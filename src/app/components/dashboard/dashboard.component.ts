import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo?: UserInfo;

  constructor(
    private readonly googleApiService: GoogleApiService,
    private oauthService: OAuthService,
    private httpClient: HttpClient
  ) {
    this.googleApiService = googleApiService;
    this.oauthService = oauthService;
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    this.googleApiService.userProfileSubject.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
  }
  isLoggedIn(): boolean {
    return this.googleApiService.isLoggedIn();
  }
}
