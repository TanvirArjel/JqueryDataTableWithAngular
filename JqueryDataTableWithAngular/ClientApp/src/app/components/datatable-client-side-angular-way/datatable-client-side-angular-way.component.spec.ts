import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableClientSideAngularWayComponent } from './datatable-client-side-angular-way.component';

describe('DatatableClientSideAngularWayComponent', () => {
  let component: DatatableClientSideAngularWayComponent;
  let fixture: ComponentFixture<DatatableClientSideAngularWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatableClientSideAngularWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableClientSideAngularWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
