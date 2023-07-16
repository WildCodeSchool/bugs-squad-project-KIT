import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/';
  private googleUrl =
    'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=734363817336-u22h0urol9chonde49e1lq3o3f3i12sf.apps.googleusercontent.com&scope=openid%20profile%20email&state=esmJQnBOL6iFhhsxnFB2FRYblK8VPFDW7FirqbZfuNc%3D&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Flogin%2Foauth2%2Fcode%2Fgoogle&nonce=Ni6OVMyikryp8PBDe0uGc20Kd-7zVJDgvZvpafQz-zA&service=lso&o2v=2&flowName=GeneralOAuthFlow';

  constructor(private http: HttpClient) {}

  public LoggingGoogle(): Observable<any> {
    return this.http.get<any>(`${this.googleUrl}`).pipe(
      map((data) => {
        if (data.redirect) {
          localStorage.setItem('token', JSON.stringify(data));
          window.location.href = data.redirect;
        }
        return data;
      })
    );
  }

  public login(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login`, { email, password }).pipe(
      map((data) => {
        if (data) {
          localStorage.setItem('token', JSON.stringify(data));
        }
        return data;
      })
    );
  }

  public register(
    username: string | null | undefined,
    email: string | null | undefined,
    password: string | null | undefined
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/register`, { username, email, password }).pipe(
      map((data) => {
        if (data) {
          localStorage.setItem('token', JSON.stringify(data));
        }
        return data;
      })
    );
  }
}
