import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { RssComponent } from './pages/rss/rss.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'rss', component: RssComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
