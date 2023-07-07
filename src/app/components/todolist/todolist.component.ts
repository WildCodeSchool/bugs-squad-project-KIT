import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { Task } from 'src/app/models/Task';
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

  constructor(private todolistService: TodoDeleteService, private favoriteService: FavoriteTodoService) {}

  isFavorite(todolist: ToDoList): void {
    this.todolist = todolist;
    this.favoriteService.favoriteList(todolist.id).subscribe();
    this.todolist.isFavorite = true;
  }
}
