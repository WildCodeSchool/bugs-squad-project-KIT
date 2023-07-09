import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { FavoriteTodoService } from 'src/app/services/todolists-services/favorite-todo.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;
  @Input() deleteTodolistFn!: (todolist: ToDoList) => void;

  constructor(private favoriteService: FavoriteTodoService) {}

  deleteTodolistFromParent(todolist: ToDoList): void {
    this.deleteTodolistFn(todolist);
  }

  updateFavorite(todolist: ToDoList): void {
    this.favoriteService.updateIsFavorite(todolist.id, !todolist.favorite).subscribe();
    this.todolist.favorite = !this.todolist.favorite;
    console.log(todolist);
  }
}
