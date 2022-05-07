import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';
import { routes } from 'src/app/mock/Router/router';
import { SignInRequest } from 'src/app/models/SignIn';
import { TokenResponse } from 'src/app/models/Token';
import { AuthService } from 'src/app/services/auth';
import { of, throwError } from 'rxjs';
import { TokenResponseMock } from 'src/app/mock/models/Token/Token.mock';
import { NotificationService } from 'src/app/services/notification';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let authService: AuthService;
  let notification: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot({}),

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    location = TestBed.inject(Location);
    authService = TestBed.inject(AuthService);
    notification = TestBed.inject(NotificationService);
    componentEl = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to dashboard', fakeAsync(() => {
    const _component = component as any;

    _component.goToDashboard();
    tick();

    expect(location.path()).toBe('/dashboard');
  }));

  it('should redirect to sign-up when click in register button', fakeAsync(() => {
    const ancor = componentEl.querySelector<HTMLElement>('#sign-up-router');

    ancor?.click();
    tick();

    expect(location.path()).toBe('/auth/sign-up');
  }));

  it('should redirect to recovery-password when click in recovery button', fakeAsync(() => {
    const ancor = componentEl.querySelector<HTMLElement>(
      '#recovery-pass-router'
    );

    ancor?.click();
    tick();

    expect(location.path()).toBe('/auth/recovery-password');
  }));

  it('should return an instance of SignInRequest', () => {
    const _component = component as any;

    const result = _component.getSignInRequestParams();
    expect(result).toBeInstanceOf(SignInRequest);
  });

  it('should call redirectIfLogged if the user is logged in', () => {
    const _component = component as any;
    spyOnProperty(authService, 'isLogged', 'get').and.returnValue(true);
    const redirectIfLoggedSpy = spyOn(
      _component,
      'redirectIfLogged'
    ).and.callThrough();

    _component.redirectIfLogged();

    expect(redirectIfLoggedSpy).toHaveBeenCalled();
  });

  it('should call onSubmit function on submit button click', () => {
    const buttonEl = componentEl.querySelector<HTMLElement>('#sign-in-button');

    const onSubmitSpy = spyOn(component, 'onSubmit');

    buttonEl?.click();

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should call to onSubmit function', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit').and.callThrough();

    component.onSubmit();

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should call signIn and go to dashboard', fakeAsync(() => {
    const _component = component as any;
    const response = new TokenResponseMock();

    spyOn(authService, 'signIn').and.returnValue(of(response));

    _component.onSubmit();
    tick();

    expect(location.path()).toEqual('/dashboard');
  }));

  it('should call signIn and throw a error notification', () => {
    const _component = component as any;
    spyOn(authService, 'signIn').and.returnValue(throwError(''));
    const notificationErrorSpy = spyOn(notification, 'error').and.callThrough();

    _component.onSubmit();

    expect(notificationErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should call redirectIfLogged and call goToDashboard', () => {
    const _component = component as any;
    spyOnProperty(authService, 'isLogged', 'get').and.returnValue(false);
    const spy = spyOn(_component, 'goToDashboard').and.callThrough();

    _component.redirectIfLogged();

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
