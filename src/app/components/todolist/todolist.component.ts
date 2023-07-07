import { Component, Input } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { Task } from 'src/app/models/Task';
import { TodoDeleteService } from 'src/app/services/todolists-services/todo-delete.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;

  constructor(private todolistService: TodoDeleteService) {}

  delete(todolist: ToDoList): void {
    this.todolist = todolist;
    this.todolistService.deleteList(todolist.id).subscribe();
  }
}
