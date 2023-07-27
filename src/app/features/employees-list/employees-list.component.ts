import { Component } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../mocks/mock-employees';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent {
  employees: EmployeeDTOInterface[] = EMPLOYEES;
  selectedEmployee?: EmployeeDTOInterface;

  unselectEmployee() {
    this.selectedEmployee = undefined;
  }
  onSelect(employee: EmployeeDTOInterface): void {
    this.selectedEmployee = employee;
  }

  onEmployeeFormSubmit(submittedEmployee: EmployeeDTOInterface) {
    const foundEmployee = this.employees.find(
      (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
    );

    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
      this.selectedEmployee = submittedEmployee;
    } else {
      this.addNewEmployee(submittedEmployee);
    }
  }

  private addNewEmployee(submittedEmployee: EmployeeDTOInterface) {
    this.employees.push({
      ...submittedEmployee,
      id: uuid(),
    });
  }
  private editEmployee(submittedEmployee: EmployeeDTOInterface) {
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
}
