import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { GoogleApiService } from '../../services/google-api.service';
import { async, lastValueFrom } from 'rxjs';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-google-email',
  templateUrl: './google-email.component.html',
  styleUrls: ['./google-email.component.scss'],
})
export class GoogleEmailComponent implements OnInit {
  mailDetails: {
    subject: string;
    labels: string[];
    date: Date;
    id: string;
    sender: string;
    snippet: string;
    body: string;
  }[] = [];
  userInfo?: UserInfo;
  loadingEmails = false;
  loading = false;

  constructor(private readonly googleApi: GoogleApiService, public dialog: MatDialog, public toastr: ToastrService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userInfo = JSON.parse(user);
    }
    this.getEmails();
  }

  async confirmDelete(mailDetail: MailDetail) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(async (result: Result) => {
      if (result) {
        try {
          await this.googleApi.deleteEmail(this.userInfo!['info'].sub, mailDetail.id);
          this.mailDetails = this.mailDetails.filter((mail) => mail.id !== mailDetail.id);
        } catch (error) {
          this.toastr.error("Une erreur est survenue lors de la suppression de l'email");
        }
      }
    });
  }

  async getEmails() {
    if (!this.userInfo || this.loadingEmails) {
      return;
    }
    this.loadingEmails = true;
    try {
      const userId = this.userInfo['info'].sub;
      const messages = await lastValueFrom(this.googleApi.emails(userId));
      const detailsPromises = messages.messages.map(async (message: Message) => {
        const mail = await lastValueFrom(this.googleApi.getMail(userId, message.id));
        const sender = mail.payload.headers.find((header: { name: string }) => header.name === 'From')?.value || '';
        const snippet = this.decodeHTMLEntities(mail.snippet);
        const body: string = await this.extractBodyFromMail(mail);
        const subject = mail.payload.headers.find((header: { name: string }) => header.name === 'Subject')?.value || '';
        const date = this.formatDate(mail.internalDate);
        const labels = mail.labelIds;
        return { subject, sender, snippet, body, date, labels };
      });
      console.log(detailsPromises);
      this.mailDetails = await Promise.all(detailsPromises);
    } catch (error) {
      console.error('Error fetching emails:', error);
      this.toastr.error('Une erreur est survenue lors de la récupération des emails.');
    } finally {
      this.loadingEmails = false;
    }
  }

  formatDate(internalDate: string): Date {
    return new Date(+internalDate);
  }

  sortByLabel(label: string) {
    this.mailDetails = this.mailDetails.filter((mail) => mail.labels.includes(label));
  }
  async extractBodyFromMail(mail: Mail): Promise<string> {
    if (mail.payload.parts && mail.payload.parts.length > 0) {
      const mailPart = mail.payload.parts.find((part) => part.mimeType === 'text/html');
      if (mailPart?.body?.data) {
        const bodyData = mailPart.body.data;
        const uint8Array = this.base64ToUint8Array(bodyData);
        const decodedBody = await this.uint8ArrayToString(uint8Array);
        return decodedBody;
      }
    }
    return '';
  }

  base64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  uint8ArrayToString(array: Uint8Array): Promise<string> {
    return new Promise((resolve) => {
      const blob = new Blob([array], { type: 'text/plain' });
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const text = event.target.result;
        resolve(text);
      };
      reader.readAsText(blob);
    });
  }

  decodeHTMLEntities(text: string): string {
    const parser = new DOMParser();
    const decodedText = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent || '';
    return decodedText;
  }
}

export interface MailDetail {
  id: string;
  sender: string;
  snippet: string;
  body: string;
  date: Date;
  labels: string[];
}

export interface Mail {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    headers: {
      name: string;
      value: string;
    }[];
    body: {
      size: number;
      data: string;
    };
    parts: {
      partId: string;
      mimeType: string;
      filename: string;
      headers: {
        name: string;
        value: string;
      }[];
      body: {
        attachmentId: string;
        size: number;
        data: string;
      };
    }[];
  };
  sizeEstimate: number;
  historyId: string;
  internalDate: string;
}
interface Message {
  id: string;
  threadId: string;
  labelIds: string[];
}
interface Result {
  messages: Message[];
  nextPageToken: string;
  resultSizeEstimate: number;
}

