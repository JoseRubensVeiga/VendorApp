import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from 'src/app/pages/auth/login';
import { AuthService } from 'src/app/services/auth';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        NoopAnimationsModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'auth/login',
            component: LoginComponent,
          },
        ]),

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout function', fakeAsync(() => {
    const logoutSpy = spyOn(authService, 'logout').and.callThrough();
    component.logout();
    tick();

    expect(logoutSpy).toHaveBeenCalledTimes(1);
    expect(location.path()).toBe('/auth/login');
  }));
});
