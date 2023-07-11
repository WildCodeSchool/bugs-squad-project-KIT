import { Link } from './Link';
// Create the collection model with a title, a collection of links and comments and a description
export class Collection {
  constructor(
    public id: number,
    public title: string = 'Sans titre',
    public links: Link[] | null,
    public color: string,
    public description?: string
  ) {}
}
