import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableServerSideAngularWayComponent } from './datatable-server-side-angular-way.component';

describe('DatatableServerSideAngularWayComponent', () => {
  let component: DatatableServerSideAngularWayComponent;
  let fixture: ComponentFixture<DatatableServerSideAngularWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatableServerSideAngularWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableServerSideAngularWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
