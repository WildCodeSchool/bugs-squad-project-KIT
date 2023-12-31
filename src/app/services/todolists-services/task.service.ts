import { HttpClient } from '@angular/common/http';
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

  updateTask(body: { description: string }, task: Task) {
    const dataSource = `http://localhost:8080/api/todo-lists/tasks/${task.id}`;

    return this.http.put(dataSource, body) as Observable<Task>;
  }
  createTask(body: { todolist_id: number; description: string; position: number }, listId: number) {
    const dataSource = `http://localhost:8080/api/lists/${listId}/tasks`;
    return this.http.post(dataSource, body) as Observable<Task>;
  }

  updateisDone(task: Task, isDone: boolean) {
    const dataSource = `http://localhost:8080/api/todo-lists/tasks/${task.id}`;
    return this.http.patch(dataSource, isDone) as Observable<Task>;
  }
}
