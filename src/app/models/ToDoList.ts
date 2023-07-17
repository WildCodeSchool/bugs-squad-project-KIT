import { Task } from './Task';
export class ToDoList {
  constructor(
    public id: number,
    public title: string | null = 'Sans titre',
    public tasks: Task[],
    public description?: string | null,
    public favorite: boolean = false
  ) {}
}
