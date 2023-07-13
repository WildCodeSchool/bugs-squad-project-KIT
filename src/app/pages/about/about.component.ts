import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    text: ['', [Validators.required, Validators.minLength(10)]],
  });

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('text');
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      this.contactService.submitContactForm(formData).subscribe(
        (response) => {
          this.contactForm.reset();
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
}
