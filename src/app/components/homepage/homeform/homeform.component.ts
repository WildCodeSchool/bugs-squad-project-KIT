import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
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
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordStrengthValidator()]),
  });

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private router: Router,
    private toastr: ToastrService
  ) {}


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

  login() {
    if (this.loginForm.invalid) return;
    this.toastr.error('Erreur : Une erreur est survenue !');
  }

  register() {
    if (this.registerForm.invalid) return;
    this.toastr.error('Erreur : Une erreur est survenue !');
  }

  loginWithGoogle() {
    this.oidcSecurityService.authorize();
  }
}
