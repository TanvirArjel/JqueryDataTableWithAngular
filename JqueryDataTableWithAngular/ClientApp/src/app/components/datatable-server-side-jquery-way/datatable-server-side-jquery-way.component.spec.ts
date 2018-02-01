import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableServerSideJqueryWayComponent } from './datatable-server-side-jquery-way.component';

describe('DataTableServerSideJqueryWayComponent', () => {
  let component: DataTableServerSideJqueryWayComponent;
  let fixture: ComponentFixture<DataTableServerSideJqueryWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableServerSideJqueryWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableServerSideJqueryWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
