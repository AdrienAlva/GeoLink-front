import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProfileOrganizationComponent } from './register-profile-organization.component';

describe('RegisterProfileOrganizationComponent', () => {
  let component: RegisterProfileOrganizationComponent;
  let fixture: ComponentFixture<RegisterProfileOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProfileOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProfileOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
