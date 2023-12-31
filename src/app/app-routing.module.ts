import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { RssComponent } from './pages/rss/rss.component';
import { Page500Component } from './pages/page500/page500.component';
import { AboutComponent } from './pages/about/about.component';
import { Page404Component } from './pages/page404/page404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MentionLegalesComponent } from './pages/mention-legales/mention-legales.component';
import { TodolistsComponent } from './pages/todolists/todolists.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TodolistsFavComponent } from './components/todolists-fav/todolists-fav.component';
import { DashCollectionsComponent } from './components/dash-collections/dash-collections.component';
import { GoogleEmailComponent } from './pages/google-email/google-email.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'rss',
    component: RssComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'collections',
    component: CollectionsComponent,
  },
  {
    path: 'todolists',
    component: TodolistsComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'email',
    component: GoogleEmailComponent,
  },
  {
    path: 'legalNotices',
    component: MentionLegalesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: AboutComponent,
  },
  {
    path: '404',
    component: Page404Component,
  },
  {
    path: '500',
    component: Page500Component,
  },
  {
    path: 'fav-todos',
    component: TodolistsFavComponent,
  },
  {
    path: 'fav-collections',
    component: DashCollectionsComponent,
  },
  {
    path: '**',
    component: Page404Component,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
