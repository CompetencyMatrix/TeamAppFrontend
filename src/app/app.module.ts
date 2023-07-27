import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesListComponent } from './features/employees-list/employees-list.component';
import { EmployeeDetailsComponent } from './features/employee-details/employee-details.component';
import { EmployeeFormComponent } from './features/employee-form/employee-form.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeDetailsComponent,
    EmployeeFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
