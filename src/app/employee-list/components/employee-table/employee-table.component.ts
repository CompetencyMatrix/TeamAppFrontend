import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeDTOInterface } from '../../../models/DTO/employeeDTO';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent {
  @Input() employees: EmployeeDTOInterface[] = [];
  selectedEmployee?: EmployeeDTOInterface;
  @Output() selectEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  // TODO: add projects-time columns names
  columnsToDisplay: string[] = [
    'id',
    'name',
    'surname',
    'hireDate',
    'skills',
    'manager',
  ];

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

  private unselectEmployee(): void {
    this.selectEmployee(undefined);
  }
  private selectEmployee(employee: EmployeeDTOInterface | undefined): void {
    this.selectedEmployee = employee;
    this.selectEmployeeEvent.emit(this.selectedEmployee);
  }
}
