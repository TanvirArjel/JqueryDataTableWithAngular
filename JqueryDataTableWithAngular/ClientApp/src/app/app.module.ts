import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataTableServerSideJqueryWayComponent } from './components/datatable-server-side-jquery-way/datatable-server-side-jquery-way.component';
import { EmployeeService } from './services/employee-service.service';
import { EmployeeTitlePipe } from './common/pipes/employee-title.pipe';
import { DataTablesModule } from 'angular-datatables';
import { DatatableClientSideAngularWayComponent } from './components/datatable-client-side-angular-way/datatable-client-side-angular-way.component';
import { DatatableServerSideAngularWayComponent } from './components/datatable-server-side-angular-way/datatable-server-side-angular-way.component';
import { DataTableClientSideJqueryWayComponent } from './components/datatable-client-side-jquery-way/data-table-client-side-jquery-way.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataTableClientSideJqueryWayComponent,
    DataTableServerSideJqueryWayComponent,
    EmployeeTitlePipe,
    DatatableClientSideAngularWayComponent,
    DatatableServerSideAngularWayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    DataTablesModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'datatable-client-side-jquery-way', component: DataTableClientSideJqueryWayComponent },
      { path: 'datatable-server-side-jquery-way', component: DataTableServerSideJqueryWayComponent },
      { path: 'datatable-client-side-angular-way', component: DatatableClientSideAngularWayComponent },
      { path: 'datatable-server-side-angular-way', component: DatatableServerSideAngularWayComponent }
    ])
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
