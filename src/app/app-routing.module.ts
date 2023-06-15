import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo/demo.component';
import { MentionLegalesComponent } from './pages/mention-legales/mention-legales.component';

const routes: Routes = [
  { path: '', component: DemoPageComponent },
  { path: 'mention-legales', component: MentionLegalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
