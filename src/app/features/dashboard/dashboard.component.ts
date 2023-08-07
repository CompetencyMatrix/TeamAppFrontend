import { Component, OnInit } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { EmployeeService } from '../../core/services/employee/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  employees: EmployeeDTOInterface[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe(employees => (this.employees = employees.slice(1, 5)));
  }
}
