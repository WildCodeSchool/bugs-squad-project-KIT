import { Link } from './Link';
export class Collection {
  constructor(
    public id: number,
    public title: string = 'Sans titre',
    public links: Link[] | null,
    public color: string,
    public favorite: boolean,
    public description?: string
  ) {}
}
