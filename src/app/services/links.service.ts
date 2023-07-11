import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Link } from '../models/Link';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private dataSource = 'http://localhost:8080/api/links/';
  private linkData = new BehaviorSubject<Link | null>(null);
  currentLinkData = this.linkData.asObservable();

  constructor(private http: HttpClient) {}

  getCollections() {
    return this.http.get(this.dataSource) as Observable<Link[]>;
  }

  createLink(body: { id: number; url: string; comment: string | null; collectionId: number }) {
    return this.http.post(this.dataSource, body) as Observable<Link>;
  }

  updateLinkData(link: Link) {
    this.linkData.next(link);
  }
}
