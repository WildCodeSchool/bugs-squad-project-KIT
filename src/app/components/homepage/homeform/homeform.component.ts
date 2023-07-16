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
        localStorage.setItem('principal', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      },
      (error) => {
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
    this.authService.register(username, email, password).subscribe(
      (response) => {
        // Handle successful registration if needed
      },
      (error) => {
        this.toastr.error('An error occurred during registration!');
      }
    );
  }

  // LoggingGoogle function
  LoggingGoogle(): void {
    const popupWindow = window.open(
      'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=734363817336-u22h0urol9chonde49e1lq3o3f3i12sf.apps.googleusercontent.com&scope=openid%20profile%20email&state=esmJQnBOL6iFhhsxnFB2FRYblK8VPFDW7FirqbZfuNc%3D&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Flogin%2Foauth2%2Fcode%2Fgoogle&nonce=Ni6OVMyikryp8PBDe0uGc20Kd-7zVJDgvZvpafQz-zA&service=lso&o2v=2&flowName=GeneralOAuthFlow',
      '_blank',
      'width=600,height=800'
    );

    if (popupWindow) {
      const intervalId = setInterval(() => {
        try {
          if (popupWindow.closed) {
            clearInterval(intervalId);
          } else if (popupWindow.location.href.includes('http://localhost:8080/api/login/oauth2/code/google?')) {
            clearInterval(intervalId);
            this.authService.LoggingGoogle().subscribe(
              (response) => {
                // Handle successful login with Google response here
                console.log(response);
              },
              (error) => {
                this.toastr.error('An error occurred during Google login!');
              }
            );
            popupWindow.close();
          }
        } catch (error) {
          // Catch any error that occurs while accessing the popup window
          console.error('Error:', error);
        }
      }, 1000);
    } else {
      console.error('Failed to open popup window.');
    }
  }
}
