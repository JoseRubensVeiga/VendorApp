import { TestBed } from '@angular/core/testing';
import { TokenResponseMock } from 'src/app/mock/models/Token/Token.mock';

import { StorageService } from './';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if passes a invalid argument to safeJsonParse function', () => {
    const returnedValue = (service as any).safeJsonParse('.');

    expect(returnedValue).toBe(null);
  });

  it('should call getToken function and return a valid token', () => {
    service.jwtData = new TokenResponseMock();

    const gettedToken = service.getToken();

    expect(gettedToken).toBeTruthy();
  });

  it('should call getToken function and return null', () => {
    spyOnProperty(service, 'jwtData', 'get').and.returnValue(null);
    const gettedToken = service.getToken();

    expect(gettedToken).toBeNull();
  });

  it('should call getFromStorage and return null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const returnedValue = (service as any).getFromStorage('', class Test {});

    expect(returnedValue).toBeNull();
  });

  it('should call jwtData and return null', () => {
    const _service = service as any;
    spyOn(_service, 'getFromStorage').and.returnValue(null);

    const jwtData = service.jwtData;

    expect(jwtData).toBeNull();
  });
});
