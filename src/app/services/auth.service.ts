import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  // TODO Create a Model for my JSON  - PICK  de l'object prendre que la data qui nous interesse

  public login(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login`, { email, password }).pipe(
      map((data) => {
        if (data) {
          console.log(data);
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
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data));
        }
        return data;
      })
    );
  }
}
