import { Component, Inject } from '@angular/core';
import { TodoService } from 'src/app/services/todolists-services/todo.service';
import { ToDoList } from 'src/app/models/ToDoList';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-list-form',
  templateUrl: './new-list-form.component.html',
  styleUrls: ['./new-list-form.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatDialogModule],
})
export class NewListFormComponent {
  constructor(
    public dialogRef: MatDialogRef<NewListFormComponent>,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: { todolists: ToDoList[] }
  ) {}
  todolists: ToDoList[] = [];
  todolist!: ToDoList;
  title = new FormControl('');
  description = new FormControl('');
  tasks = new FormControl('');

  createTodolist(): void {
    const title = this.title.value as string;
    const description = this.description.value as string;
    const todolists = this.data.todolists;

    const body = {
      title: title,
      description: description,
    };

    this.todoService.createList(body).subscribe((data) => {
      this.todolist = data;
      this.todolist = new ToDoList(this.todolist.id, title as string, [], description as string, false);
      todolists.push(this.todolist);
    });
  }
}
