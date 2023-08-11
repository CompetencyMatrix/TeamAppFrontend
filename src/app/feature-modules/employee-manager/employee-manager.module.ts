import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagerRoutingModule } from './employee-manager-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeManagerComponent } from './employee-manager.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

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
    EmployeeManagerRoutingModule,
    MatListModule,
    TranslateModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class EmployeeManagerModule {}