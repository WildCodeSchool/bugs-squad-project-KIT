import { Task } from './Task';
export class ToDoList {
  constructor(
    public title: string | null = 'Sans titre',
    public tasks: Task[] | null = [],
    public description?: string | null,
    public favorite: boolean = false
  ) {}
}
