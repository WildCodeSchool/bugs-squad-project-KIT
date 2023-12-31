import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { NgFor, NgOptimizedImage } from '@angular/common';
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
import { LinksComponent } from './components/links/links.component';
import { CollectionsFormComponent } from './components/collection-form/collection-form.component';
import { CollectionFormUpdateComponent } from './components/collection-form-update/collection-form-update.component';
import { LinkFormUpdateComponent } from './components/link-form-update/link-form-update.component';
import { SidebarRssFeedComponent } from './components/rss/sidebar-rss-feed/sidebar-rss-feed.component';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfirmDeleteModalComponent } from './components/modals/confirm-delete-modal/confirm-delete-modal.component';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { FavoriteRssFeedComponent } from './components/rss/favorite-rss-feed/favorite-rss-feed.component';
import { GoogleEmailComponent } from './pages/google-email/google-email.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

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
    LinksComponent,
    CollectionFormUpdateComponent,
    LinkFormUpdateComponent,
    SidebarRssFeedComponent,
    CalendarComponent,
    ConfirmDeleteModalComponent,
    FavoriteRssFeedComponent,
    GoogleEmailComponent,
    DeleteConfirmationComponent,
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
    CollectionsFormComponent,
    MatMenuModule,
    ToastrModule.forRoot(),
    CdkDrag,
    CdkDropList,
    NgFor,
    OAuthModule.forRoot(),
  ],
  providers: [{ provide: OAuthStorage, useFactory: storageFactory }],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
