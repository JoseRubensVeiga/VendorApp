import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { TokenResponseMock } from 'src/app/mock/models/Token/Token.mock';
import { RestorePassRequest } from 'src/app/models/RestorePassword';
import { AuthService } from 'src/app/services/auth';
import { NotificationService } from 'src/app/services/notification';
import { LoginComponent } from '../login';

import { RestorePasswordComponent } from './restore-password.component';

describe('RestorePasswordComponent', () => {
  let component: RestorePasswordComponent;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<RestorePasswordComponent>;
  let location: Location;
  let authService: AuthService;
  let notification: NotificationService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestorePasswordComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'auth/login',
            component: LoginComponent,
          },
        ]),
        ToastrModule.forRoot({}),

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      // providers: [
      //   {
      //     provide: ActivatedRoute,
      //     useValue: {
      //       queryParams: of({ t: 'tenant id', e: 'email' }),
      //     },
      //   },
      // ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordComponent);
    location = TestBed.inject(Location);
    authService = TestBed.inject(AuthService);
    notification = TestBed.inject(NotificationService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    componentEl = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRestorePassRequestBody function and return a instance of RestorePassRequest', () => {
    const _component = component as any;

    const returnedValue = _component.getRestorePassRequestBody();

    expect(returnedValue).toBeInstanceOf(RestorePassRequest);
  });

  it('should call onSubmit function and go to login', () => {
    const response = new TokenResponseMock();
    spyOn(authService, 'restorePass').and.returnValue(of(response));
    const successSpy = spyOn(notification, 'success').and.callThrough();

    component.onSubmit();

    expect(successSpy).toHaveBeenCalledTimes(1);
  });

  it('should redirect to login when click on login-router', fakeAsync(() => {
    const ancor = componentEl.querySelector<HTMLElement>('#login-router');

    ancor?.click();
    tick();

    expect(location.path()).toBe('/auth/login');
  }));

  it('should call loadParams and call goToLogin', () => {
    activatedRoute.queryParams = of({});
    // @ts-ignore
    const goToLoginSpy = spyOn(component, 'goToLogin').and.callThrough();
    // @ts-ignore
    component.loadParams();

    expect(goToLoginSpy).toHaveBeenCalledTimes(1);
  });

  it('should call loadParams and not call goToLogin', () => {
    activatedRoute.queryParams = of({ t: 'tenantId', e: 'email@email.com' });
    // @ts-ignore
    const goToLoginSpy = spyOn(component, 'goToLogin').and.callThrough();
    // @ts-ignore
    component.loadParams();

    expect(goToLoginSpy).toHaveBeenCalledTimes(0);
  });
});
