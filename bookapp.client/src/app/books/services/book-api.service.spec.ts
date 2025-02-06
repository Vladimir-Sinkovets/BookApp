import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { fakeAsync, TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environment";
import { TokenResponse } from "../../auth/services/auth.api-service";
import { BookApiService } from "./book-api.service";

describe('BookApiService', () => {
  let service: BookApiService;
  let httpTesting: HttpTestingController;

  const fakeResponse: TokenResponse = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
  };

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
    const testData = {
      page: 1,
      booksPerPage: 10,
    };

    // act
    service.getPaginatedBooks(testData.page, testData.booksPerPage)
      .subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/all?page=${testData.page}&itemsPerPage=${testData.booksPerPage}`);

    // assert
    expect(req.request.method).toEqual('GET');
  });

  it('getPaginatedBooks() should return correct data', fakeAsync(() => {
    // arrange
    const testData = {
      page: 1,
      booksPerPage: 10,
    };

    const responseData = {
      books: [
        { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] },
      ],
      lastPage: 2,
    };

    // act
    service.getPaginatedBooks(testData.page, testData.booksPerPage)
      .subscribe(resp => {
        // assert
        expect(resp.isSucceeded).toBeTrue();
        expect(resp.message).toEqual('success');

        expect(resp.data?.books).toEqual(responseData.books);
      });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/all?page=${testData.page}&itemsPerPage=${testData.booksPerPage}`);

    req.flush(responseData, { status: 200, statusText: 'OK' })
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

  it('getPaginatedBooks() should return correct data', fakeAsync(() => {
    // arrange
    const id = 1;

    const responseData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.getBook(id)
      .subscribe(resp => {
        // assert
        expect(resp.isSucceeded).toBeTrue();
        expect(resp.message).toEqual('success');

        expect(resp.data).toEqual(responseData);
      });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/get?id=${id}`);

    req.flush(responseData, { status: 200, statusText: 'OK' })
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
    const bookData = { title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };
    const responseData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.addBook(bookData)
      .subscribe(resp => {
        // assert
        expect(resp.isSucceeded).toBeTrue();
        expect(resp.message).toEqual('success');

        expect(resp.data).toEqual(responseData);
      });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/create`);

    req.flush(responseData, { status: 200, statusText: 'OK' })
  });

  it('addBook() should handle network error response', () => {
    // arrange
    const bookData = { title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };
    const responseData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.addBook(bookData)
      .subscribe(resp => {
        // assert
        expect(resp.isSucceeded).toBeFalse();
        expect(resp.message).toEqual('Unknown error');

        expect(resp.data).toBeUndefined();
      });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/create`);

    req.error(new ProgressEvent('Network error'));
  });

  const badStatusCases = [
    { status: 404, statusText: 'Not Found' },
    { status: 500, statusText: 'Server Error' },
  ];

  badStatusCases.forEach(value => {
    it(`addBook() should handle  ${value.statusText} response`, () => {
      // arrange
      const bookData = { title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

      // act
      service.addBook(bookData)
        .subscribe(resp => {
          // assert
          expect(resp.isSucceeded).toBeFalse();

          expect(resp.data).toBeUndefined();
        });
      const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/create`);

      req.flush(null, value);
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
    const responseData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.updateBook(responseData)
      .subscribe(resp => {
        // assert
        expect(resp.isSucceeded).toBeTrue();
        expect(resp.message).toEqual('success');

        expect(resp.data).toEqual(responseData);
      });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/update`);

    req.flush(responseData, { status: 200, statusText: 'OK' })
  });

  it('updateBook() should handle network error response', () => {
    // arrange
    const bookData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

    // act
    service.updateBook(bookData)
      .subscribe(resp => {
        // assert
        expect(resp.isSucceeded).toBeFalse();
        expect(resp.message).toEqual('Unknown error');

        expect(resp.data).toBeUndefined();
      });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/update`);

    req.error(new ProgressEvent('Network error'));
  });

  badStatusCases.forEach(value => {
    it(`updateBook() should handle ${value.statusText} response`, () => {
      // arrange
      const bookData = { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] };

      // act
      service.updateBook(bookData)
        .subscribe(resp => {
          // assert
          expect(resp.isSucceeded).toBeFalse();

          expect(resp.data).toBeUndefined();
        });
      const req = httpTesting.expectOne(`${environment.apiUrl}/api/book/update`);

      req.flush(null, value);
    });
  });
});
