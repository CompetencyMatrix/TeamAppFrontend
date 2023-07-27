import { Component } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../mocks/mock-employees';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent {
  employees: EmployeeDTOInterface[] = EMPLOYEES;
  selectedEmployee?: EmployeeDTOInterface;

  onSelect(employee: EmployeeDTOInterface): void {
    console.log(this.selectedEmployee);
    this.selectedEmployee = employee;
  }

  onEmployeeFormSubmit(submittedEmployee: EmployeeDTOInterface) {
    const foundEmployee = this.employees.find(
      (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
    );
    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
    } else {
      this.addNewEmployee(submittedEmployee);
    }
  }

  private addNewEmployee(submittedEmployee: EmployeeDTOInterface) {
    // TODO: use crypto or other UUID generator
    this.employees.push({ ...submittedEmployee, id: '132' });
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
