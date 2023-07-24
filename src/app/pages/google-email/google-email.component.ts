import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { GoogleApiService } from '../../services/google-api.service';
import { async, lastValueFrom } from 'rxjs';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-google-email',
  templateUrl: './google-email.component.html',
  styleUrls: ['./google-email.component.scss'],
})
export class GoogleEmailComponent implements OnInit {
  mailDetails: {
    labels: any;
    date: Date;
    id: string;
    sender: string;
    snippet: string;
    body: string;
  }[] = [];
  userInfo?: UserInfo;
  loadingEmails = false;
  loading = false;

  constructor(private readonly googleApi: GoogleApiService, public dialog: MatDialog) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userInfo = JSON.parse(user);
    }
    this.getEmails().then((r) => console.log(r));
  }

  async confirmDelete(mailDetail: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        try {
          await this.googleApi.deleteEmail(this.userInfo!['info'].sub, mailDetail.id);
          this.mailDetails = this.mailDetails.filter((mail) => mail.id !== mailDetail.id);
        } catch (error) {
          console.error("Erreur lors de la suppression de l'e-mail :", error);
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
      console.log(messages);
      const detailsPromises = messages.messages.map(async (message: any) => {
        const mail = await lastValueFrom(this.googleApi.getMail(userId, message.id));
        const sender = mail.payload.headers.find((header: { name: string }) => header.name === 'From')?.value || '';
        const snippet = this.decodeHTMLEntities(mail.snippet);
        const body = this.decodeHTMLEntities(this.extractBodyFromMail(mail));
        const date = this.formatDate(mail.internalDate);
        const labels = mail.labelIds;
        return { id: message.id, sender, snippet, body, date, labels };
      });
      console.log(detailsPromises);
      this.mailDetails = await Promise.all(detailsPromises);
    } catch (error) {
      console.error(error);
    }

    this.loadingEmails = false;
  }
  formatDate(internalDate: string): Date {
    return new Date(+internalDate);
  }

  sortByLabel(label: string) {
    this.mailDetails = this.mailDetails.filter((mail) => mail.labels.includes(label));
  }

  extractBodyFromMail(mail: any): string {
    // Le contenu du mail peut être encodé en base64, à vous de le décoder si nécessaire
    // Dans cet exemple, je suppose que le contenu n'est pas encodé en base64
    return mail.snippet || '';
  }

  decodeHTMLEntities(text: string): string {
    const parser = new DOMParser();
    const decodedText = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent || '';
    return decodedText;
  }
}
