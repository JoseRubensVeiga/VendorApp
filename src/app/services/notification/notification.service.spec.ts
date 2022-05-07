import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let toastr: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ToastrModule.forRoot()],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(NotificationService);
    toastr = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Swal.fire when confirm function is called', () => {
    const fireSpy = spyOn(Swal, 'fire').and.callThrough();

    service.confirm({});

    expect(fireSpy).toHaveBeenCalledTimes(1);
  });

  it('should call warning function with the title param', () => {
    const warningSpy = spyOn(service, 'warning').and.callThrough();

    service.warning('text', 'title');
    expect(warningSpy).toHaveBeenCalledOnceWith('text', 'title');
  });

  it('should call warning function without the title param', () => {
    const warningSpy = spyOn(toastr, 'warning').and.callThrough();

    service.warning('text');
    expect(warningSpy).toHaveBeenCalledOnceWith('text', 'Atenção!');
  });

  it('should call info function with the title param', () => {
    const infoSpy = spyOn(service, 'info').and.callThrough();

    service.info('text', 'title');
    expect(infoSpy).toHaveBeenCalledOnceWith('text', 'title');
  });

  it('should call info function without the title param', () => {
    const infoSpy = spyOn(toastr, 'info').and.callThrough();

    service.info('text');
    expect(infoSpy).toHaveBeenCalledOnceWith('text', 'Informação');
  });
});
