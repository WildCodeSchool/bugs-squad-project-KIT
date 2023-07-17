import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordStrengthValidator()]),
  });

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) {}

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      if (password && !regex.test(password)) {
        return { passwordStrength: true };
      }
      return null;
    };
  }

  // Login function
  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('Error: Invalid login credentials!');
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Login successful!');
      },
      (error) => {
        console.log(error);
        this.toastr.error('An error occurred during login!');
      }
    );
  }

  // Register function
  register() {
    if (this.registerForm.invalid) {
      this.toastr.error('Error: Invalid registration data!');
      return;
    }
    const { username, email, password } = this.registerForm.value;
    console.log(username, email, password);
    this.authService.register(username, email, password).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.toastr.error('An error occurred during registration!');
      }
    );
  }
  LoggingGoogle(): void {
    const popupWindow = window.open(
      'http://localhost:8080/api/oauth2/authorization/google',
      '_blank',
      'width=600,height=800'
    );
    if (popupWindow) {
      console.log(popupWindow);
      const origin = window.location.origin;
      console.log(origin);
      const eventListener = (event: any) => {
        console.log("je rentre dans l'event listener");
        // si le status est ok alors on enregistre le token dans le local storage
        if (
          event.origin === 'http://localhost:8080' ||
          event.origin === 'https://accounts.google.com/o/oauth2/v2/auth'
        ) {
          console.log(event.data);
          console.log(origin);
          localStorage.setItem('token', event.data.token);
          this.router.navigate(['/dashboard']);
          popupWindow.close();
        }
      };
      eventListener(event);
    }
  }
}
