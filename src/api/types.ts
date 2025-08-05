export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
