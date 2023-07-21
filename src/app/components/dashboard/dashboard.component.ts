import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { GridStack } from 'gridstack';
import { GridStackService } from 'src/app/services/grid-stack-service.service';

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
    private httpClient: HttpClient
  ) {
    this.googleApiService = googleApiService;
    this.oauthService = oauthService;
    this.httpClient = httpClient;
  }

  isLoggedIn(): boolean {
    return this.googleApiService.isLoggedIn();
  }

  ngOnInit(): void {
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.googleApiService.userProfileSubject.subscribe((userInfo) => {
        this.userInfo = userInfo;
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
