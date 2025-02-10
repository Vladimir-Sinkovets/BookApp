import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterFormComponent } from "./register-form.component";
import { of } from "rxjs";
import { AuthService } from "../../../shared/services/auth/auth.service";

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteFake: { snapshot: { queryParams: { [key: string]: string } } } = {
    snapshot: {
      queryParams: {
        returnUrl: '/test'
      }
    }
  };

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('AuthApiService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [RegisterFormComponent],
      providers: [
        { provide: AuthService, useValue: authSpy, },
        { provide: Router, useValue: routerSpy, },
        { provide: ActivatedRoute, useValue: activatedRouteFake, },
      ],
    });

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;

    component.form.setValue({
      email: 'test@test.test',
      name: 'test',
      password: 'test',
      repeatPassword: 'test',
    });
  });

  it('Should show error message when passwords are not the same', () => {
    // arrange
    component.form.setValue({
      email: 'test@test.test',
      name: 'test',
      password: 'test',
      repeatPassword: 'test_0',
    });

    // act
    component.handleSubmit();
    fixture.detectChanges();

    // assert
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');

    expect(errorMessageElement.textContent).toContain('Passwords must be the same');
  });

  it('Should send request for registration', () => {
    // arrange
    authSpy.register.and.returnValue(of({ isSucceeded: true, message: 'test', data: undefined }))

    // act
    component.handleSubmit();
    fixture.detectChanges();

    // assert
    expect(authSpy.register).toHaveBeenCalled();
  });

  it('Should navigate to the redirectUrl when there is no error', () => {
    // arrange
    authSpy.register.and.returnValue(of({ isSucceeded: true, message: 'test', data: undefined }))

    // act
    component.handleSubmit();
    fixture.detectChanges();

    // assert
    expect(authSpy.register).toHaveBeenCalled();
  });

  it('Should show an error message', () => {
    // arrange
    authSpy.register.and.returnValue(of({ isSucceeded: false, message: 'test_error', data: undefined }))

    // act
    component.handleSubmit();
    fixture.detectChanges();

    // assert
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');

    expect(errorMessageElement.textContent).toContain('test_error');
  });
});
