import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../models/Collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private dataSource = 'http://localhost:8080/api/collections';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'No Auth',
  });

  constructor(private http: HttpClient) {}

  getCollections() {
    return this.http.get(this.dataSource, { headers: this.headers }) as Observable<Collection>;
  }
}
