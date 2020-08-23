import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletPopupComponent } from './leaflet-popup.component';

describe('LeafletPopupComponent', () => {
  let component: LeafletPopupComponent;
  let fixture: ComponentFixture<LeafletPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
