import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../models/ToDoList';

@Injectable({
  providedIn: 'root',
})
export class FavoriteTodoService {
  constructor(private http: HttpClient) {}

  favoriteList(id: number) {
    const body = { favorite: true };
    const dataSource = `http://localhost:8080/api/todo-lists/${id}`;
    return this.http.patch(dataSource, body) as Observable<ToDoList>;
  }
}
