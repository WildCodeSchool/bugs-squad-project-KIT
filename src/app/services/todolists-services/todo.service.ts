import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../models/ToDoList';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  private dataSource = 'http://localhost:8080/api/todo-lists';

  createList(body: { title: string; description: string | null }) {
    const dataSource = `http://localhost:8080/api/todo-lists`;
    return this.http.post(dataSource, body) as Observable<ToDoList>;
  }

  deleteList(id: number | undefined): Observable<ToDoList> {
    const dataSource = `http://localhost:8080/api/todo-lists/${id}`;
    return this.http.delete(dataSource) as Observable<ToDoList>;
  }

  updateIsFavorite(id: number | undefined, isFavorite: boolean) {
    const dataSource = `http://localhost:8080/api/todo-lists/${id}`;
    return this.http.patch(dataSource, isFavorite);
  }

  getLists() {
    return this.http.get(this.dataSource) as Observable<ToDoList[]>;
  }

  updateTodo(body: { title: string; description: string }, id: number) {
    const dataSource = `http://localhost:8080/api/todo-lists/${id}`;
    return this.http.put(dataSource, body) as Observable<ToDoList>;
  }

  getFavoriteLists() {
    return this.http.get(this.dataSource + '?isfavorite=true' ) as Observable<ToDoList[]>;
  }
}
