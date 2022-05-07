import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../../services/storage';
import { AuthService } from '../../services/auth';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private notification: NotificationService,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.storageService.getToken();

    if (!token) {
      this.logoutUser();
    }

    if (this.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.logoutUser();
    }
    return throwError(error);
  }

  private logoutUser = (): void => {
    this.notification.error('Você não está logado.');
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  };

  private isLoggedIn(): boolean {
    return this.authService.isLogged;
  }
}
