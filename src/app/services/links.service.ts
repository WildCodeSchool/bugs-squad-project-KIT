import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from '../models/Link';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private dataSource = 'http://localhost:8080/api/links/';

  constructor(private http: HttpClient) {}

  getCollections() {
    return this.http.get(this.dataSource) as Observable<Link[]>;
  }
}
