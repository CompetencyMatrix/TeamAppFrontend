import { Component } from '@angular/core';
import { EmployeeInterface } from '../../models/employee';
import { EMPLOYEES } from '../../mocks/mock-employees';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent {
  employees: EmployeeInterface[] = EMPLOYEES;
  selectedEmployee?: EmployeeInterface;

  onSelect(employee: EmployeeInterface): void {
    console.log(this.selectedEmployee);
    this.selectedEmployee = employee;
  }
}
