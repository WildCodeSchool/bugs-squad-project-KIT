import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../models/Collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private dataSource = 'http://localhost:8080/api/collections';

  constructor(private http: HttpClient) {}

  getCollections() {
    return this.http.get(this.dataSource) as Observable<Collection[]>;
  }

  createCollection(body: {
    color: string | null;
    link: (string | null)[];
    description: string | null;
    comment: string | null;
    title: string | null;
  }) {
    return this.http.post(this.dataSource, body) as Observable<Collection>;
  }
}
