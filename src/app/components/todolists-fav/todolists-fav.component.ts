import { Component, OnInit } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoService } from 'src/app/services/todolists-services/todo.service';
@Component({
  selector: 'app-todolists-fav',
  templateUrl: './todolists-fav.component.html',
  styleUrls: ['./todolists-fav.component.scss'],
})
export class TodolistsFavComponent implements OnInit {
  todoList!: ToDoList;
  favTodolists: ToDoList[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getFavoriteLists().subscribe((data) => {
      this.favTodolists = data;
    });
  }
}
