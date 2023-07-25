import { Component, Input, Inject } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { Task } from '../../../models/Task';
import { TaskService } from 'src/app/services/todolists-services/task.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-list-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['../todolist.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatDialogModule, CommonModule],
})
export class AddNewTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewTaskComponent>,
    private taskService: TaskService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { todolist: ToDoList }
  ) {}
  todolist!: ToDoList;
  task!: Task;
  description = new FormControl('', [Validators.required]);
  id = new FormControl();

  addTask(): void {
    const description = this.description.value as string;
    const todolist = this.data.todolist;

    const body = {
      todolist_id: todolist.id,
      description: description,
      position: todolist.tasks.length,
    };

    this.taskService.createTask(body, todolist.id).subscribe((data) => {
      this.task = data;
      todolist.tasks.push(this.task);
      this.toastr.success(`La tâche ${this.task.description} a été créée !`);
    });
  }
}
