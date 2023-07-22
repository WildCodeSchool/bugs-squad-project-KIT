import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { GoogleApiService } from '../../services/google-api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-google-email',
  templateUrl: './google-email.component.html',
  styleUrls: ['./google-email.component.scss'],
})
export class GoogleEmailComponent implements OnInit {
  mailSnippets: string[] = [];
  userInfo?: UserInfo;

  constructor(private readonly googleApi: GoogleApiService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userInfo = JSON.parse(user);
    }
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  logout() {
    this.googleApi.signOut();
  }

  async getEmails() {
    if (!this.userInfo) {
      return;
    }

    const userId = this.userInfo['info'].sub;
    console.log(userId);

    const messages = await lastValueFrom(this.googleApi.emails(userId));
    console.log(messages);

    for (const message of messages.messages) {
      const mail = await lastValueFrom(this.googleApi.getMail(userId, message.id));
      const sender = mail.payload.headers.find((header: { name: string }) => header.name === 'From')?.value || '';
      const subject = mail.payload.headers.find((header: { name: string }) => header.name === 'Subject')?.value || '';
      const snippet = message.snippet || '';
      const date = mail.payload.headers.find((header: { name: string }) => header.name === 'Date')?.value || '';

      console.log('Sender:', sender);
      console.log('Subject:', subject);
      console.log('Snippet:', snippet);
      console.log('Date:', date);
    }
    this.mailSnippets = messages.messages.map((message: { snippet: string }) => message.snippet);
  }
}
