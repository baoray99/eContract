import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableKHCNComponent } from './table-khcn.component';

describe('TableKHCNComponent', () => {
  let component: TableKHCNComponent;
  let fixture: ComponentFixture<TableKHCNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableKHCNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableKHCNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
