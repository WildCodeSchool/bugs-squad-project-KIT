import { Component, Input, Inject } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoService } from 'src/app/services/todolists-services/todo.service';
import { Task } from '../../models/Task';
import { TaskService } from 'src/app/services/todolists-services/task.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateTaskComponent } from './modals/update-task.component';
import { UpdateTodoComponent } from './modals/update-todo.component';
import { AddNewTaskComponent } from './modals/new-task.component';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;
  @Input() deleteTodolistFn!: (todolist: ToDoList) => void;
  task!: Task;

  constructor(private todoService: TodoService, private taskService: TaskService, public dialog: MatDialog) {}

  deleteTodolistFromParent(todolist: ToDoList): void {
    this.deleteTodolistFn(todolist);
  }

  updateFavorite(todolist: ToDoList): void {
    this.todoService.updateIsFavorite(todolist.id, !todolist.favorite).subscribe(() => {
      todolist.favorite = !todolist.favorite;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      const index = this.todolist.tasks.indexOf(task);
      if (index !== -1) {
        this.todolist.tasks.splice(index, 1);
      }
    });
  }

  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddNewTaskComponent, {
      width: '300px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        todolist: this.todolist,
      },
    });
  }

  openUpdateTask(task: Task): void {
    this.openDialogUpdateTask('100ms', '100ms', task);
  }

  openDialogUpdateTask(enterAnimationDuration: string, exitAnimationDuration: string, task: Task): void {
    this.dialog.open(UpdateTaskComponent, {
      width: '300px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        task: task,
      },
    });
  }

  openDialogUpdateTodo(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UpdateTodoComponent, {
      width: '300px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        todolist: this.todolist,
      },
    });
  }
}
