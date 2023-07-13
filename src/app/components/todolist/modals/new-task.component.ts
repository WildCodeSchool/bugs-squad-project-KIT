import { Component, Input, Inject } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { Task } from '../../../models/Task';
import { TaskService } from 'src/app/services/todolists-services/task.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-list-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['../todolist.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatDialogModule],
})
export class AddNewTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewTaskComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { todolist: ToDoList }
  ) {}
  todolist!: ToDoList;
  task!: Task;
  description = new FormControl('');
  id = new FormControl();

  addTask(): void {
    const description = this.description.value as string;
    const todolist = this.data.todolist;

    const body = {
      todolist_id: todolist.id,
      description: description,
    };

    this.taskService.createTask(body, todolist.id).subscribe((data) => {
      this.task = data;
      this.task = new Task(todolist.id, description as string, false);
      todolist.tasks.push(this.task);
    });
  }
}
