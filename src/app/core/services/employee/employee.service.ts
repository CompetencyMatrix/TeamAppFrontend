import { Injectable } from '@angular/core';
import { EmployeeDTOInterface } from '../../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../../mocks/mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private messageService: MessageService) {
    // // TODO: czy w serwisie w docelowej wersji tez pobieramy z backendu i przechowujemy u siebie kopię czy mamy tylko funkcje getEmployees() ktra daje komponentom dnae z backendu, ale w serwisie nie trzymamy zadnej skladowej employees
    // this._employees = this.getEmployees();
  }

  getEmployees(): Observable<EmployeeDTOInterface[]> {
    const employees: Observable<EmployeeDTOInterface[]> = of(EMPLOYEES);
    this.messageService.addByKey('messages.service.employee.fetched.employees');
    return employees;
  }

  getEmployeeById(id: string): Observable<EmployeeDTOInterface | undefined> {
    const employee: EmployeeDTOInterface | undefined = EMPLOYEES.find(
      (e: EmployeeDTOInterface) => e.id == id
    );
    // TODO: add here message and to language json

    return of(employee);
  }

  updateEmployee(submittedEmployee: EmployeeDTOInterface): void {
    const foundEmployee: EmployeeDTOInterface | undefined = EMPLOYEES.find(
      (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
    );
    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
    } else {
      this.addNewEmployee(submittedEmployee);
    }
  }

  private addNewEmployee(submittedEmployee: EmployeeDTOInterface): void {
    // TODO: changed to Synchronus - should it stay like this and why?
    this.messageService.addByKeySynchronous(
      'messages.service.employee.add.new',
      {
        employee: submittedEmployee,
      }
    );
    EMPLOYEES.push({
      ...submittedEmployee,
      // TODO: ID: to be set in database
      id: uuid(),
    });
  }

  private editEmployee(submittedEmployee: EmployeeDTOInterface): void {
    const employeeIndex: number = EMPLOYEES.findIndex(
      (employee: EmployeeDTOInterface): boolean =>
        employee.id === submittedEmployee.id
    );
    EMPLOYEES.splice(employeeIndex, 1, submittedEmployee);
  }
}
