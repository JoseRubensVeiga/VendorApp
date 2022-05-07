import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MediaService } from './media.service';

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call parseNumber and convert a string to a number', () => {
    const _service = service as any;
    const returnedValue = _service.parseNumber('15');

    expect(returnedValue).toBe(15);
  });

  it('should change screenWidth$ BehaviorSubject when getScreenWidth function is called', () => {
    const _service = service as any;
    spyOn(_service, 'getScreenWidth').and.returnValue(of(15));

    _service.registerListener();

    expect(service.screenWidth$.getValue()).toBe(15);
  });
});
