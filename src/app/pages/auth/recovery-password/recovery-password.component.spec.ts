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
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/mock/Router/router';
import { AuthService } from 'src/app/services/auth';

import { RecoveryPasswordComponent } from './recovery-password.component';

describe('RecoveryPasswordComponent', () => {
  let component: RecoveryPasswordComponent;
  let fixture: ComponentFixture<RecoveryPasswordComponent>;
  let location: Location;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryPasswordComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPasswordComponent);
    location = TestBed.inject(Location);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return email get property', () => {
    const emailSpy = spyOnProperty(component, 'email', 'get').and.callThrough();

    const email = component.email;

    expect(emailSpy).toHaveBeenCalledTimes(1);
  });

  it('should return null when call formGroup->get("email")', () => {
    spyOn(component.formGroup, 'get').and.returnValue(null);

    const email = component.email;

    expect(email).toBeUndefined();
  });

  it('should call onSubmit function', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit').and.callThrough();

    component.onSubmit();

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should stop onSubmit function if formGroup is invalid', () => {
    const invalidProperty = spyOnProperty(
      component.formGroup,
      'invalid'
    ).and.returnValue(false);

    component.onSubmit();

    expect(invalidProperty).toHaveBeenCalledTimes(1);
  });

  it('should call request pass if form is valid', () => {
    spyOnProperty(component.formGroup, 'invalid').and.returnValue(false);
    const requestPassSpy = spyOn(authService, 'requestPass').and.callThrough();

    component.onSubmit();

    expect(requestPassSpy).toHaveBeenCalledWith(component.email);
  });

  it('should redirect user to restore-password if form is valid', fakeAsync(() => {
    spyOnProperty(component.formGroup, 'invalid').and.returnValue(false);
    spyOn(authService, 'requestPass').and.returnValue(of({}));

    component.onSubmit();
    tick();

    expect(location.path()).toBe('/auth/restore-password');
  }));
});
