import { IBook } from "./book.interface";

export interface IAddBook extends Omit<IBook, 'id'> { };
