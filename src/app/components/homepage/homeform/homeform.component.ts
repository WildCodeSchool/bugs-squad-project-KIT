import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { GoogleApiService } from '../../../services/google-api.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

      if (password && !regex.test(password)) {
        return { passwordStrength: true };
      }
      return null;
    };
  }

  constructor(
    private readonly googleApiService: GoogleApiService,
    private readonly oauthService: OAuthService,
    private readonly http: HttpClient,
    private readonly toastr: ToastrService
  ) {}

  login() {
    if (this.loginForm.invalid) return;

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.http.post('http://localhost:8080/api/auth/login', loginData).subscribe(
      (response: any) => {
        // Handle API response after successful login
        console.log(response);

        // Extract token and user information from the response
        const {
          token,
          user: {
            id,
            username,
            origin,
            email,
            authorities: [{ authority }],
          },
        } = response;

        // Store the token and user information in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id, username, email, authority, origin }));

        if (token) {
          // Set the token in the HTTP header
          new HttpHeaders().set('Authorization', `Bearer ${token}`);
          // Redirect the user to /dashboard
          window.location.href = '/dashboard';
        }

        this.toastr.success('Login successful');
      },
      (error) => {
        // Handle errors during login
        console.log(error);
        this.toastr.error('Error during login');
      }
    );
  }

  register() {
    if (this.registerForm.invalid) return;

    const registerData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    this.http.post(`http://localhost:8080/api/auth/register`, registerData).subscribe(
      (response) => {
        // Handle API response after successful registration
        console.log(response);
        this.toastr.success('Registration successful');
      },
      (error) => {
        // Handle errors during registration
        console.log(error);
        this.toastr.error('Error during registration');
      }
    );
  }

  loginWithGoogle() {
    this.oauthService.initCodeFlow();
  }
}
