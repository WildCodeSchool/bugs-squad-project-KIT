import { Component, Input } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { FavoriteTodoService } from 'src/app/services/todolists-services/favorite-todo.service';
import { DeleteTaskService } from 'src/app/services/todolists-services/delete-task.service';
import { Task } from '../../models/Task';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;
  @Input() deleteTodolistFn!: (todolist: ToDoList) => void;
  task!: Task;

  constructor(private favoriteService: FavoriteTodoService, private deleteTaskService: DeleteTaskService) {}

  deleteTodolistFromParent(todolist: ToDoList): void {
    this.deleteTodolistFn(todolist);
  }

  updateFavorite(todolist: ToDoList): void {
    this.favoriteService.updateIsFavorite(todolist.id, !todolist.favorite).subscribe();
  }

  deleteTask(task: Task) {
    this.deleteTaskService.deleteTask(task.id).subscribe(() => {
      const index = this.todolist.tasks.indexOf(task);
      if (index !== -1) {
        this.todolist.tasks.splice(index, 1);
      }
    });
  }
}
