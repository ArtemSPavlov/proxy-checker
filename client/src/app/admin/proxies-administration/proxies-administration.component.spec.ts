import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxiesAdministrationComponent } from './proxies-administration.component';

describe('ProxiesAdministrationComponent', () => {
  let component: ProxiesAdministrationComponent;
  let fixture: ComponentFixture<ProxiesAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProxiesAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxiesAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
