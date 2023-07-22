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
  mailDetails: { sender: string; snippet: string; body: string }[] = [];
  userInfo?: UserInfo;
  currentPage = 1;
  pageSize = 10; // Nombre d'e-mails à charger par page
  totalEmails = 0;
  loadingEmails = false;
  totalPages: number | undefined;
  loading = false;

  constructor(private readonly googleApi: GoogleApiService, public dialog: MatDialog) {
    this.googleApi = googleApi;
    this.dialog = dialog;
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userInfo = JSON.parse(user);
    }
    // Charger les e-mails lors du chargement du composant
    this.getEmails();
  }

  async confirmDelete(mailDetail: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        try {
          // Mettez ici l'appel à l'API pour supprimer l'e-mail avec mailDetail.id
          // Exemple fictif pour illustrer :
          await this.googleApi.deleteEmail(mailDetail.id);
          // Après la suppression réussie de l'e-mail, mettez à jour la liste des e-mails
          this.mailDetails = this.mailDetails.filter((mail) => mail !== mailDetail);
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
        const snippet = this.decodeHTMLEntities(mail.snippet);
        const body = this.decodeHTMLEntities(this.extractBodyFromMail(mail));
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
    return mail.snippet || '';
  }

  decodeHTMLEntities(text: string): string {
    const parser = new DOMParser();
    const decodedText = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent || '';
    return decodedText;
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
