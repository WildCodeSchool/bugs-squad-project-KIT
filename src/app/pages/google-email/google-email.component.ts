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
  mailDetails: { sender: string; snippet: string; body: string }[] = [];
  userInfo?: UserInfo;
  currentPage = 1;
  pageSize = 10; // Nombre d'e-mails à charger par page
  totalEmails = 0;
  loadingEmails = false;
  totalPages: number | undefined;
  loading = false;

  constructor(private readonly googleApi: GoogleApiService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userInfo = JSON.parse(user);
    }
    // Charger les e-mails lors du chargement du composant
    this.getEmails();
  }

  async getEmails() {
    if (!this.userInfo || this.loadingEmails) {
      return;
    }

    this.loadingEmails = true;

    try {
      const userId = this.userInfo['info'].sub;
      console.log(userId);

      // Charger les e-mails paginés
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const messages = await lastValueFrom(this.googleApi.emails(userId, this.pageSize, startIndex));
      console.log(messages);

      this.totalEmails = messages.resultSizeEstimate;
      this.totalPages = Math.ceil(this.totalEmails / this.pageSize);

      // Récupérer les détails pour chaque message
      const detailsPromises = messages.messages.map(async (message: any) => {
        const mail = await lastValueFrom(this.googleApi.getMail(userId, message.id));
        const sender = mail.payload.headers.find((header: { name: string }) => header.name === 'From')?.value || '';
        const snippet = message.snippet || '';
        const body = this.extractBodyFromMail(mail);
        return { sender, snippet, body };
      });

      // Attendre que toutes les promesses d'appels soient résolues
      this.mailDetails = await Promise.all(detailsPromises);
    } catch (error) {
      console.error(error);
    }

    this.loadingEmails = false;
  }

  extractBodyFromMail(mail: any): string {
    // Le contenu du mail peut être encodé en base64, à vous de le décoder si nécessaire
    // Dans cet exemple, je suppose que le contenu n'est pas encodé en base64
    return mail.snippet || '';
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalEmails) {
      this.currentPage++;
      this.getEmails();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getEmails();
    }
  }
}
