import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
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
  ) {}

  ngOnInit(): void {
    this.httpClient.get('https://www.googleapis.com/oauth2/v3/certs').subscribe((data) => {
      console.log(data);
    });
    this.httpClient.get('https://oauth2.googleapis.com/token').subscribe((token) => {
      console.log(token);
    });
    this.httpClient.get('https://openidconnect.googleapis.com/v1/userinfo').subscribe((info) => {
      console.log(info);
    });
    this.googleApiService.userProfileSubject.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
  }
  isLoggedIn(): boolean {
    return this.googleApiService.isLoggedIn();
  }
}

