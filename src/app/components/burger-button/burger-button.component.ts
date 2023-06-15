import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
})
export class BurgerButtonComponent {
  @Output() opened = new EventEmitter<never>();

  active = false;

  // On hold for further testing
  //
  //@Input() init = false;
  //ngOnInit() {
  //  this.active = this.init || false;
  //}

  onBurgerClicked() {
    this.active = !this.active;
    this.opened.emit();
  }
}
