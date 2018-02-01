import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../models/employee-models';
import { EmployeeService } from '../../services/employee-service.service';
declare var jQuery: any;

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
        setTimeout(function () {
          jQuery(function () {

            // Setup - add a text input to each header cell
            jQuery('#dataTable thead tr:eq(0) th:not(:last,:first)').each(function () {
              var title = jQuery(this).text();
              jQuery(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });

            var table = jQuery('#dataTable').DataTable({
              "scrollX": true,
              "lengthMenu": [[4, 8, 10, 15], [4, 8, 10, 15]],
              "fixedColumns": {
                rightColumns: 1
              }
            });

            // Individual Column Searching In case of Some Fixed Column
            jQuery(table.table().container()).on('keyup', 'thead input', function () {
              table.column(jQuery(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
            });
          });
        }, 10);

    }, (error) => {
      console.log(error);
      this.statusMessage = "Problem with the service.. Please try again after some time!";
    });
  }




  trackByEmployeeCode(index: number, employee: any): string {
    return employee.code;
  }

}
