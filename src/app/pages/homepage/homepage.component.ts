import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  template: `
    <h1>Page d'accueil</h1>
    <app-presentation></app-presentation>
    <app-homeform></app-homeform>
  `,
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {}
