import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './pages/collections/collections.component';
import { RssComponent } from './pages/rss/rss.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  { path: 'rss', component: RssComponent }, 
  { path: 'collections', component: CollectionsComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
