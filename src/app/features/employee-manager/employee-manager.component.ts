import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { v4 as uuid } from 'uuid';
import { EMPLOYEES } from '../../mocks/mock-employees';
import { SKILLS } from '../../mocks/mock-skills';
import { PROJECTS } from '../../mocks/mock-projects';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { ProjectDTOInterface } from '../../models/DTO/projectDTO';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss'],
})
export class EmployeeManagerComponent implements OnInit {
  allEmployees: EmployeeDTOInterface[] = [];
  otherEmployees: EmployeeDTOInterface[] = [];
  selectedEmployee?: EmployeeDTOInterface;
  skills: string[] = SKILLS;
  projects: ProjectDTOInterface[] = PROJECTS;

  ngOnInit(): void {
    this.getAllEmployees();
    this.setOtherEmployees();
  }

  constructor(private employeeService: EmployeeService) {}

  selectEmployee(newEmployee: EmployeeDTOInterface): void {
    this.selectedEmployee = newEmployee;
    this.setOtherEmployees();
  }
  // TODO: 3 below functions: to be moved to service, once it can really update the list -now its not stored in service anyhow - just returned in the getEmployees() call
  updateEmployeesList(submittedEmployee: EmployeeDTOInterface): void {
    const foundEmployee: EmployeeDTOInterface | undefined =
      this.allEmployees.find(
        (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
      );

    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
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

  // TODO: Czy taka funkcja mogłaby być w serwisie?
  //  Czy wołanie do serwisu o podanie listy wszystkich pracownikow pomniejszonej o jednego konkretnego za kazdym razem kiedy zachodzi event select w liscie bedzie bardziej kosztowne niż trzymanie takiej listy na stałe?
  //  Czy można to zrobić w jakiś sposób Lazy - tak aby dopiero kiedy ktos bedzie chcial wybrać managera to wywołało się faktyczne wykonanie operacji w serwisie?
  // TU wlasnie Observable sie zrobi?

  private setOtherEmployees(): void {
    if (this.allEmployees === undefined) {
      this.otherEmployees = [];
    } else {
      if (this.selectedEmployee === undefined) {
        this.otherEmployees = this.allEmployees;
      }
      this.otherEmployees = this.allEmployees.filter(
        (e: EmployeeDTOInterface) => e.id != this.selectedEmployee?.id
      );
    }
  }

  private getAllEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe(
        (employees: EmployeeDTOInterface[]) => (this.allEmployees = employees)
      );
  }
}
