import { Component } from '@angular/core';
import { TodolistsService } from 'src/app/services/todolists-services/todolists.service';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoDeleteService } from 'src/app/services/todolists-services/todo-delete.service';
import { FormControl } from '@angular/forms';
import { CreateTodoService } from 'src/app/services/todolists-services/create-todo.service';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.scss'],
})
export class TodolistsComponent {
  todolists: ToDoList[] = [];
  todolist!: ToDoList;
  title = new FormControl('');
  description = new FormControl('');
  tasks = new FormControl('');

  constructor(
    private todolistsService: TodolistsService,
    private todoDeleteService: TodoDeleteService,
    private todoCreateService: CreateTodoService
  ) {}

  ngOnInit() {
    this.todolistsService.getLists().subscribe((data) => {
      this.todolists = data;
    });
  }

  deleteTodolist(todolist: ToDoList): void {
    this.todoDeleteService.deleteList(todolist.id).subscribe(() => {
      const index = this.todolists.indexOf(todolist);
      if (index !== -1) {
        this.todolists.splice(index, 1);
      }
    });
  }

  createTodolist(todoList: ToDoList): void {
    const title = this.title.value;
    const description = this.description.value;
    const tasks = this.tasks.value;
    const favorite = this.todolist.favorite;

    const body = {
      title: title,
      description: description,
      tasks: [tasks],
      favorite: favorite,
    };

    this.todoCreateService.createList(body).subscribe((data) => {
      this.todolist = data;

      this.todolist = new ToDoList(title as string, [new Task(description as string, false)], description as string);

      this.addToTodoLists();
    });
  }

  addToTodoLists() {
    this.todolists.push(this.todolist);
  }
}
