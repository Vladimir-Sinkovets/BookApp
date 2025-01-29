import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/pages/books/books.component';
import { BookComponent } from './books/pages/book/book.component';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'books-list', component: BooksComponent,
  },
  {
    path: 'book', component: BookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
