import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { DashCollectionsComponent } from './components/dash-collections/dash-collections.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { PresentationComponent } from './components/homepage/presentation/presentation.component';
import { HomeformComponent } from './components/homepage/homeform/homeform.component';

import { RssComponent } from './pages/rss/rss.component';
import { RssModalComponent } from './components/modals/rss-modal/rss-modal.component';
import { RssFeedAllComponent } from './components/rss/rss-feed-all/rss-feed-all.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './components/footer/footer.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MentionLegalesComponent } from './pages/mention-legales/mention-legales.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodolistsFavComponent } from './components/todolists-fav/todolists-fav.component';
import { TodolistsComponent } from './pages/todolists/todolists.component';
import { SidebarRssFeedComponent } from './components/rss/sidebar-rss-feed/sidebar-rss-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PresentationComponent,
    HomeformComponent,
    NavbarComponent,
    NavbarMobileComponent,
    FooterComponent,
    BurgerButtonComponent,
    DashboardComponent,
    CollectionComponent,
    CollectionsComponent,
    DashCollectionsComponent,
    RssComponent,
    RssModalComponent,
    RssFeedAllComponent,
    AboutComponent,
    MentionLegalesComponent,
    TodolistComponent,
    TodolistsFavComponent,
    TodolistsComponent,
    SidebarRssFeedComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    FontAwesomeModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    AuthModule.forRoot({
      config: {
        authority: 'https://accounts.google.com',
        redirectUrl: window.location.origin + '/dashboard',
        postLogoutRedirectUri: window.location.origin + '/home',
        clientId: '734363817336-u22h0urol9chonde49e1lq3o3f3i12sf.apps.googleusercontent.com',
        scope: 'openid profile email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
