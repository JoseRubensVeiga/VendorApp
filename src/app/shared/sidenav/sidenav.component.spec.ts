import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth';
import { MenuItemComponent } from './menu-item';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent, MenuItemComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openDrawer with a default argument', () => {
    const _component = component as any;

    _component.openDrawer();

    expect(component.isByMouseEnter).toBe(false);
  });

  it('should call openDrawer with a true as argument', () => {
    const _component = component as any;

    _component.openDrawer(true);

    expect(component.isByMouseEnter).toBe(true);
  });

  it('should open the drawer only if its truthy', () => {
    const _component = component as any;
    _component.drawer = undefined;

    _component.openDrawer();

    expect(component.drawer).toBeUndefined();
  });

  it('should call updateContentMargins 200 ms after open drawer', fakeAsync(() => {
    const spy = spyOn(component.sidenavContainer, 'updateContentMargins');

    const _component = component as any;
    _component.openDrawer();
    tick(201);

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should call updateContentMargins 200 ms after open drawer only if its truthy', fakeAsync(() => {
    const _component = component as any;
    _component.sidenavContainer = undefined;
    _component.openDrawer();
    tick(201);

    expect(_component.sidenavContainer).toBeUndefined();
  }));

  it('should call closeDrawer function and close the drawer', () => {
    const _component = component as any;
    _component.drawer = { close: () => {} } as MatDrawer;

    _component.closeDrawer();
    fixture.detectChanges();

    expect(component.selectedItem).toBeNull();

    _component.drawer = undefined;
    _component.closeDrawer();

    expect(_component.drawer).toBeUndefined();
  });

  it('should call refreshDrawer and close the drawer', () => {
    const _component = component as any;
    const spy = spyOn(_component, 'closeDrawer').and.callThrough();
    _component.drawer = { close: () => {} } as MatDrawer;
    _component.refreshDrawer(600);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call refreshDrawer and not close the drawer', () => {
    const _component = component as any;
    const spy = spyOn(_component, 'closeDrawer').and.callThrough();
    _component.drawer = { opened: true } as MatDrawer;
    _component.refreshDrawer(800);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should call onMouseLeave and call closeDrawer', () => {
    const _component = component as any;
    component.isByMouseEnter = true;
    const spy = spyOn(_component, 'closeDrawer').and.callThrough();
    _component.drawer = { close: () => {} } as MatDrawer;

    component.onMouseLeave();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave and call closeDrawer', () => {
    const _component = component as any;
    component.isByMouseEnter = false;
    const spy = spyOn(_component, 'closeDrawer').and.callThrough();
    _component.drawer = { close: () => {} } as MatDrawer;

    component.onMouseLeave();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should call onMouseEnter function and not call openDrawer', () => {
    const _component = component as any;
    spyOn(_component, 'isDrawerAlreadyIntanced').and.returnValue(false);
    _component.drawer = { opened: true } as MatDrawer;
    const spy = spyOn(_component, 'openDrawer').and.callThrough();

    component.onMouseEnter();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should call onMouseEnter function and call openDrawer', () => {
    const _component = component as any;
    spyOn(_component, 'isDrawerAlreadyIntanced').and.returnValue(true);
    spyOn(_component, 'isDrawerOpened').and.returnValue(false);
    _component.drawer = { open: () => {} } as MatDrawer;
    const spy = spyOn(_component, 'openDrawer').and.callThrough();

    component.onMouseEnter();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call isDrawerOpened', () => {
    const _component = component as any;
    spyOn(_component, 'isDrawerAlreadyIntanced').and.returnValue(true);
    _component.drawer = { opened: true } as MatDrawer;

    const returnedValue = _component.isDrawerOpened();

    expect(_component.drawer.opened).toBe(returnedValue);
  });

  it('should call isDrawerOpened and return false', () => {
    const _component = component as any;
    spyOn(_component, 'isDrawerAlreadyIntanced').and.returnValue(false);
    _component.drawer = { opened: true } as MatDrawer;

    const returnedValue = _component.isDrawerOpened();

    expect(returnedValue).toBe(false);
  });

  it('should call onItemClicked with the same index as selectedItem', () => {
    component.selectedItem = 1;

    component.onItemClicked(1);

    expect(component.selectedItem).toBeNull();
  });

  it('should call onItemClicked with the other index as selectedItem', () => {
    component.selectedItem = 1;

    component.onItemClicked(2);

    expect(component.selectedItem).toBe(2);
  });

  it('should call toggleSidenav and call closeDrawer', () => {
    const _component = component as any;
    spyOn(_component, 'isDrawerAlreadyIntanced').and.returnValue(true);
    spyOn(_component, 'isDrawerOpened').and.returnValue(true);
    _component.drawer = { close: () => {} } as MatDrawer;
    const closeDrawerSpy = spyOn(_component, 'closeDrawer').and.callThrough();
    const openDrawerSpy = spyOn(_component, 'openDrawer').and.callThrough();

    component.toggleSidenav();

    expect(closeDrawerSpy).toHaveBeenCalledTimes(1);
    expect(openDrawerSpy).toHaveBeenCalledTimes(0);
  });

  it('should call toggleSidenav and call openDrawerSpy', () => {
    const _component = component as any;
    spyOn(_component, 'isDrawerAlreadyIntanced').and.returnValue(false);
    spyOn(_component, 'isDrawerOpened').and.returnValue(false);
    _component.drawer = { opened: true } as MatDrawer;
    const closeDrawerSpy = spyOn(_component, 'closeDrawer').and.callThrough();
    const openDrawerSpy = spyOn(_component, 'openDrawer').and.callThrough();

    component.toggleSidenav();

    expect(closeDrawerSpy).toHaveBeenCalledTimes(0);
    expect(openDrawerSpy).toHaveBeenCalledTimes(1);
  });
});
