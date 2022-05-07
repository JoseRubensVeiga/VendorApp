import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MenuItemMock,
  MenuSubItemMock,
} from 'src/app/mock/models/MenuItem/MenuItem.mock';

import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItemComponent],
      imports: [MatIconModule, MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call emitClickItem and emit the clickItem', () => {
    const spy = spyOn(component.clickItem, 'emit').and.callThrough();

    component.emitClickItem();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should get children', () => {
    component.menuItem = new MenuItemMock();
    const returnedValue = component.children;

    if (returnedValue) {
      expect(returnedValue[0]).toBeInstanceOf(MenuSubItemMock);
      return;
    }

    expect(returnedValue).toBeNull();
  });
});
