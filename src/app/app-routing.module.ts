import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RssComponent } from './pages/rss/rss.component';

const routes: Routes = [{ path: 'rss', component: RssComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
