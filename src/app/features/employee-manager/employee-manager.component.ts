import { Component, Input } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { v4 as uuid } from 'uuid';
import { EMPLOYEES } from '../../mocks/mock-employees';
import { SKILLS } from '../../mocks/mock-skills';
import { PROJECTS } from '../../mocks/mock-projects';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss'],
})
export class EmployeeManagerComponent {
  allEmployees: EmployeeDTOInterface[] = EMPLOYEES;
  otherEmployees: EmployeeDTOInterface[] = this.getOtherEmployees();
  selectedEmployee?: EmployeeDTOInterface;
  skills = SKILLS;
  projects = PROJECTS;

  selectEmployee(newEmployee: EmployeeDTOInterface): void {
    this.selectedEmployee = newEmployee;
    this.otherEmployees = this.getOtherEmployees();
  }
  updateEmployeesList(submittedEmployee: EmployeeDTOInterface): void {
    const foundEmployee: EmployeeDTOInterface | undefined =
      this.allEmployees.find(
        (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
      );

    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
      //TODO : remove:
      // this.selectedEmployee = submittedEmployee;
    } else {
      this.addNewEmployee(submittedEmployee);
    }
    this.selectedEmployee = undefined;
  }

  private addNewEmployee(submittedEmployee: EmployeeDTOInterface): void {
    this.allEmployees.push({
      ...submittedEmployee,
      id: uuid(),
    });
  }
  private editEmployee(submittedEmployee: EmployeeDTOInterface): void {
    const foundEmployee = this.allEmployees.find(
      (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
    );
    if (foundEmployee) {
      this.allEmployees.splice(
        this.allEmployees.indexOf(foundEmployee),
        1,
        submittedEmployee
      );
    }
  }

  getOtherEmployees(): EmployeeDTOInterface[] {
    if (this.allEmployees === undefined) {
      return [];
    } else {
      if (this.selectedEmployee === undefined) {
        return this.allEmployees;
      }
      return this.allEmployees.filter(
        (e: EmployeeDTOInterface) => e.id != this.selectedEmployee?.id
      );
    }
  }
}
