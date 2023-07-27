import { Component } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  employee: Employee = {
    id: '123DAF',
    name: 'Gregory',
    surname: 'Checkins',
    hireDate: '12.10.2001',
    skills: ['SCSS', 'Kotlin', 'Rust'],
    manager: 'Marek',
  };
}
