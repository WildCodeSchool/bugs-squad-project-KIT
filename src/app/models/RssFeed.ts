export class RssFeed {
  id: number;
  url: string;
  favorite: boolean;
  title?: string;

  constructor(id: number, url: string, favorite: boolean, title: string) {
    this.id = id;
    this.url = url;
    this.favorite = favorite;
    this.title = title;
  }
}
