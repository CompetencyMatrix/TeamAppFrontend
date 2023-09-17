import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagerRoutingModule } from './employee-manager-routing.module';
import { EmployeeManagerComponent } from './employee-manager.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [EmployeeManagerComponent, EmployeeTableComponent],
  imports: [
    CommonModule,
    EmployeeManagerRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    TranslateModule,
    MatCardModule,
  ],
})
export class EmployeeManagerModule {}
