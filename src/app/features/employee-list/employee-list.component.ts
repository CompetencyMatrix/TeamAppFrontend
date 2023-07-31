import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  // TODO : czy to powinno być nullowalne ("nazwa?") czy lepiej inicjować pustą listą
  @Input() employees?: EmployeeDTOInterface[];
  selectedEmployee?: EmployeeDTOInterface;
  @Output() selectEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();

  onSelectEmployee(employee: EmployeeDTOInterface): void {
    // TODO check if comparison of employees work or should i do :
    // this.selectedEmployee.id != employee.id
    if (
      this.selectedEmployee === undefined ||
      this.selectedEmployee != employee
    ) {
      this.selectEmployee(employee);
    } else {
      this.unselectEmployee();
    }
  }

  onAddNewEmployee(): void {
    this.unselectEmployee();
  }

  private unselectEmployee(): void {
    this.selectedEmployee = undefined;
    this.selectEmployeeEvent.emit(this.selectedEmployee);
  }
  private selectEmployee(employee: EmployeeDTOInterface): void {
    this.selectedEmployee = employee;
    this.selectEmployeeEvent.emit(this.selectedEmployee);
  }
}
