import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Link } from '../models/Link';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private dataSource = 'http://localhost:8080/api/links';

  private linkData = new BehaviorSubject<Link | null>(null);
  currentLinkData$ = this.linkData.asObservable();

  constructor(private http: HttpClient) {}

  getLinks() {
    return this.http.get(this.dataSource) as Observable<Link[]>;
  }

  createLink(id: number, body: { url: string; title: string | null }) {
    return this.http.post(`${this.dataSource}/${id}`, body) as Observable<Link>;
  }

  updateLink(id: number, body: { url: string; title: string | null }) {
    return this.http.patch(`${this.dataSource}/${id}`, body);
  }

  updateLinkData(link: Link) {
    this.linkData.next(link);
  }

  deleteLink(id: number) {
    return this.http.delete(`${this.dataSource}/${id}`);
  }
}
