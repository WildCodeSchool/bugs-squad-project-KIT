import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../models/ToDoList';

@Injectable({
  providedIn: 'root',
})
export class TodoDeleteService {
  constructor(private http: HttpClient) {}

  deleteList(id: number): Observable<ToDoList> {
    const dataSource = `http://localhost:8080/api/todo-lists/${id}`;
    return this.http.delete(dataSource) as Observable<ToDoList>;
  }
}
