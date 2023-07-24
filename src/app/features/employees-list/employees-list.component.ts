import { Component } from '@angular/core';
import { EMPLOYEES } from '../../mocks/mock-employees';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent {
  employees = EMPLOYEES;
}
