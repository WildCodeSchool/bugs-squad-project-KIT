import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridStack } from 'gridstack';
import { GridStackService } from 'src/app/services/grid-stack-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo?: UserInfo;
  private grid!: GridStack;
  private isInitialWidgetAdded = false;

  constructor(
    private gridStackService: GridStackService,
    private readonly googleApiService: GoogleApiService,
    private oauthService: OAuthService,
    private httpClient: HttpClient,
    private Toaster: ToastrService
  ) {
    this.googleApiService = googleApiService;
    this.oauthService = oauthService;
    this.httpClient = httpClient;
    this.Toaster = Toaster;
  }

  alertUser = false;

  ngOnInit(): void {
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.googleApiService.userProfileSubject.subscribe((userInfo) => {
        this.userInfo = userInfo;
        const body = localStorage.setItem('user', JSON.stringify(userInfo));
        const user = {
          username: userInfo['info'].name,
          email: userInfo['info'].email,
          origin: 'GOOGLE', // Définir l'origine comme "GOOGLE" pour les utilisateurs Google
          googleId: userInfo['info'].sub,
          googleEmail: userInfo['info'].email,
          password: null, // Le mot de passe doit être null pour un utilisateur Google
        };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.httpClient
          .post('http://localhost:8080/api/auth/register/google', user, { headers })
          .subscribe((response: any) => {
            console.log(response);
          });

        this.alertUser = true;
        if (this.alertUser && userInfo['info'].name != null) {
          this.Toaster.success('Bienvenue ' + userInfo['info'].name + ' !', 'Connexion réussie !');
          this.Toaster.info("Vous pouvez désormais utiliser l'application", 'Informations');
          this.alertUser = false;
        }
      });
    });
    this.initializeGrid();
  }

  private initializeGrid() {
    setTimeout(() => {
      this.grid = GridStack.init({
        acceptWidgets: true,
        removable: '#trash',
        float: true,
      });

      GridStack.setupDragIn('.newWidget', { appendTo: 'body', helper: 'clone' });

      this.grid.on('added', (e: any, items: any) => {
        let str = '';
        items.forEach((item: any) => {
          str += ' (x,y)=' + item.x + ',' + item.y;
          const element = item.el;
          if (element.classList.contains('newWidget')) {
            if (!this.isInitialWidgetAdded) {
              element.classList.add('dragged');
              this.isInitialWidgetAdded = true;
            }
          }
        });
      });
    });
  }

  cleanGridStack() {
    if (this.grid) {
      this.grid.removeAll();
      this.initializeGrid();
    }
  }

  saveGridStack() {
    const gridItems = this.grid.getGridItems();
    const widgetPositions = gridItems.map((item: { getAttribute: (arg0: string) => any }) => ({
      id: item.getAttribute('data-gs-id'),
      x: item.getAttribute('data-gs-x'),
      y: item.getAttribute('data-gs-y'),
      width: item.getAttribute('data-gs-width'),
      height: item.getAttribute('data-gs-height'),
    }));
  }
  isDivVisible = true;
  toggleDiv() {
    this.isDivVisible = !this.isDivVisible;
  }
}
