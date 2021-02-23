import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogWindowComponent } from './delete-dialog-window.component';

describe('DeleteDialogWindowComponent', () => {
  let component: DeleteDialogWindowComponent;
  let fixture: ComponentFixture<DeleteDialogWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
