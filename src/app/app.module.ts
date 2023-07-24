import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { FormsModule } from '@angular/forms';
import { EmployeesListComponent } from './features/employees-list/employees-list.component';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, EmployeesListComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
