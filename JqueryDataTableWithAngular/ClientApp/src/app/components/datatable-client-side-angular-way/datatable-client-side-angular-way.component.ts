import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IEmployee } from '../../models/employee-models';
import { EmployeeService } from '../../services/employee-service.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
declare var jQuery: any;

@Component({
  selector: 'datatable-client-side-angular-way.component',
  templateUrl: './datatable-client-side-angular-way.component.html',
  styleUrls: ['./datatable-client-side-angular-way.component.css']
})
export class DatatableClientSideAngularWayComponent implements OnInit {
  employeeList: IEmployee[];
  statusMessage: string = "Loading Data.....Please wait";

  @ViewChild('isDatatablePopulatedRef') isDatatablePopulatedRef2;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      scrollX: true,
      dom: 'Bfrtip',
      "columnDefs": [
        { "orderable": false, "targets": 0 }
      ],
      buttons: [
        {
          extend: 'pageLength'

        },
        {
          extend: 'excel',
          "text": 'Export to Excel',
          "className": 'btn btn-success',
          exportOptions: {
            columns: 'th:not(:last-child)'
          }
        },
        {
          extend: 'copy',
          "className": 'btn btn-info',
          exportOptions: {
            columns: ':visible'
          }
        },

        {
          extend: 'print',
          "className": 'btn btn-primary',
          exportOptions: {
            columns: 'th:not(:last-child)'
          }
        },

        'colvis'
      ],
      
      pageLength: 4,
      lengthMenu: [[4, 8, 10, 15], [4, 8, 10, 15]],
    }

    this.employeeService.getEmployeeList().subscribe((employeeData) => {
      this.employeeList = employeeData;
      if (employeeData && employeeData.length > 0) {
        setTimeout(() => {
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Individual Column Searching 
            dtInstance.columns().every(function(index) {
              $('.dataTable thead tr:eq(0) th:eq(' + index + ') input').on('keyup change', function() {
                dtInstance.column($(this).parent().index() + ':visible')
                  .search(this['value'])
                  .draw();
              });
            });
          });
        }, 2000);

      }
    }, (error) => {
      console.log(error);
      this.statusMessage = "Problem with the service.. Please try again after some time!";
      });
    
  }
}
