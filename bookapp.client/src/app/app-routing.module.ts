import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/pages/books/books.component';
import { BookComponent } from './books/pages/book/book.component';
import { AddBookComponent } from './books/pages/add-book/add-book.component';
import { UpdateBookComponent } from './books/pages/update-book/update-book.component';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'book/list/:page', component: BooksComponent,
  },
  {
    path: 'book/get/:id', component: BookComponent,
  },
  {
    path: 'book/add', component: AddBookComponent,
  },
  {
    path: 'book/update/:id', component: UpdateBookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
