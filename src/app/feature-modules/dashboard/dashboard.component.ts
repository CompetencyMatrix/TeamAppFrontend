import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EmployeeInterface } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  employees: EmployeeInterface[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (employees: EmployeeInterface[]) =>
          (this.employees = employees.slice(1, 5))
      );
  }
}
