import { Book } from "./book.model";

export type BookWithAuthor = Book & { authorName: string };
