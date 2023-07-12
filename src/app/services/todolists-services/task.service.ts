import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  deleteTask(taskid: number | undefined) {
    const dataSource = `http://localhost:8080/api/todo-lists/tasks/${taskid}`;
    return this.http.delete(dataSource) as Observable<Task>;
  }

  updateTask(task: Task) {
    const dataSource = `http://localhost:8080/api/todo-lists/tasks/${task.id}`;
    return this.http.put(dataSource, task) as Observable<Task>;
  }
}
