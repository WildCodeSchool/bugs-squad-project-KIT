import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = '/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(contactForm: any): Observable<any> {
    return this.http.post(this.apiUrl, contactForm);
  }
}
