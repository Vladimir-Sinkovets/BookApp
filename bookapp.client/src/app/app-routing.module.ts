import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/pages/books/books.component';
import { BookComponent } from './books/pages/book/book.component';
import { AddBookComponent } from './books/pages/add-book/add-book.component';
import { UpdateBookComponent } from './books/pages/update-book/update-book.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { loginGuard } from './core/guards/login.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: "login", component: LoginComponent, },
      { path: "register", component: RegisterComponent, },
    ]
  },
  {
    path: 'book',
    canActivateChild: [loginGuard],
    children: [
      { path: 'list/:page', component: BooksComponent, },
      { path: 'get/:id', component: BookComponent, },
      { path: 'add', canActivate: [adminGuard], component: AddBookComponent, },
      { path: 'update/:id', canActivate: [adminGuard], component: UpdateBookComponent, },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
