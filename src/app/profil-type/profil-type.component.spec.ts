import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilTypeComponent } from './profil-type.component';

describe('ProfilTypeComponent', () => {
  let component: ProfilTypeComponent;
  let fixture: ComponentFixture<ProfilTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
