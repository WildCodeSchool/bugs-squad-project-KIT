import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoDeleteService } from 'src/app/services/todolists-services/todo-delete.service';
import { FavoriteTodoService } from 'src/app/services/todolists-services/favorite-todo.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;
  @Input() deleteTodolist!: (todolist: ToDoList) => void;

  constructor(private favoriteService: FavoriteTodoService) {}

  isFavorite(todolist: ToDoList): void {
    this.favoriteService.updateIsFavorite(todolist.id, true).subscribe({
      next: () => {
        // Success
        this.todolist.isFavorite = true;
      },
      error: (error) => {
        // Handle error
        console.error(error);
      },
      complete: () => {
        // Optional: Handle complete event
      }
    });
  }
  isNotFavorite(todolist: ToDoList): void {
    this.favoriteService.updateIsFavorite(todolist.id, false).subscribe();
    this.todolist.isFavorite = false;
  }
}
