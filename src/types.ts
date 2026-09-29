export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  watched: boolean;
}

export type { Movie as MovieType };