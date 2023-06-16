import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RssComponent } from './pages/rss/rss.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'rss', component: RssComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
