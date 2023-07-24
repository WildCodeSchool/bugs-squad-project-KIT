import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../services/google-api.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { GridStack } from 'gridstack';
import { GridStackService } from 'src/app/services/grid-stack-service.service';
import { animate, style, transition, trigger, state } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          overflow: 'hidden',
          height: '*',
          width: '300px',
        })
      ),
      state(
        'out',
        style({
          opacity: '0',
          overflow: 'hidden',
          height: '0px',
          width: '0px',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  userInfo?: UserInfo;
  private grid!: GridStack;
  private isInitialWidgetAdded = false;
  private initialWidgets: Element[] = [];
  helpMenuOpen!: string;

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
    this.helpMenuOpen = 'out';
  }

  private initializeGrid() {
    setTimeout(() => {
      this.grid = GridStack.init({
        acceptWidgets: true,
        removable: '#trash',
        float: true,
      });

      GridStack.setupDragIn('.newWidget', {
        appendTo: 'body',
        // helper: 'clone'
      });

      this.grid.on('added', (e: any, items: any) => {
        items.forEach((item: any) => {
          const element = item.el;
          if (element.classList.contains('newWidget')) {
            // Vérifier si l'élément est déjà présent dans le tableau initialWidgets
            if (!this.initialWidgets.includes(element)) {
              this.initialWidgets.push(element);
              element.classList.add('dragged');
            }
          }
        });
      });

      const sidebarElement = this.sidebarElement.nativeElement as HTMLElement;
      this.initialWidgets = Array.from(sidebarElement.querySelectorAll('.newWidget'));
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
    const widgetPositions = gridItems.map((item: { getAttribute: (gridstackNode: string) => any }) => ({
      id: item.getAttribute('data-gs-id'),
      x: item.getAttribute('data-gs-x'),
      y: item.getAttribute('data-gs-y'),
      width: item.getAttribute('data-gs-width'),
      height: item.getAttribute('data-gs-height'),
    }));
    for (const gridItem of gridItems) {
      // @ts-ignore
      console.log(gridItem.gridstackNode.x);
      // @ts-ignore
      console.log(gridItem.gridstackNode.y);
      // @ts-ignore
      console.log(gridItem.gridstackNode.w);
      // @ts-ignore
      console.log(gridItem.gridstackNode.h);
      // @ts-ignore
      console.log(gridItem.gridstackNode._id);
    }
  }
  isDivVisible = true;
  toggleDiv() {
    this.isDivVisible = !this.isDivVisible;
  }

  // Ajoutez un ViewChild pour obtenir une référence à l'élément avec la classe "sidebar"
  @ViewChild('sidebar', { static: true }) sidebarElement!: ElementRef;

  showContent = true; // Nouvelle variable pour contrôler la visibilité du contenu
  // Méthode pour gérer l'événement de déplacement du widget de la classe "sidebar" à "grid-stack"
  handleMoveToGridStack() {
    // Vérifiez si la hauteur du parent dépasse 200px
    const parentHeight = this.sidebarElement.nativeElement.offsetHeight;
    if (parentHeight > 200) {
      this.showContent = false;
    }
  }
  toggleHelpMenu(): void {
    this.helpMenuOpen = this.helpMenuOpen === 'out' ? 'in' : 'out';
  }
}
