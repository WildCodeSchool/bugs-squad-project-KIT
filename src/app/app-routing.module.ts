import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RssComponent } from './pages/rss/rss.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'rss', component: RssComponent },
  { path: '', component: DashboardComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
