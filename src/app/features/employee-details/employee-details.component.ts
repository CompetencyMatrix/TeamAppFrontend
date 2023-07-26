import { Component, Input } from '@angular/core';
import { EmployeeInterface } from '../../models/employee';
import { EmployeesListComponent } from '../employees-list/employees-list.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent {
  @Input() selectedEmployee?: EmployeeInterface;
}
