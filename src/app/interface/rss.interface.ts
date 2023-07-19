export interface RssItem {
  title: string;
  pubDate: string;
  link: string;
  feedTitle?: string;
  feedFavicon?: string;
  description?: string;
  author?: string;
}


export interface RssDataFeeds {
  status: string;
  id: number;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
}

export interface RssResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: RssItem[];
}
