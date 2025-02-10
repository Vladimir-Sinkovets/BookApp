import { Book } from "./book.model";

export type AddBook = Omit<Book, 'id' >;
