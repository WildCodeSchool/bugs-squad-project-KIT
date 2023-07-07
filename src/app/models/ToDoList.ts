import { Task } from './Task';
export class ToDoList {
  constructor(
    public id: number,
    public title: string = 'Sans titre',
    public tasks: Task[],
    public description?: string
  ) {}
}
