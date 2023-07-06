import { Component } from '@angular/core';
import { TodolistsService } from 'src/app/services/todolists.service';
import { ToDoList } from 'src/app/models/ToDoList';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.scss'],
})
export class TodolistsComponent {
  todolists: ToDoList[] = [];

  constructor(private todolistsService: TodolistsService) {}

  ngOnInit() {
    this.todolistsService.getLists().subscribe((data) => {
      this.todolists = data;
    });
  }
}
