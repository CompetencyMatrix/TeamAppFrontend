import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EMPLOYEES } from './mocks/mock-employees';
import { EmployeeInterface } from './core/models/employee';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: EmployeeInterface[] = EMPLOYEES;
    return { employees };
  }

  genId(employees: EmployeeInterface[]): string {
    return uuid();
  }
}
