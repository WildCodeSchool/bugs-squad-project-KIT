import { Component } from '@angular/core';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss'],
})
export class Page500Component {
  public errorMessage = "Désolé, une erreur interne du serveur s'est produite. Veuillez réessayer plus tard.";
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
