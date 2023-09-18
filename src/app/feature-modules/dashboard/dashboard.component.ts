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
  newEmployees: EmployeeInterface[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: EmployeeInterface[]) => {
        this.employees = employees
          .sort((e1, e2) => e1.skills.length - e2.skills.length)
          .slice(1, 5);
        this.newEmployees = employees.slice(1, 5);
        // sort((e1, e2) => e1.hireDate - e2.hireDate)
      });
  }
}
