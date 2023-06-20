import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
import { RssFeedsComponent } from './pages/rss/rss-feeds/rss-feeds.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './components/footer/footer.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    RssFeedsComponent,
    AboutComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
