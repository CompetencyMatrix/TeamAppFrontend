import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeDTOInterface } from '../../../core/models/DTO/employeeDTO';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent {
  @Input() employees: EmployeeDTOInterface[] = [];
  selectedEmployee?: EmployeeDTOInterface;
  @Output() selectEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  @Output() deleteEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
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
  employeesDataSource: MatTableDataSource<EmployeeDTOInterface> =
    new MatTableDataSource(this.employees);

  onSelectEmployee(employee: EmployeeDTOInterface): void {
    if (
      this.selectedEmployee === undefined ||
      this.selectedEmployee != employee
    ) {
      this.selectEmployee(employee);
    } else {
      this.unselectEmployee();
    }
  }

  onDeleteEmployee(employee: EmployeeDTOInterface): void {
    this.deleteEmployeeEvent.emit(employee);
  }

  private unselectEmployee(): void {
    this.selectEmployee(undefined);
  }
  private selectEmployee(employee: EmployeeDTOInterface | undefined): void {
    this.selectedEmployee = employee;
    this.selectEmployeeEvent.emit(this.selectedEmployee);
  }
}
