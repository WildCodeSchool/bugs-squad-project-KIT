import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo?: UserInfo;

  constructor(private readonly googleApiService: GoogleApiService) {}

  ngOnInit() {
    const accessToken = this.googleApiService.getAccessToken();
    // Utilisez le token d'accès comme vous le souhaitez
    console.log(accessToken);

    this.googleApiService.userProfileSubject.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
  }

  isLoggedIn(): boolean {
    return this.googleApiService.isLoggedIn();
  }

  signOut() {
    this.googleApiService.signOut();
  }
}
