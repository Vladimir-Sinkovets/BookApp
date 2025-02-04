import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api-response.type';
import { AuthApiService, TokenResponse } from './auth.api-service';
import { environment } from '../../../environments/environment';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpTesting: HttpTestingController;

  const testData = { email: 'test@example.com', name: 'Test', password: 'password' };
  const fakeResponse: TokenResponse = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(AuthApiService);
    httpTesting = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('register(data) should send POST request', () => {
    // arrange

    // act
    service.register(testData).subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/auth/register`);

    // assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);
  });

  it('register(data) should handle successful registration', fakeAsync(() => {
    // arrange
    let result: ApiResponse<TokenResponse> | undefined;

    // act
    service.register(testData).subscribe(res => result = res);

    const req = httpTesting.expectOne(`${environment.apiUrl}/api/auth/register`);
    req.flush(fakeResponse, { status: 200, statusText: 'OK' });
    tick();

    // assert
    expect(localStorage.getItem('accessToken')).toBe('accessToken');
    expect(localStorage.getItem('refreshToken')).toBe('refreshToken');

    service.isLoggedIn$.subscribe(isLogged => {
      expect(isLogged).toBeTrue();
    });

    expect(result).toEqual({
      isSucceeded: true,
      message: 'Success',
      data: fakeResponse
    });
  }));

  const errorTestCases = [
    { status: 400, expectedMessage: 'Wrong data' },
    { status: 409, expectedMessage: 'User already exist' },
    { status: 500, expectedMessage: 'Server error' },
    { status: 404, expectedMessage: 'Unknown error' },
  ];

  errorTestCases.forEach(({ status, expectedMessage }) => {
    it(`register(data) should handle ${status} error`, fakeAsync(() => {
      // arrange
      let result: ApiResponse<TokenResponse> | undefined;

      // act
      service.register(testData).subscribe(res => result = res);

      const req = httpTesting.expectOne(`${environment.apiUrl}/api/auth/register`);
      req.flush({}, { status, statusText: 'Error' });
      tick();

      // assert
      expect(result).toEqual({
        isSucceeded: false,
        message: expectedMessage,
        data: undefined
      });

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();

      service.isLoggedIn$.subscribe(isLogged => {
        expect(isLogged).toBeFalse();
      });
    }));
  });

  it('login(data) should send POST with correct data', () => {
    // arrange

    // act
    service.login(testData).subscribe();

    const req = httpTesting.expectOne(`${environment.apiUrl}/api/auth/login`);

    // assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);
  });

  it('login(data) should handle successful response', fakeAsync(() => {
    // arrange
    let result: ApiResponse<TokenResponse> | undefined;

    // act
    service.login(testData).subscribe(res => result = res);

    const req = httpTesting.expectOne(`${environment.apiUrl}/api/auth/login`);

    req.flush(fakeResponse, { status: 200, statusText: 'OK' });
    tick();

    // assert
    expect(localStorage.getItem(service['accessTokenKey'])).toBe('accessToken');
    expect(localStorage.getItem(service['refreshTokenKey'])).toBe('refreshToken');

    service.isLoggedIn$.subscribe(isLogged => {
      expect(isLogged).toBeTrue();
    });

    expect(result).toEqual({
      isSucceeded: true,
      message: 'Success',
      data: fakeResponse
    });
  }));

  const errorCases = [
    { status: 400, expectedMessage: 'Wrong data' },
    { status: 404, expectedMessage: 'User does not exist' },
    { status: 500, expectedMessage: 'Server error' },
  ];

  errorCases.forEach(({ status, expectedMessage }) => {
    it(`login(data) should handle ${status} error`, fakeAsync(() => {
      // arrange
      let result: ApiResponse<TokenResponse> | undefined;

      // act
      service.login(testData).subscribe(res => result = res);

      const req = httpTesting.expectOne(`${environment.apiUrl}/api/auth/login`);
      req.flush({}, { status, statusText: 'Error' });
      tick();

      // assert
      expect(result).toEqual({
        isSucceeded: false,
        message: expectedMessage,
        data: undefined
      });

      expect(localStorage.getItem(service['accessTokenKey'])).toBeNull();
      expect(localStorage.getItem(service['refreshTokenKey'])).toBeNull();

      service.isLoggedIn$.subscribe(isLogged => {
        expect(isLogged).toBeFalse();
      });
    }));
  });

  it('login(data) should handle network errors', fakeAsync(() => {
    // arrange
    let result: ApiResponse<TokenResponse> | undefined;

    service.login(testData).subscribe(res => result = res);

    const req = httpTesting.expectOne(`${environment.apiUrl}/api/auth/login`);
    req.error(new ProgressEvent('Network error'));
    tick();

    // assert
    expect(result).toEqual({
      isSucceeded: false,
      message: 'Unknown error',
      data: undefined
    });
  }));

  it('refreshAccessToken() should return correct response', fakeAsync(() => {
    // arrange
    localStorage.setItem('refreshToken', 'refreshToken')

    // act
    service.refreshAccessToken().subscribe(response => {
      // assert
      expect(response.isSucceeded).toBeTruthy();
      expect(response.message).toEqual('Success');
      expect(response.data).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
    const req = httpTesting.expectOne('https://localhost:7085/api/auth/refresh?token=refreshToken');

    req.flush(fakeResponse, { status: 200, statusText: 'OK' });
    tick();
  }));

  it('refreshAccessToken() should add token to local storage', fakeAsync(() => {
    // arrange
    localStorage.setItem('refreshToken', 'refreshToken')

    // act
    service.refreshAccessToken().subscribe();
    const req = httpTesting.expectOne('https://localhost:7085/api/auth/refresh?token=refreshToken');

    req.flush(fakeResponse, { status: 200, statusText: 'OK' });
    tick();

    // assert
    expect(localStorage.getItem('accessToken')).toEqual('accessToken');
    expect(localStorage.getItem('refreshToken')).toEqual('refreshToken');
  }));

  const refreshTokenErrorCases = [
    { status: 400, expectedMessage: 'Wrong data' },
    { status: 500, expectedMessage: 'Server error' },
  ];

  refreshTokenErrorCases.forEach(({ status, expectedMessage }) => {
    it(`refreshAccessToken() should handle ${status} status`, fakeAsync(() => {
      // arrange
      localStorage.setItem('refreshToken', 'refreshToken')

      // act
      service.refreshAccessToken().subscribe(response => {
        // assert

        expect(response.message).toEqual(expectedMessage);
        expect(response.isSucceeded).toBeFalsy();
        expect(response.data).toBeUndefined();
      });
      const req = httpTesting.expectOne('https://localhost:7085/api/auth/refresh?token=refreshToken');

      req.flush(fakeResponse, { status: status, statusText: '' });
      tick();
    }));
  });

  it('getAccessToken() return token from local storage', () => {
    // arrange
    localStorage.setItem('accessToken', 'accessToken');

    // act
    const token = service.getAccessToken();

    // assert
    expect(token).toEqual('accessToken');
  });

  it('getRefreshToken() return token from local storage', () => {
    // arrange
    localStorage.setItem('refreshToken', 'refreshToken');

    // act
    const token = service.getRefreshToken();

    // assert
    expect(token).toEqual('refreshToken');
  });

  it('logout() should clear local storage', () => {
    // arrange
    localStorage.setItem('refreshToken', 'refreshToken');
    localStorage.setItem('accessToken', 'accessToken');

    // act
    service.logOut();

    // assert
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });

  it('isLoggedIn() should return true when token exist in the local storage', () => {
    // arrange
    localStorage.setItem('accessToken', 'accessToken');

    // act
    const isLoggedIn = service.isLoggedIn();

    // assert
    expect(isLoggedIn).toBeTrue();
  });

  it('isLoggedIn() should return false when token does not exist in the local storage', () => {
    // arrange

    // act
    const isLoggedIn = service.isLoggedIn();

    // assert
    expect(isLoggedIn).toBeFalse();
  });


  it('isAccessTokenExpired() should return true when token has expired', () => {
    // arrange
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJqdGkiOiI5MGNmM2UxNy0yMmMzLTQxMTUtOTc1Mi05MjViYTUzZTNiNGQiLCJleHAiOjE3Mzg2NTIwNzIsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.L4aui0LNlew2uBgEogF7mmOnl5XuWN8ygnBSx98pOAk');

    // act
    const isTokenExpired = service.isAccessTokenExpired();

    // assert
    expect(isTokenExpired).toBeTrue();
  });

  it('isAccessTokenExpired() should return false when token has not expired', () => {
    // arrange
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJqdGkiOiIzZjNiNGYxMy0xZDg2LTRjNTktYWNmMy0wNWU4MGYwM2IxOWMiLCJleHAiOjk3Mzg2NjA1MjgsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.kEe6_9YAQDQV3nt3fAx62Seyf6ZsvGFUKOvyHjcfUcE');

    // act
    const isTokenExpired = service.isAccessTokenExpired();

    // assert
    expect(isTokenExpired).toBeFalse();
  });

  it('isRefreshTokenExpired() should return true when token has expired', () => {
    // arrange
    localStorage.setItem('refreshToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJqdGkiOiI5MGNmM2UxNy0yMmMzLTQxMTUtOTc1Mi05MjViYTUzZTNiNGQiLCJleHAiOjE3Mzg2NTIwNzIsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.L4aui0LNlew2uBgEogF7mmOnl5XuWN8ygnBSx98pOAk');

    // act
    const isTokenExpired = service.isRefreshTokenExpired();

    // assert
    expect(isTokenExpired).toBeTrue();
  });

  it('isRefreshTokenExpired() should return false when token has not expired', () => {
    // arrange
    localStorage.setItem('refreshToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJqdGkiOiIzZjNiNGYxMy0xZDg2LTRjNTktYWNmMy0wNWU4MGYwM2IxOWMiLCJleHAiOjk3Mzg2NjA1MjgsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.kEe6_9YAQDQV3nt3fAx62Seyf6ZsvGFUKOvyHjcfUcE');

    // act
    const isTokenExpired = service.isRefreshTokenExpired();

    // assert
    expect(isTokenExpired).toBeFalse();
  });


  it('isAdmin() should return true when token has Admin role', () => {
    // arrange
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJqdGkiOiIzZjNiNGYxMy0xZDg2LTRjNTktYWNmMy0wNWU4MGYwM2IxOWMiLCJleHAiOjk3Mzg2NjA1MjgsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.kEe6_9YAQDQV3nt3fAx62Seyf6ZsvGFUKOvyHjcfUcE');

    // act
    const isAdmin = service.isAdmin();

    // assert
    expect(isAdmin).toBeTrue();
  });

  it('isAdmin() should return false when token has no Admin role', () => {
    // arrange
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiRGVmYXVsdFVzZXIiLCJqdGkiOiIzZjNiNGYxMy0xZDg2LTRjNTktYWNmMy0wNWU4MGYwM2IxOWMiLCJleHAiOjk3Mzg2NjA1MjgsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.HZlWdVKrygjnf291YCZ6puykowv4bHjlc6co4PD4KhM');

    // act
    const isAdmin = service.isAdmin();

    // assert
    expect(isAdmin).toBeFalse();
  });
});
