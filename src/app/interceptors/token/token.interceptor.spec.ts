import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MockHandler } from 'src/app/mock/Http/HttpHandler';
import { LoginComponent } from 'src/app/pages/auth/login';
import { AuthService } from 'src/app/services/auth';
import { StorageService } from 'src/app/services/storage';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: LoginComponent },
        ]),
        ToastrModule.forRoot(),
      ],
      providers: [
        TokenInterceptor,
        {
          provide: AuthService,
          useValue: {
            logout: () => {},
            isLogged: true,
          },
        },
        {
          provide: StorageService,
          useValue: {
            getToken: () => 'token teste',
          },
        },
      ],
    });
  });

  beforeEach(() => {
    interceptor = TestBed.inject(TokenInterceptor);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should return a error throw', (done) => {
    const error = new HttpErrorResponse({ status: 500 });
    const result$ = (interceptor as any).handleError(error) as Observable<any>;

    result$.subscribe({
      error: (result) => {
        expect(result).toBeInstanceOf(HttpErrorResponse);
        done();
      },
    });
  });

  it('should call logoutUser once', () => {
    const _interceptor = interceptor as any;
    const logoutUserSpy = spyOn(_interceptor, 'logoutUser').and.callThrough();
    _interceptor.logoutUser();

    expect(logoutUserSpy).toHaveBeenCalled();
  });

  it('should call logoutUser with error status 401', () => {
    const _interceptor = interceptor as any;
    const logoutUserSpy = spyOn(_interceptor, 'logoutUser').and.callThrough();
    const error = new HttpErrorResponse({ status: 401 });

    _interceptor.handleError(error);

    expect(logoutUserSpy).toHaveBeenCalled();
  });

  it('should add Authorization header', () => {
    const interceptSpy = spyOn(interceptor, 'intercept').and.callThrough();
    const request = new HttpRequest('GET', '');
    const httpHandler = new MockHandler();

    interceptor.intercept(request, httpHandler);

    expect(interceptSpy).toHaveBeenCalled();
  });

  it('should call logout method from authService if is not logged', () => {
    const _interceptor = interceptor as any;
    spyOn(_interceptor.storageService, 'getToken').and.returnValue(null);
    const logoutUserSpy = spyOn(_interceptor, 'logoutUser').and.callThrough();

    const request = new HttpRequest('GET', '');
    const httpHandler = new MockHandler();
    interceptor.intercept(request, httpHandler);

    expect(logoutUserSpy).toHaveBeenCalled();
  });

  it('shoudl call intercept method and not set authorization headers', () => {
    const interceptSpy = spyOn(interceptor, 'intercept').and.callThrough();
    // @ts-ignore
    spyOn(interceptor, 'isLoggedIn').and.returnValue(false);
    const request = new HttpRequest('GET', '');
    const httpHandler = new MockHandler();

    interceptor.intercept(request, httpHandler);

    expect(interceptSpy).toHaveBeenCalled();
  });
});
