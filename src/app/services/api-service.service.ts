import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  saveUserInfo(userInfo: any) {
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  }

  getUserInfo() {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveRefreshToken(refreshToken: any) {
    localStorage.setItem('refresh_token', refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  saveExpiration(expiration: any) {
    localStorage.setItem('expiration', expiration);
  }

  getExpiration() {
    return localStorage.getItem('expiration');
  }

  getUserName() {
    const userInfo = this.getUserInfo();
    console.log(userInfo.name);
    return userInfo ? userInfo.name : null;
  }

  getUserId() {
    const userInfo = this.getUserInfo();
    console.log(userInfo.id);

    return userInfo ? userInfo.id : null;
  }

  getUserEmail() {
    const userInfo = this.getUserInfo();
    console.log(userInfo.email);
    return userInfo ? userInfo.email : null;
  }
}
