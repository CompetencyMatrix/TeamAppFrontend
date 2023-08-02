import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  // TODO : czy to powinno być nullowalne ("nazwa?") czy lepiej inicjować pustą listą
  @Input() employees: EmployeeDTOInterface[] = [];
  selectedEmployee?: EmployeeDTOInterface;
  // TODO: czy trzymanie selectedEmployee nie jest błędne, jesli chcialem traktować ten komponent jako dumb
  @Output() selectEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();

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
