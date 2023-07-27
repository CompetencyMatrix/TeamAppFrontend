import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { EMPLOYEES } from '../../mocks/mock-employees';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent {
  employees = EMPLOYEES;
  selectedEmployee?: Employee;

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }
}
