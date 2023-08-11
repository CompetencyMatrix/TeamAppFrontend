import { Injectable } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../../mocks/mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { v4 as uuid } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // TODO: move to some config file
  private employeesApiUrl = 'api/employees';
  httpOptions = {
    headers: new HttpHeaders({ 'Content=Type': 'application/json' }),
  };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {
    // // TODO: czy w serwisie w docelowej wersji tez pobieramy z backendu i przechowujemy u siebie kopię czy mamy tylko funkcje getEmployees() ktra daje komponentom dnae z backendu, ale w serwisie nie trzymamy zadnej skladowej employees
    // this._employees = this.getEmployees();
  }

  getEmployees(): Observable<EmployeeDTOInterface[]> {
    this.log('messages.service.employee.fetched.employees');
    return this.httpClient.get<EmployeeDTOInterface[]>(this.employeesApiUrl);
  }

  getEmployeeById(id: string): Observable<EmployeeDTOInterface | undefined> {
    const employee: EmployeeDTOInterface | undefined = EMPLOYEES.find(
      (e: EmployeeDTOInterface) => e.id == id
    );
    // TODO: add here message and to language json

    return of(employee);
  }

  addNewEmployee(
    submittedEmployee: EmployeeDTOInterface
  ): Observable<EmployeeDTOInterface> {
    // TODO: changed to Synchronus - should it stay like this and why?
    this.log('messages.service.employee.add.new', {
      employee: submittedEmployee,
    });
    console.log(submittedEmployee);
    return this.httpClient
      .post<EmployeeDTOInterface>(
        this.employeesApiUrl,
        submittedEmployee,
        this.httpOptions
      )
      .pipe(
        tap(_ =>
          // TODO: add here message and to language json
          this.log('messages.service.employee.added.employee')
        ),
        catchError(this.handleError<EmployeeDTOInterface>('addEmployee'))
      );
  }

  updateEmployee(submittedEmployee: EmployeeDTOInterface): Observable<any> {
    return this.httpClient
      .put(this.employeesApiUrl, submittedEmployee, this.httpOptions)
      .pipe(
        tap(_ =>
          // TODO: add here message and to language json
          this.log('messages.service.employee.update.employee', {
            id: submittedEmployee.id,
          })
        ),
        catchError(
          this.handleError<any>(`updateHero id=${submittedEmployee.id}`)
        )
      );
  }

  private log(messageKey: string, interpolateParams?: object | undefined) {
    this.messageService.addByKey(messageKey, interpolateParams);
    // this.messageService.addByKeySynchronous(messageKey, interpolateParams);
  }
}
