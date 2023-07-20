export class RssFeed {
  id: number;
  url: string;
  isFavorite: boolean;
  title?: string;

  constructor(id: number, url: string, isFavorite: boolean, title: string) {
    this.id = id;
    this.url = url;
    this.isFavorite = isFavorite;
    this.title = title;
  }
}
