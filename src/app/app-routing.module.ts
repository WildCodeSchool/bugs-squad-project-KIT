import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { RssComponent } from './pages/rss/rss.component';
import { Page500Component } from './pages/page500/page500.component';
import { AboutComponent } from './pages/about/about.component';
import { Page404Component } from './pages/page404/page404.component';
import { MentionLegalesComponent } from './pages/mention-legales/mention-legales.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'rss', component: RssComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'mentionslegals', component: MentionLegalesComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: Page404Component },
  { path: '500', component: Page500Component },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
