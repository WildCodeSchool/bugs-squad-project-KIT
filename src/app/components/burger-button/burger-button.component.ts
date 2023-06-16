import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
})
export class BurgerButtonComponent {
  @Output() opened = new EventEmitter<never>();

  active = false;

  onBurgerClicked() {
    this.active = !this.active;
    this.opened.emit();
  }
}
