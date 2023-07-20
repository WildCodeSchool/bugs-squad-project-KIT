import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  public deleteToken(): void {
    localStorage.removeItem('token');
  }

  public deleteUser(): void {
    localStorage.removeItem('user');
  }
}
