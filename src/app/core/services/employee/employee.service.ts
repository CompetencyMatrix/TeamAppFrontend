import { Injectable } from '@angular/core';
import { EmployeeInterface } from '../../models/employee';
import { EMPLOYEES } from '../../../mocks/mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { v4 as uuid } from 'uuid';
import { ProficiencyLevel } from '../../enums/proficiency-level-enum';
import { EmployeeSkillInterface } from '../../models/employeeSkill';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private messageService: MessageService) {
    // // TODO: czy w serwisie w docelowej wersji tez pobieramy z backendu i przechowujemy u siebie kopię czy mamy tylko funkcje getEmployees() ktra daje komponentom dnae z backendu, ale w serwisie nie trzymamy zadnej skladowej employees
    // this._employees = this.getEmployees();
  }

  getEmployees(): Observable<EmployeeInterface[]> {
    const employees: Observable<EmployeeInterface[]> = of(EMPLOYEES);
    this.messageService.addByKey('messages.service.employee.fetched.employees');
    return employees;
  }

  getEmployeeById(id: string): Observable<EmployeeInterface | undefined> {
    const employee: EmployeeInterface | undefined = EMPLOYEES.find(
      (e: EmployeeInterface) => e.id == id
    );
    // TODO: add here message and to language json

    return of(employee);
  }

  updateEmployee(submittedEmployee: EmployeeInterface): void {
    const foundEmployee: EmployeeInterface | undefined = EMPLOYEES.find(
      (e: EmployeeInterface) => e.id === submittedEmployee.id
    );
    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
    } else {
      this.addNewEmployee(submittedEmployee);
    }
  }

  private addNewEmployee(submittedEmployee: EmployeeInterface): void {
    this.messageService.addByKeySynchronous(
      'messages.service.employee.add.new',
      {
        employee: submittedEmployee,
      }
    );
    EMPLOYEES.push({
      ...submittedEmployee,
      id: uuid(),
    });
  }

  private editEmployee(submittedEmployee: EmployeeInterface): void {
    const employeeIndex: number = EMPLOYEES.findIndex(
      (employee: EmployeeInterface): boolean =>
        employee.id === submittedEmployee.id
    );
    EMPLOYEES.splice(employeeIndex, 1, submittedEmployee);
  }
}
