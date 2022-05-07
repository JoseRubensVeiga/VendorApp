import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { RestorePassRequestMock } from 'src/app/mock/models/RestorePass/RestorePass.mock';
import { SignUpMock } from 'src/app/mock/models/SignUp/SignUp.mock';
import { TokenResponseMock } from 'src/app/mock/models/Token/Token.mock';
import { StorageService } from '../storage';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user logged if has a property jwt in storageService', (done) => {
    spyOnProperty(storageService, 'jwtData', 'get').and.returnValue(
      'token teste'
    );

    (service as any).setLogged();

    service.isLogged$.subscribe((isLogged) => {
      expect(isLogged).toBe(true);
      done();
    });
  });

  it('should save user data to localStorage when call function setUserDataToStorage', (done) => {
    const tokenResponse = new TokenResponseMock();
    (service as any).setUserDataToStorage(tokenResponse);

    service.isLogged$.subscribe((logged) => {
      expect(logged).toBe(true);
      done();
    });
  });

  it('should call settings function and return an instance of Observable', () => {
    expect(service.settings()).toBeInstanceOf(Observable);
  });

  it('should call restorePass function and return an istance of Observable', () => {
    const restorePassRequestMock = new RestorePassRequestMock();
    expect(service.restorePass(restorePassRequestMock)).toBeInstanceOf(
      Observable
    );
  });

  it('should call signUp function and return an istance of Observable', () => {
    const signUpMock = new SignUpMock();
    expect(service.signUp(signUpMock)).toBeInstanceOf(Observable);
  });
});
