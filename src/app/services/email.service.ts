import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  emails: any[] = [];
  nextPageToken = '';

  constructor(private http: HttpClient) {}

  getEmails(): Observable<any[]> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      let url = 'https://www.googleapis.com/gmail/v1/users/me/messages';

      if (this.nextPageToken) {
        url += `?pageToken=${this.nextPageToken}`;
      }

      this.http.get<any>(url, { headers }).subscribe((res: any) => {
        this.emails = this.emails.concat(res.messages);
        this.nextPageToken = res.nextPageToken;
      });
    }

    return of([]);
  }

  getEmail(emailId: string): Observable<any> | null {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      return this.http.get<any>(`https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`, { headers });
    }

    return null;
  }

  deleteEmail(emailId: string): void {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      this.http
        .delete<any>(`https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`, { headers })
        .subscribe((res: any) => {
          console.log('Email deleted successfully');
        });
    }
  }

  get selectedEmail(): Observable<any> | null {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken || this.emails.length === 0) {
      return null;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<any>(`https://www.googleapis.com/gmail/v1/users/me/messages/${this.emails[0].id}`, {
      headers,
    });
  }
}
