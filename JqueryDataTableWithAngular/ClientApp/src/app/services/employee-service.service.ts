import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/Observable/throw';
import {Employee, IEmployee} from '../models/employee-models';


@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) { }
  private baseUrl: string = "http://localhost:22513/api/Employee/";

  getEmployeeList(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseUrl +'GetEmployees').catch(this.handleError);
  }


  getEmployeeByCode(employeeId: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.baseUrl +'GetEmployee/' + employeeId).catch(this.handleError);

  }

  createEmployee(employee: IEmployee): Observable<IEmployee> {
    let body = JSON.stringify(employee);
    let headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IEmployee>(this.baseUrl + '/PostEmployee', body, {headers: headerOptions}).catch(this.handleError);
  }

  updateEmployee(employee: IEmployee): Observable<IEmployee> {
    let body = JSON.stringify(employee);
    let headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IEmployee>(this.baseUrl + 'PutEmployee/' + employee.employeeId, body, {headers : headerOptions}).catch(this.handleError);
  }

  deleteEmployee(employeeId: number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(this.baseUrl + 'DeleteEmployee/' + employeeId).catch(this.handleError);
  }

  handleError(error: HttpErrorResponse) {
    console.error();
    return Observable.throw(error);
  }

}
