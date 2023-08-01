import { Injectable } from '@angular/core';
import { EmployeeDTOInterface } from '../../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../../mocks/mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private messageService: MessageService) {}

  getEmployees(): Observable<EmployeeDTOInterface[]> {
    const employees: Observable<EmployeeDTOInterface[]> = of(EMPLOYEES);
    this.messageService.addByKey('messages.service.employee.fetched.employees');
    return employees;
  }
}
