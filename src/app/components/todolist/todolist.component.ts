import { Component, Input } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { Task } from 'src/app/models/Task';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;
}
