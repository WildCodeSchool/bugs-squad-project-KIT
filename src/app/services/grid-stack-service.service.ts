import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridStackService {
  private backendURL = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  saveWidgetsPositions(widgetPositions: any[]): Observable<any> {
    return this.http.post<any>(`${this.backendURL}/api/sauvegarder-positions`, widgetPositions);
  }
}
