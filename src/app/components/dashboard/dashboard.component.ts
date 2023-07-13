import { Component } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {


  userInfo?: UserInfo;

  constructor(private readonly googleApiService: GoogleApiService) {
    this.googleApiService.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
    });
  }

  isLoggedIn(): boolean {
    return this.googleApiService.isLoggedIn();
  }

  signOut() {
    this.googleApiService.signOut();
  }
}
