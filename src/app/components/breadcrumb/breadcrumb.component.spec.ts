import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify if 700 is smaller than 900', () => {
    const isSmallScreen = (component as any).isSmallScreen;
    const returnedValue = isSmallScreen(700);
    expect(returnedValue).toBeTrue();
  });

  it('should verify if 1000 is smaller than 900', () => {
    const returnedValue = (component as any).isSmallScreen(1000);
    expect(returnedValue).toBeFalse();
  });
});
