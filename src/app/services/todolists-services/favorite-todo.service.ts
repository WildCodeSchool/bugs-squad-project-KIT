import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../models/ToDoList';

@Injectable({
  providedIn: 'root',
})
export class FavoriteTodoService {
  constructor(private http: HttpClient) {}

  updateIsFavorite(id: number, isFavorite: boolean) {
    const updatedObject = { isFavorite: isFavorite };
    const dataSource = `http://localhost:8080/api/todo-lists/${id}`;
    return this.http.put(dataSource, updatedObject) as Observable<ToDoList>;

  }
}
