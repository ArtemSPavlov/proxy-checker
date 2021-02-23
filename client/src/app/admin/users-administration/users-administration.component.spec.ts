import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdministrationComponent } from './users-administration.component';

describe('UsersAdministrationComponent', () => {
  let component: UsersAdministrationComponent;
  let fixture: ComponentFixture<UsersAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
