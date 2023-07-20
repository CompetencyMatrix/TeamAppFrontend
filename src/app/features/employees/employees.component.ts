import { Component } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  employee: Employee = {
    id: '123DAF',
    name: 'Gregory',
  };
}
