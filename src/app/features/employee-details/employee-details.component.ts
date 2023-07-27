import { Component, Input } from '@angular/core';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { retry } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent {
  @Input() selectedEmployee?: EmployeeDTOInterface;
  protected readonly retry = retry;
}
