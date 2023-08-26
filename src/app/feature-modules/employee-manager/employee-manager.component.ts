import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EmployeeInterface } from '../../core/models/employee';
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
  allEmployees: EmployeeInterface[] = [];
  selectedEmployee?: EmployeeInterface;

  ngOnInit(): void {
    this.getAllEmployees();
  }

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  selectEmployee(newEmployee: EmployeeInterface | undefined): void {
    if (newEmployee === undefined) {
      //   TODO
    } else {
      this.messageService.addByKey('messages.service.employee.select', {
        employee: newEmployee,
      });
    }
    this.selectedEmployee = newEmployee;
  }
  deleteEmployee(employeeToDelete: EmployeeInterface): void {
    this.employeeService
      .deleteEmployee(employeeToDelete.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(_ => {
        this.allEmployees = this.allEmployees.filter(
          (employee: EmployeeInterface) => employee !== employeeToDelete
        );
      });
  }

  private getAllEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (employees: EmployeeInterface[]) => (this.allEmployees = employees)
      );
  }
}
