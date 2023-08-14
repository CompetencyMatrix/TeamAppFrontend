import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EmployeeDTOInterface } from '../../core/models/DTO/employeeDTO';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  employees: EmployeeDTOInterface[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (employees: EmployeeDTOInterface[]) =>
          (this.employees = employees.slice(1, 5))
      );
  }
}
