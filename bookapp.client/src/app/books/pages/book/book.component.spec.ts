import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { AuthApiService } from "../../../auth/services/auth.api-service";
import { BookApiService } from "../../services/book-api.service";
import { BookComponent } from "./book.component";
import { IBook } from "../../models/book.model";

describe('BookComponent', () => {
  let component: BookComponent;
  let bookApi: jasmine.SpyObj<BookApiService>;
  let authApi: jasmine.SpyObj<AuthApiService>;
  let router: jasmine.SpyObj<Router>;
  let fixture: ComponentFixture<BookComponent>;

  let activatedRouteFake = {
    snapshot: {
      paramMap: {
        get(id: number) {
          return 2;
        }
      }
    }
  };

  const book: IBook = { id: 1, title: 'Book 1', author: 'Author 1', description: '', fragment: '', tags: ['test'] };

  const bookApiResponse = {
    isSucceeded: true,
    message: 'Success',
    data: book,
  };

  const badBookApiResponse = {
    isSucceeded: false,
    message: 'Error',
    data: undefined,
  };

  beforeEach(() => {
    bookApi = jasmine.createSpyObj('BookApiService', ['getBook']);
    authApi = jasmine.createSpyObj('AuthApiService', ['isLoggedIn$', 'isAdmin']);
    router = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        BookComponent,
        { provide: BookApiService, useValue: bookApi, },
        { provide: AuthApiService, useValue: authApi, },
        { provide: Router, useValue: router, },
        { provide: ActivatedRoute, useValue: activatedRouteFake, },
      ]
    });

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
  });

  it('should load book on initialization', () => {
    // arrange
    bookApi.getBook.and.returnValue(of(bookApiResponse));
    authApi.isLoggedIn$ = new BehaviorSubject<boolean>(true);

    // act
    component.ngOnInit();

    // assert
    expect(component.book?.id).toEqual(1);
  });

  it('should show an error of loading the book on initialization', () => {
    // arrange
    bookApi.getBook.and.returnValue(of(badBookApiResponse));
    authApi.isLoggedIn$ = new BehaviorSubject<boolean>(true);

    // act
    component.ngOnInit();
    fixture.detectChanges();

    // assert
    const error = fixture.nativeElement.querySelector('.error-message');
    expect(error.textContent).toContain(badBookApiResponse.message);
  });

  it('should check an the admin role on initialization', () => {
    // arrange
    bookApi.getBook.and.returnValue(of(bookApiResponse));
    authApi.isAdmin.and.returnValue(true);

    const behavior = new BehaviorSubject<boolean>(true);
    authApi.isLoggedIn$ = behavior.asObservable();

    // act
    component.ngOnInit();

    // assert
    expect(component.isAdmin).toBeTrue();
  });

  it('editClick() should navigate to edit page', () => {
    // arrange
    component.book = book;
    component.id = 1;

    // act
    component.editClick();

    // assert
    expect(router.navigateByUrl).toHaveBeenCalledWith('book/update/1');
  });
});
