import { Component } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent {
  scrollToBottom() {
    const element = document.getElementById('scrollbutton');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
