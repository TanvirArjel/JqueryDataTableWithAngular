import { TestBed, inject } from '@angular/core/testing';

import { EmployeeService } from './employee-service.service';

describe('EmployeeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
