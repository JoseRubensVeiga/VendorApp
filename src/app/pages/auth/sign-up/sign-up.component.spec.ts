import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { TokenResponseMock } from 'src/app/mock/models/Token/Token.mock';
import { SignUpRequest } from 'src/app/models/SignUp';
import { AuthService } from 'src/app/services/auth';
import { NotificationService } from 'src/app/services/notification';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;
  let notification: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot({}),

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    notification = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSignUpRequestParams and return an instance of SignUpRequest', () => {
    // @ts-ignore
    const returnedValue = component.getSignUpRequestParams();

    expect(returnedValue).toBeInstanceOf(SignUpRequest);
  });

  it('should call onSubmit and try to signup', () => {
    const response = of(new TokenResponseMock());
    const signUpSpy = spyOn(authService, 'signUp').and.returnValue(response);
    const notificationErrorSpy = spyOn(
      notification,
      'success'
    ).and.callThrough();
    component.onSubmit();

    expect(signUpSpy).toHaveBeenCalledTimes(1);
    expect(notificationErrorSpy).toHaveBeenCalledTimes(1);
  });
});
