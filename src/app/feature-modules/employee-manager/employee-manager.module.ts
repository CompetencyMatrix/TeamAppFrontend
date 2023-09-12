import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagerRoutingModule } from './employee-manager-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeManagerComponent } from './employee-manager.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProjectsComponent,
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
    MatButtonModule,
    SharedModule,
  ],
})
export class EmployeeManagerModule {}
