import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogWindowComponent } from './add-dialog-window.component';

describe('AddDialogWindowComponent', () => {
  let component: AddDialogWindowComponent;
  let fixture: ComponentFixture<AddDialogWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDialogWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
