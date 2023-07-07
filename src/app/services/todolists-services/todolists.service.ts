import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../models/ToDoList';

@Injectable({
  providedIn: 'root',
})
export class TodolistsService {
  private dataSource = 'http://localhost:8080/api/todo-lists';

  constructor(private http: HttpClient) {}

  getLists() {
    return this.http.get(this.dataSource) as Observable<ToDoList[]>;
  }
}
