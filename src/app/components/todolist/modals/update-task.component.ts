import { Component, Input, Inject } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskService } from 'src/app/services/todolists-services/task.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-list-form',
  templateUrl: './update-task.component.html',
  styleUrls: ['../todolist.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatDialogModule, CommonModule],
})
export class UpdateTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    private taskService: TaskService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  description = new FormControl(this.data.task.description, [Validators.required]);

  updateTask(): void {
    const description = this.description.value as string;
    const task = this.data.task;

    const body = {
      description: description,
    };

    this.taskService.updateTask(body, task).subscribe(() => {
      task.description = description as string;
      this.toastr.success(`La tâche ${task.description} a été modifiée !`);
    });
  }
}
