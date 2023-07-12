import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Collection } from '../models/Collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private dataSource = 'http://localhost:8080/api/collections';

  private collectionData = new BehaviorSubject<Collection | null>(null);
  currentCollectionData = this.collectionData.asObservable();

  constructor(private http: HttpClient) {}

  getCollections() {
    return this.http.get(this.dataSource) as Observable<Collection[]>;
  }

  createCollection(body: { color: string | null; description: string | null; title: string | null }) {
    return this.http.post(this.dataSource, body) as Observable<Collection>;
  }

  updateCollectionData(collection: Collection) {
    this.collectionData.next(collection);
  }

  deleteCollection(id: number) {
    return this.http.delete(`${this.dataSource}/${id}`);
  }
}
