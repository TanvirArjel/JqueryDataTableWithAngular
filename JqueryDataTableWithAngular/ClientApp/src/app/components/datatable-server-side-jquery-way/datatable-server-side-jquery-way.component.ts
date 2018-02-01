import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-datatable-server-side-jquery-way.component',
  templateUrl: './datatable-server-side-jquery-way.component.html',
  styleUrls: ['./datatable-server-side-jquery-way.component.css']
})
export class DataTableServerSideJqueryWayComponent implements OnInit {
  constructor() { }
  ngOnInit() {

    jQuery(function () {

      // Setup - add a text input to each header cell
      jQuery('#myDataTable thead tr:eq(0) th:not(:last,:first)').each(function () {
        var title = jQuery(this).text();
        jQuery(this).html('<input type="text" placeholder="Search ' + title + '" />');
      });

      var table = jQuery('#myDataTable').DataTable({
        "processing": true,
        "serverSide": true,
        "scrollX": true,
        "lengthMenu": [[4, 8, 10, 15], [4, 8, 10, 15]],
        "fixedColumns": {
          rightColumns: 1
        },
        "lengthChange": false,
        //dom: 'Bfrtip',
        buttons: [
          {
            extend: 'pageLength'

          },
          {
            extend: 'excel',
            "text": 'Export to Excel></i>',
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
              columns: ':visible'
            }
          },
          
          'colvis'
        ],
        order: [[1, 'asc']],
        "ajax": {
          "url": "http://localhost:22513/api/Employee/GetEmployeeList",
          contentType: 'application/json',
          "method": "POST",
          "data": function (d) {
            return JSON.stringify(d);
          }
        },
        "columns": [
          {
            data: 'employeeId', name: 'employeeId', orderable: false, searchable: false,
            render: function (data, type, row, meta) {
              return meta.settings._iDisplayStart + meta.row + 1;
            }
          },
          { data: 'employeeId', name: 'employeeId' },
          { data: 'employeeName', name: 'employeeName' },
          { data: 'gender', name: 'gender' },
          { data: 'annualSalary', name: 'annualSalary' },
          { data: 'dateOfBirth', name: 'dateOfBirth' },
          {
            data: 'employeeId', name: 'employeeId', orderable: false, searchable: false,
            "render": function (data, type, row, meta) {
              return '<a class ="btn btn-info btn-sm" href="/ServerSide/Details/' + row.EmployeeId + '">Details</a>' + ' ' +
                '<a class ="btn btn-primary btn-sm" href="/ServerSide/Edit/' + row.EmployeeId + '">Edit</a>' + ' ' +
                '<a class ="btn btn-danger btn-sm" href="/ServerSide/Delete/' + row.EmployeeId + '">Delete</a>';
            }
          }
        ],
        "initComplete": function () {
          table.buttons().container()
            .appendTo($('#myDataTable_wrapper .col-md-6:eq(0)'));
        },
        "language": {
          "emptyTable": "There are no customers at present.",
          "zeroRecords": "There were no matching customers found."
        },
        "searching": true, // <-- this should be set to true
        "ordering": true, // <-- this should be set to true
        "paging": true // <-- this should be set to true
      });

      // Individual Column Searching In case of Some Fixed Column
      jQuery(table.table().container()).on('focusout', 'thead input', function () {
        table.column(jQuery(this).parent().index() + ':visible')
          .search(this.value)
          .draw();
      });
    });
  }

}
