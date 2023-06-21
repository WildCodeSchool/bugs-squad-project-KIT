import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(private fb: FormBuilder) {}

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log(formData);
      this.contactForm.reset();
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
}
