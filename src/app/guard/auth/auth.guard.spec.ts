import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLogged$: of(true),
          },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return a url instance', () => {
    const returnedValue = (guard as any).getNewUrlIfNotLogged(false);

    expect(returnedValue).toBeInstanceOf(UrlTree);
  });

  it('should return true', () => {
    const returnedValue = (guard as any).getNewUrlIfNotLogged(true);

    expect(returnedValue).toBeTrue();
  });

  it('canActivated should pass if logged', () => {
    const routerStateSnapshot = { url: '' } as RouterStateSnapshot;
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    const result$ = guard.canActivate(
      activatedRouteSnapshot,
      routerStateSnapshot
    ) as Observable<boolean>;

    result$.subscribe((result) => {
      expect(result).toBeTrue();
    });
  });
});
