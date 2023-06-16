import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PresentationComponent } from './components/homepage/presentation/presentation.component';
import { HomeformComponent } from './components/homepage/homeform/homeform.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './components/footer/footer.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    DemoComponent,
    DemoPipe,
    DemoDirective,
    HomepageComponent,
    PresentationComponent,
    HomeformComponent,
    NavbarComponent,
    NavbarMobileComponent,
    FooterComponent,
    BurgerButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
