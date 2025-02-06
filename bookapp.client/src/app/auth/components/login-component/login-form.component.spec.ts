import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from "@angular/router";
import { of } from 'rxjs';
import { AuthApiService } from "../../services/auth.api-service";
import { LoginFormComponent } from "./login-form.component";

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authSpy: jasmine.SpyObj<AuthApiService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteFake: { snapshot: { queryParams: { [key: string]: string } } }= {
    snapshot: {
      queryParams: {
        returnUrl: '/test'
      }
    }
  };

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('AuthApiService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [
        { provide: AuthApiService, useValue: authSpy, },
        { provide: Router, useValue: routerSpy, },
        { provide: ActivatedRoute, useValue: activatedRouteFake, },
      ],
    });

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    component.form.setValue({
      email: 'test@test.test',
      password: 'test',
    });
  });

  it('Should send request for login', () => {
    // arrange
    authSpy.login.and.returnValue(of({ isSucceeded: true, message: 'test', data: undefined }))

    // act
    component.handleSubmit();

    // assert
    expect(authSpy.login).toHaveBeenCalled();
  });

  it('Should navigate to the redirectUrl when there is no error', () => {
    // arrange
    authSpy.login.and.returnValue(of({ isSucceeded: true, message: 'test', data: undefined }))

    // act
    component.handleSubmit();

    // assert
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/test');
  });

  it('Should show an error message', () => {
    // arrange
    authSpy.login.and.returnValue(of({ isSucceeded: false, message: 'test_error', data: undefined }))

    // act
    component.handleSubmit();
    fixture.detectChanges();

    // assert
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');

    expect(errorMessageElement.textContent).toContain('test_error');
  });
});
