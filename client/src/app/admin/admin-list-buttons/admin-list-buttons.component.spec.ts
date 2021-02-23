import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListButtonsComponent } from './admin-list-buttons.component';

describe('AdminListButtonsComponent', () => {
  let component: AdminListButtonsComponent;
  let fixture: ComponentFixture<AdminListButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
