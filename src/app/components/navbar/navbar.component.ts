import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showOptions() {
    const options = document.querySelector('.profile-btn');
    if (options) options.classList.toggle('active');
  }
}
