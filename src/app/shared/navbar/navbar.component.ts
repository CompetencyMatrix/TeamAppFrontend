import { Component } from '@angular/core';
import { EmployeeService } from '../../core/services/employee/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private employeeService: EmployeeService) {}
}
