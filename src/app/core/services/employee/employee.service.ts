import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { EmployeeInterface } from '../../models/employee';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // TODO: move to some config file
  private employeesApiUrl = `${environment.apiBaseUrl}/employees`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {
    // // TODO: czy w serwisie w docelowej wersji tez pobieramy z backendu i przechowujemy u siebie kopię czy mamy tylko funkcje getEmployees() ktra daje komponentom dnae z backendu, ale w serwisie nie trzymamy zadnej skladowej employees
    // this._employees = this.getEmployees();
  }

  getEmployees(): Observable<EmployeeInterface[]> {
    return this.httpClient.get<EmployeeInterface[]>(this.employeesApiUrl).pipe(
      tap(_ => this.log('messages.service.employee.fetched.employees')),
      catchError(this.handleError<EmployeeInterface[]>('getEmployees', []))
    );
  }

  getEmployeeById(id: string): Observable<EmployeeInterface> {
    const employeeUrl = `${this.employeesApiUrl}/${id}`;
    return this.httpClient.get<EmployeeInterface>(employeeUrl).pipe(
      tap(_ =>
        // TODO: add here message and to language json
        this.log('messages.service.employee.fetched.employee', { id: id })
      ),
      catchError(
        this.handleError<EmployeeInterface>(`getEmployeeById id=${id}`)
      )
    );
  }

  addNewEmployee(
    submittedEmployee: EmployeeInterface
  ): Observable<EmployeeInterface> {
    // TODO: changed to Synchronus - should it stay like this and why?
    this.log('messages.service.employee.add.new', {
      employee: submittedEmployee,
    });
    return this.httpClient
      .post<EmployeeInterface>(
        this.employeesApiUrl,
        submittedEmployee,
        this.httpOptions
      )
      .pipe(
        tap(_ =>
          // TODO: add here message and to language json
          this.log('messages.service.employee.added.employee')
        ),
        catchError(this.handleError<EmployeeInterface>('addEmployee'))
      );
  }

  updateEmployee(submittedEmployee: EmployeeInterface): Observable<any> {
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
          this.handleError<any>(`updateEmployee id=${submittedEmployee.id}`)
        )
      );
  }

  deleteEmployee(id: string): Observable<EmployeeInterface> {
    const employeeUrl = `${this.employeesApiUrl}/${id}`;

    return this.httpClient
      .delete<EmployeeInterface>(employeeUrl, this.httpOptions)
      .pipe(
        tap(_ =>
          // TODO: add here message and to language json
          this.log('messages.service.employee.delete.employee', {
            id: id,
          })
        ),
        catchError(
          this.handleError<EmployeeInterface>(`deleteEmployee id=${id}`)
        )
      );
  }

  private log(messageKey: string, interpolateParams?: object | undefined) {
    this.messageService.addByKey(messageKey, interpolateParams);
    // this.messageService.addByKeySynchronous(messageKey, interpolateParams);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: Add translate module
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
