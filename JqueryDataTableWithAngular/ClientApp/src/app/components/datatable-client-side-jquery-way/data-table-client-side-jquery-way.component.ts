import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../models/employee-models';
import { EmployeeService } from '../../services/employee-service.service';
declare var $: any;

@Component({
  selector: 'app-data-table-client-side-jquery-way.component',
  templateUrl: './data-table-client-side-jquery-way.component.html',
  styleUrls: ['./data-table-client-side-jquery-way.component.css']
})
export class DataTableClientSideJqueryWayComponent implements OnInit {

  employees: IEmployee[];
  statusMessage: string = "Loading Data.....Please wait";

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {


    this.employeeService.getEmployeeList().subscribe((employeeData) => {

      this.employees = employeeData;
        
        $(() => {
          // Setup - add a text input to each header cell
          $('#dataTable thead tr:eq(0) th:not(:last,:first)').each(function () {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
          });

          var table = $('#dataTable').DataTable({
            "scrollX": true,
            order: [1,'asc'],
            "fixedColumns": {
              rightColumns: 1
            },
            "columnDefs": [
              { "orderable": false, "targets": 0 }
            ]
          });

          // Individual Column Searching In case of Some Fixed Column
          $(table.table().container()).on('keyup', 'thead input', function () {
            table.column($(this).parent().index() + ':visible')
              .search(this.value)
              .draw();
          });
        });
        

    }, (error) => {
      console.log(error);
      this.statusMessage = "Problem with the service.. Please try again after some time!";
    });
  }

}
