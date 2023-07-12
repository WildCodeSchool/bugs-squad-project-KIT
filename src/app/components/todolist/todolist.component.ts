import { Component, Input } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoService } from 'src/app/services/todolists-services/todo.service';
import { Task } from '../../models/Task';
import { TaskService } from 'src/app/services/todolists-services/task.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;
  @Input() deleteTodolistFn!: (todolist: ToDoList) => void;
  task!: Task;

  constructor(private todoService: TodoService, private taskService: TaskService) {}

  deleteTodolistFromParent(todolist: ToDoList): void {
    this.deleteTodolistFn(todolist);
  }

  updateFavorite(todolist: ToDoList): void {
    this.todoService.updateIsFavorite(todolist.id, !todolist.favorite).subscribe();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      const index = this.todolist.tasks.indexOf(task);
      if (index !== -1) {
        this.todolist.tasks.splice(index, 1);
      }
    });
  }
}
