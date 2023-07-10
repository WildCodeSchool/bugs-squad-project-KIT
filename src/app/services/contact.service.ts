import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private dataSource = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(contactForm: any): Observable<any> {
    return this.http.post(this.dataSource, contactForm);
  }
}
