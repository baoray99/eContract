import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEKYCComponent } from './info-e-kyc.component';

describe('InfoEKYCComponent', () => {
  let component: InfoEKYCComponent;
  let fixture: ComponentFixture<InfoEKYCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEKYCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEKYCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
