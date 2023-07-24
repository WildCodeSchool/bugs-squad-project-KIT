export interface RssItem {
  title: string;
  pubDate: string;
  link: string;
  feedTitle?: string;
  feedFavicon?: string;
  description?: string;
  author?: string;
}

export interface RssDataFeed {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}

export interface RssResponse {
  status: string;
  feed: RssDataFeed;
  items: RssItem[];
}
