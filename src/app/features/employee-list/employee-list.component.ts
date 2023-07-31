import { Component } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../mocks/mock-employees';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  employees: EmployeeDTOInterface[] = this.getEmployees();
  selectedEmployee?: EmployeeDTOInterface;

  unselectEmployee(): void {
    this.selectedEmployee = undefined;
  }

  onSelect(employee: EmployeeDTOInterface): void {
    this.selectedEmployee = employee;
  }

  updateList(submittedEmployee: EmployeeDTOInterface): void {
    const foundEmployee = this.employees.find(
      (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
    );

    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
      this.selectedEmployee = submittedEmployee;
    } else {
      this.addNewEmployee(submittedEmployee);
    }
    this.selectedEmployee = undefined;
  }

  private addNewEmployee(submittedEmployee: EmployeeDTOInterface): void {
    this.employees.push({
      ...submittedEmployee,
      id: uuid(),
    });
  }
  private editEmployee(submittedEmployee: EmployeeDTOInterface): void {
    const foundEmployee = this.employees.find(
      (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
    );
    if (foundEmployee) {
      this.employees.splice(
        this.employees.indexOf(foundEmployee),
        1,
        submittedEmployee
      );
    }
  }

  getEmployees(): EmployeeDTOInterface[] {
    return EMPLOYEES;
  }
}
