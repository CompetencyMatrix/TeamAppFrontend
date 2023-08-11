import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PROJECTS } from './mocks/mock-projects';
import { EmployeeDTOInterface } from './models/DTO/employeeDTO';
import { EMPLOYEES } from './mocks/mock-employees';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: EmployeeDTOInterface[] = EMPLOYEES;
    return { employees };
  }

  genId(employees: EmployeeDTOInterface[]): string {
    return uuid();
  }
}