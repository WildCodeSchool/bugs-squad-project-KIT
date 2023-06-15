import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="container">
      <div class="upper">K.I.T.</div>
      <div class="lower">K.I.T.</div>
      <div class="inside">Keep it together</div>
    </div>
    <app-presentation></app-presentation>
    <!-- <app-scroll-button></app-scroll-button> -->

    <app-homeform></app-homeform>
  `,
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {}
