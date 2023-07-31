import { Injectable } from '@angular/core';
import { EmployeeDTOInterface } from '../../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../../mocks/mock-employees';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  getEmployees(): Observable<EmployeeDTOInterface[]> {
    const employees: Observable<EmployeeDTOInterface[]> = of(EMPLOYEES);
    return employees;
  }
}
