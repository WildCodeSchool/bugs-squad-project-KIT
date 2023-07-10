import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../models/ToDoList';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class CreateTodoService {
  constructor(private http: HttpClient) {}

  createList(body: { title: string; description: string | null; tasks: string | null[]; favorite: boolean }) {
    const dataSource = `http://localhost:8080/api/todo-lists`;
    return this.http.post(dataSource, body) as Observable<ToDoList>;
  }
}
