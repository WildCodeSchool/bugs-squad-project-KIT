import { Component, Input, Inject } from '@angular/core';
import { ToDoList } from 'src/app/models/ToDoList';
import { TodoService } from 'src/app/services/todolists-services/todo.service';
import { Task } from '../../models/Task';
import { TaskService } from 'src/app/services/todolists-services/task.service';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateTaskComponent } from './modals/update-task.component';
import { UpdateTodoComponent } from './modals/update-todo.component';
import { AddNewTaskComponent } from './modals/new-task.component';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todolist!: ToDoList;
  @Input() deleteTodolistFn!: (todolist: ToDoList) => void;
  task!: Task;
  @Input() isFavList = false;

  constructor(
    private todoService: TodoService,
    private taskService: TaskService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.todolist.tasks.sort((a, b) => a.position - b.position);
  }

  deleteTodolistFromParent(todolist: ToDoList): void {
    this.deleteTodolistFn(todolist);
  }

  updateFavorite(todolist: ToDoList): void {
    this.todoService.updateIsFavorite(todolist.id, !todolist.favorite).subscribe(() => {
      todolist.favorite = !todolist.favorite;
    });
  }

  deleteTask(task: Task) {
    if (window.confirm('Êtes-vous sûr.e de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        const index = this.todolist.tasks.indexOf(task);
        if (index !== -1) {
          this.todolist.tasks.splice(index, 1);
        }
        this.toastr.success(`La tâche ${task.description} a été supprimée !`);
      });
    }
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

  updateIsDone(task: Task): void {
    this.taskService.updateisDone(task, !task.isDone).subscribe(() => {
      task.isDone = !task.isDone;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todolist.tasks, event.previousIndex, event.currentIndex);
    this.todolist.tasks.forEach((task, index) => {
      task.position = index;
    });
    const tasks = this.todolist.tasks;
    tasks.sort((a, b) => a.position - b.position);
    this.todoService.updateTasksPosition(tasks, this.todolist.id).subscribe();
  }
}
