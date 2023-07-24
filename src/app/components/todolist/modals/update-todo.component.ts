import { Component, Input, Inject } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoService } from 'src/app/services/todolists-services/todo.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-list-form',
  templateUrl: './update-todo.component.html',
  styleUrls: ['../todolist.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatDialogModule],
})
export class UpdateTodoComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateTodoComponent>,
    private todoService: TodoService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { todolist: ToDoList }
  ) {}
  title = new FormControl(this.data.todolist.title);
  description = new FormControl(this.data.todolist.description);

  updateTodo(): void {
    const description = this.description.value as string;
    const title = this.title.value as string;
    const todolist = this.data.todolist;

    const body = {
      title: title,
      description: description,
    };

    this.todoService.updateTodo(body, todolist.id).subscribe(() => {
      todolist.title = title as string;
      todolist.description = description as string;
      this.toastr.success(`La liste ${todolist.title} a été modifiée !`);
    });
  }
}
