import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../models/employee-models';
import { DataTableDirective } from 'angular-datatables';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-datatable-server-side-angular-way.component',
  templateUrl: './datatable-server-side-angular-way.component.html',
  styleUrls: ['./datatable-server-side-angular-way.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableServerSideAngularWayComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: any = {};
  employeeList: Employee[];
  siteUrl: string = 'http://localhost:22513/api/Employee/GetEmployeeListForDataTable';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      "lengthMenu": [[4, 8, 10, 15], [4, 8, 10, 15]],
      serverSide: true,
     //"scrollX": true,
      "order": [[1, 'asc']],
      
      //processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        //console.log(dataTablesParameters);
        this.http.post<DataTablesResponse>(this.siteUrl, dataTablesParameters).subscribe(resp => {
          this.employeeList = resp.data;
          callback({
            draw: resp.draw,
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [
        //{ data: 'employeeId', name: 'employeeId', orderable: false, searchable: false },
        { data: 'employeeId', name: 'employeeId' },
        { data: 'employeeName', name: 'employeeName' },
        { data: 'gender', name: 'gender' },
        { data: 'annualSalary', name: 'annualSalary' },
        { data: 'dateOfBirth', name: 'dateOfBirth' },
        //{ data: 'employeeId', name: 'employeeId', orderable: false, searchable: false }
      ]
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {

        //Global Searching 
        $('.dataTables_filter input').unbind().bind('focusout', function (e) {
          dtInstance.search(this['value']).draw();
        });

        // Individual Column Searching 
        dtInstance.columns().every(function (index) {
          $('.dataTable thead tr:eq(0) th:eq(' + index + ') input').on('focusout', function () {
              dtInstance.column($(this).parent().index() + ':visible')
                .search(this['value'])
                .draw();
          });
        });

      });

    }, 1000);

  }

}
