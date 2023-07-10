export class RssFeed {
  id: number;
  url: string;
  isFavorite: boolean;

  constructor(id: number, url: string, isFavorite: boolean) {
    this.id = id;
    this.url = url;
    this.isFavorite = isFavorite;
  }
}
