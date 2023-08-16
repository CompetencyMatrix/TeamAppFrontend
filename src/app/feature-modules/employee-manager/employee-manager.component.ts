import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EmployeeDTOInterface } from '../../core/models/DTO/employeeDTO';
import { v4 as uuid } from 'uuid';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { MessageService } from '../../core/services/message/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss'],
})
export class EmployeeManagerComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  allEmployees: EmployeeDTOInterface[] = [];
  selectedEmployee?: EmployeeDTOInterface;

  ngOnInit(): void {
    this.getAllEmployees();
  }

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  selectEmployee(newEmployee: EmployeeDTOInterface | undefined): void {
    if (newEmployee === undefined) {
    } else {
      this.messageService.addByKey('messages.service.employee.select', {
        employee: newEmployee,
      });
    }
    this.selectedEmployee = newEmployee;
  }

  deleteEmployee(employeeToDelete: EmployeeDTOInterface): void {
    this.allEmployees = this.allEmployees.filter(
      (employee: EmployeeDTOInterface) => employee !== employeeToDelete
    );
  }

  private getAllEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (employees: EmployeeDTOInterface[]) => (this.allEmployees = employees)
      );
  }
}
