import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { BooksListComponent } from "./books-list.component";
import { BookApiService } from "../../services/book-api.service";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";

describe('BookListComponent', () => {
  let component: BooksListComponent;
  let router: jasmine.SpyObj<Router>;
  let bookApi: jasmine.SpyObj<BookApiService>;

  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    bookApi = jasmine.createSpyObj('BookApiService', ['getPaginatedBooks']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router, },
        { provide: BookApiService, useValue: bookApi, },
      ]
    });

    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
  });

  it('should load books on initialization', () => {
    // arrange
    bookApi.getPaginatedBooks.and.returnValue(of({
      isSucceeded: true,
      message: 'Success',
      data: {
        books: [
          { id: 1, title: 'Book 1', author: 'Author 1', description: '', fragment: '', tags: ['test'] },
        ],
        lastPage: 1,
      }
    }));

    // act
    component.ngOnChanges();
    fixture.detectChanges();

    // assert
    expect(component.books.length).toEqual(1);
  });

  it('should render books', () => {
    // arrange
    bookApi.getPaginatedBooks.and.returnValue(of({
      isSucceeded: true,
      message: 'Success',
      data: {
        books: [
          { id: 1, title: 'Book 1', author: 'Author 1', description: '', fragment: '', tags: ['test'] },
          { id: 2, title: 'Book 2', author: 'Author 2', description: '', fragment: '', tags: ['test'] },
        ],
        lastPage: 1,
      }
    }));

    // act
    component.ngOnChanges();
    fixture.detectChanges();

    // assert
    const bookCards = fixture.debugElement.queryAll(By.css('app-book-card'));
    expect(bookCards.length).toBe(2);

    const firstCard = bookCards[0].componentInstance;
    expect(firstCard.title).toBe('Book 1');
    expect(firstCard.author).toBe('Author 1');
  });

  it('should handle pagination change', () => {
    // arrange
    spyOn(component.pageChangedEvent, 'emit');

    // act
    component.paginationClickHandler(2);

    // assert
    expect(component.pageChangedEvent.emit).toHaveBeenCalledWith(2);
  });

  it('should navigate to book page on card click', () => {
    // arrange

    // act
    component.cardClickEventHandler(123);

    // assert
    expect(router.navigateByUrl).toHaveBeenCalledWith('/book/get/123');
  });

  it('should display error message on API failure', fakeAsync(() => {
    // arrange
    bookApi.getPaginatedBooks.and.returnValue(of({
      isSucceeded: false,
      message: 'Server error',
      data: undefined,
    }));

    // act
    component.ngOnChanges();
    tick();
    fixture.detectChanges();

    // assert
    const errorElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorElement.textContent).toContain('Server error');
  }));

  it('should update books when page input changes', () => {
    // arrange
    bookApi.getPaginatedBooks.and.returnValue(of({
      isSucceeded: true,
      message: 'Success',
      data: {
        books: [
          { id: 3, title: 'Book 1', author: 'Author 1', description: '', fragment: '', tags: ['test'] },
          { id: 4, title: 'Book 2', author: 'Author 2', description: '', fragment: '', tags: ['test'] },
        ],
        lastPage: 2,
      }
    }));

    // act
    component.page = 2;
    component.ngOnChanges();
    fixture.detectChanges();

    // assert
    const bookCards = fixture.debugElement.queryAll(By.css('app-book-card'));
    expect(bookCards.length).toBe(2);

    const firstCard = bookCards[0].componentInstance;
    expect(firstCard.title).toBe('Book 1');
    expect(firstCard.author).toBe('Author 1');
  });
});
