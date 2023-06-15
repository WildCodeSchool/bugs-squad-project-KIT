import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
})
export class BurgerButtonComponent implements OnInit {
  @Input() init = false;
  @Output() opened = new EventEmitter<never>();

  active = false;

  ngOnInit() {
    this.active = this.init || false;
  }

  onBurgerClicked() {
    this.active = !this.active;
    this.opened.emit();
  }
}
