import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskService {
  constructor(private http: HttpClient) {}

  deleteTask(taskid: number) {
    const dataSource = `http://localhost:8080/api/todo-lists/tasks/${taskid}`;
    return this.http.delete(dataSource) as Observable<Task>;
  }
}
