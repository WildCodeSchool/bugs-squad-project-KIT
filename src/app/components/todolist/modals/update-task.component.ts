import { Component, Input, Inject } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskService } from 'src/app/services/todolists-services/task.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-list-form',
  templateUrl: './update-task.component.html',
  styleUrls: ['../todolist.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatDialogModule],
})
export class UpdateTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  description = new FormControl(this.data.task.description);

  updateTask(): void {
    console.log('Je suis dans update');
    const description = this.description.value as string;
    const task = this.data.task;

    const body = {
      description: description,
    };

    this.taskService.updateTask(body, task).subscribe(() => {
      task.description = description as string;
    });
  }
}
