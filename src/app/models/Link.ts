export class Link {
  constructor(
    public id: number,
    public url: string,
    public title: string | null,
    public position: number,
    public collectionId: number
  ) {}
}
