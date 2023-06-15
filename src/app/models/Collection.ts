import { Link } from './Link';
// Create the collection model with a title, a collection of links and comments and a description
export class Collection {
  constructor(public title: string = 'Sans titre', public links: Link[], public description?: string) {}
}
