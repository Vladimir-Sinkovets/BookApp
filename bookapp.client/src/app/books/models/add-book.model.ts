import { IBook } from "./book.model";

export interface IAddBook extends Omit<IBook, 'id'> { };
