import { Genre } from "./genre.model";

export interface Book {
    id: string;
    title: string;
    pages: number;
    genre: Genre;
  }
  
  