import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { GoogleApiService } from '../../../services/google-api.service';
import { OAuthService } from 'angular-oauth2-oidc';

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


  constructor(private readonly googleApiService: GoogleApiService, private readonly oauthService: OAuthService) {
    this.googleApiService = googleApiService;
  }

  login() {
    // CALL API with username and password
    if (this.loginForm.invalid) return;
    alert('Calling backend to login');
  }

  register() {
    if (this.registerForm.invalid) return;
    alert('Calling backend to register');
  }

  loginWithGoogle() {
    this.oauthService.initLoginFlow();
  }
}
