export interface RssDataItems {
  items: {
    title: string;
    pubDate: string;
    link: string;
    description?: string;
    author?: string;
    feedTitle?: string;
    feedFavicon?: string;
  }[];
}
export interface RssDataFeeds {
  status: string;
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
  items: {
    title: string;
    pubDate: string;
    link: string;
  }[];
}

