import { Component } from '@angular/core';
import { TodolistsService } from 'src/app/services/todolists-services/todolists.service';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoDeleteService } from 'src/app/services/todolists-services/todo-delete.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.scss'],
})
export class TodolistsComponent {
  todolists: ToDoList[] = [];

  constructor(private todolistsService: TodolistsService, private todoDeleteService: TodoDeleteService) {}

  ngOnInit() {
    this.todolistsService.getLists().subscribe((data) => {
      this.todolists = data;
    });
  }

  deleteTodolist(todolist: ToDoList): void {
    console.log(todolist);
    this.todoDeleteService.deleteList(todolist.id).subscribe(() => {
      const index = this.todolists.indexOf(todolist);
      if (index !== -1) {
        this.todolists.splice(index, 1);
        console.log(index);
      }
    });
  }
}
