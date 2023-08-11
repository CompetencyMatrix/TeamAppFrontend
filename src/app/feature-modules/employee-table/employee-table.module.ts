import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeTableRoutingModule } from './employee-table-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeManagerComponent } from './components/employee-manager/employee-manager.component';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ProjectsComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeManagerComponent,
    EmployeeTableComponent,
  ],
  imports: [
    CommonModule,
    EmployeeTableRoutingModule,
    MatListModule,
    TranslateModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
  ],
})
export class EmployeeTableModule {}
