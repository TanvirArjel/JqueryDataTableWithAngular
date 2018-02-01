import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableClientSideJqueryWayComponent } from './data-table-client-side-jquery-way.component';

describe('DataTableClientSideJqueryWayComponent', () => {
  let component: DataTableClientSideJqueryWayComponent;
  let fixture: ComponentFixture<DataTableClientSideJqueryWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableClientSideJqueryWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableClientSideJqueryWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
