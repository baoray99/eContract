import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuantityReportComponent } from './details-quantity-report.component';

describe('DetailsQuantityReportComponent', () => {
  let component: DetailsQuantityReportComponent;
  let fixture: ComponentFixture<DetailsQuantityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsQuantityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsQuantityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
