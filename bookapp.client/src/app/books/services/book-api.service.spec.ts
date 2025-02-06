import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { fakeAsync, TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environment";
import { ApiResponse } from "../../shared/models/api-response.type";
import { IBook } from "../models/book.model";
import { BookApiService } from "./book-api.service";

describe('BookApiService', () => {
  let service: BookApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(BookApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPaginatedBooks() should send get request', () => {
    // arrange
    const page = 1;
    const booksPerPage = 10;

    // act
    service.getPaginatedBooks(page, booksPerPage)
      .subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/all?page=${page}&itemsPerPage=${booksPerPage}`);

    // assert
    expect(req.request.method).toEqual('GET');
  });

  it('getPaginatedBooks() should return correct data', fakeAsync(() => {
    // arrange
    let result: ApiResponse<{ books: IBook[], lastPage: number }> | undefined;

    const page = 1;
    const booksPerPage = 10;

    const responseData = {
      books: [
        { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] },
      ],
      lastPage: 2,
    };

    // act
    service.getPaginatedBooks(page, booksPerPage)
      .subscribe(response => result = response);
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/all?page=${page}&itemsPerPage=${booksPerPage}`);

    req.flush(responseData, { status: 200, statusText: 'OK' })

    // assert
    expect(result).toEqual({
      isSucceeded: true,
      message: 'success',
      data: {
        books: responseData.books,
        lastPage: 2
      }
    });
  }));

  it('getBook() should send get request', () => {
    // arrange
    const id = 1;

    // act
    service.getBook(id)
      .subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/get?id=${1}`);

    // assert
    expect(req.request.method).toEqual('GET');
  });

  it('getBook() should return correct data', fakeAsync(() => {
    // arrange
    let result: ApiResponse<IBook> | undefined;

    const id = 1;

    const responseData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.getBook(id)
      .subscribe(response => result = response);
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/get?id=${id}`);

    req.flush(responseData, { status: 200, statusText: 'OK' })

    // assert
    expect(result).toEqual({
      isSucceeded: true,
      message: 'success',
      data: responseData,
    });
  }));

  it('addBook() should send post request', () => {
    // arrange
    const bookData = { title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };
    const responseData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.addBook(bookData)
      .subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/create`);

    req.flush(responseData, { status: 200, statusText: 'OK' });

    //assert
    expect(req.request.method).toEqual('POST');
  });

  it('addBook() should return correct response', () => {
    // arrange
    let result: ApiResponse<IBook> | undefined;

    const bookData = { title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };
    const responseData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.addBook(bookData)
      .subscribe(response => result = response);
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/create`);

    req.flush(responseData, { status: 200, statusText: 'OK' })

    // assert
    expect(result).toEqual({
      isSucceeded: true,
      message: 'success',
      data: responseData,
    });
  });

  it('addBook() should handle network error response', () => {
    // arrange
    let result: ApiResponse<IBook> | undefined;

    const bookData = { title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.addBook(bookData)
      .subscribe(response => result = response);
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/create`);

    req.error(new ProgressEvent('Network error'));

    // assert
    expect(result).toEqual({
      isSucceeded: false,
      message: 'Unknown error',
      data: undefined,
    });
  });

  const badStatusCases = [
    { status: 404, statusText: 'Not Found' },
    { status: 500, statusText: 'Server Error' },
  ];

  badStatusCases.forEach(value => {
    it(`addBook() should handle  ${value.statusText} response`, () => {
      // arrange
      let result: ApiResponse<IBook> | undefined;
      const bookData = { title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

      // act
      service.addBook(bookData)
        .subscribe(response => result = response);
      const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/create`);

      req.flush(null, value);

      // assert
      expect(result!.isSucceeded).toBeFalse();
      expect(result!.data).toBeUndefined();
    });
  });

  it('updateBook() should send put request', () => {
    // arrange
    const bookData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.updateBook(bookData)
      .subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/update`);

    req.flush(bookData, { status: 200, statusText: 'OK' })

    //assert
    expect(req.request.method).toEqual('PUT');
  });

  it('updateBook() should return correct response', () => {
    // arrange
    let result: ApiResponse<IBook> | undefined;
    const bookData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.updateBook(bookData)
      .subscribe(response => result = response);
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/update`);

    req.flush(bookData, { status: 200, statusText: 'OK' })

    // assert
    expect(result).toEqual({
      isSucceeded: true,
      message: 'success',
      data: bookData,
    });
  });

  it('updateBook() should handle network error response', () => {
    // arrange
    let result: ApiResponse<IBook> | undefined;
    const bookData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.updateBook(bookData)
      .subscribe(response => result = response);
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/update`);

    req.error(new ProgressEvent('Network error'));

    // assert
    expect(result).toEqual({
      isSucceeded: false,
      message: 'Unknown error',
      data: undefined,
    });
  });

  badStatusCases.forEach(value => {
    it(`updateBook() should handle ${value.statusText} response`, () => {
      // arrange
      let result: ApiResponse<IBook> | undefined;

      const bookData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

      // act
      service.updateBook(bookData)
        .subscribe(response => result = response);
      const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/update`);

      req.flush(null, value);

      // assert
      expect(result!.isSucceeded).toBeFalse();
      expect(result!.data).toBeUndefined();
    });
  });
});
