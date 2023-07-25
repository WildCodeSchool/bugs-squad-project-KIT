import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface for the Gmail API message object
interface GmailMessage {
  id: string;
  // Add other properties as needed based on the API response
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  emails: GmailMessage[] = [];
  nextPageToken = '';

  constructor(private http: HttpClient) {}

  getEmails(): Observable<GmailMessage[]> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      let url = 'https://www.googleapis.com/gmail/v1/users/me/messages';

      if (this.nextPageToken) {
        url += `?pageToken=${this.nextPageToken}`;
      }

      return this.http.get<{ messages: GmailMessage[]; nextPageToken: string }>(url, { headers }).pipe(
        map((res) => {
          this.emails = this.emails.concat(res.messages);
          this.nextPageToken = res.nextPageToken;
          return this.emails;
        })
      );
    }

    return of([]);
  }

  getEmail(emailId: string): Observable<GmailMessage> | null {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      return this.http.get<GmailMessage>(`https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`, { headers });
    }

    return null;
  }

  deleteEmail(emailId: string): void {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      this.http
        .delete(`https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`, { headers })
        .subscribe(() => {
          console.log('Email deleted successfully');
        });
    }
  }

  get selectedEmail(): Observable<GmailMessage> | null {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken || this.emails.length === 0) {
      return null;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<GmailMessage>(`https://www.googleapis.com/gmail/v1/users/me/messages/${this.emails[0].id}`, {
      headers,
    });
  }
}
