import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/services/todolists-services/todo.service';
import { ToDoList } from 'src/app/models/ToDoList';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NewListFormComponent } from './modal/new-list.component';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.scss'],
})
export class TodolistsComponent implements OnInit {
  todolists: ToDoList[] = [];
  todolist!: ToDoList;

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.todoService.getLists().subscribe((data) => {
      this.todolists = data;
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NewListFormComponent, {
      width: '300px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        todolists: this.todolists,
      },
    });
  }

  deleteTodolist(todolist: ToDoList): void {
    if (window.confirm('Êtes-vous sûr.e de vouloir supprimer cette liste ?')) {
      this.todoService.deleteList(todolist.id).subscribe(() => {
        const index = this.todolists.indexOf(todolist);
        if (index !== -1) {
          this.todolists.splice(index, 1);
        }
      });
    }
  }

  addToTodoLists() {
    this.todolists.push(this.todolist);
  }
}
