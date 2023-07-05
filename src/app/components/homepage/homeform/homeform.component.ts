import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homeform',
  templateUrl: './homeform.component.html',
  styleUrls: ['./homeform.component.scss'],
})
export class HomeformComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  login() {
    // CALL API with username and password
    if (this.loginForm.invalid) return;
    alert('Calling backend to login');
  }

  register() {
    if (this.registerForm.invalid) return;
    alert('Calling backend to register');
  }
}
