import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent {
  @Input() employees: EmployeeInterface[] = [];
  selectedEmployee?: EmployeeInterface;
  @Output() selectEmployeeEvent = new EventEmitter<EmployeeInterface>();
  @Output() deleteEmployeeEvent = new EventEmitter<EmployeeInterface>();
  // TODO: add projects-time columns names
  columnsToDisplay: string[] = [
    'id',
    'name',
    'surname',
    'hireDate',
    'skills',
    'manager',
    'actions',
  ];

  // TODO: implement own DataSource
  employeesDataSource: MatTableDataSource<EmployeeInterface> =
    new MatTableDataSource(this.employees);

  onSelectEmployee(employee: EmployeeInterface): void {
    if (
      this.selectedEmployee === undefined ||
      this.selectedEmployee != employee
    ) {
      this.selectEmployee(employee);
    } else {
      this.unselectEmployee();
    }
  }

  onDeleteEmployee(employee: EmployeeInterface): void {
    this.deleteEmployeeEvent.emit(employee);
  }

  private unselectEmployee(): void {
    this.selectEmployee(undefined);
  }
  private selectEmployee(employee: EmployeeInterface | undefined): void {
    this.selectedEmployee = employee;
    this.selectEmployeeEvent.emit(this.selectedEmployee);
  }
}
