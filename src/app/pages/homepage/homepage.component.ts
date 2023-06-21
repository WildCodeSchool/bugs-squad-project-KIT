import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  template: `
    <header>
      <div class="container">
        <div class="upper">K.I.T.</div>
        <div class="lower">K.I.T.</div>
        <div class="inside">Keep it together</div>
      </div>
    </header>
    <app-presentation></app-presentation>
    <app-navbar *ngIf="false"></app-navbar>
    <app-navbar-mobile *ngIf="false"></app-navbar-mobile>
    <app-footer *ngIf="false"></app-footer>

    <app-homeform></app-homeform>
  `,
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {}
