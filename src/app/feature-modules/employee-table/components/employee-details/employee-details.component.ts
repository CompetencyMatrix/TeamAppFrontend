import { Component, Input } from '@angular/core';
import { EmployeeDTOInterface } from '../../../../models/DTO/employeeDTO';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent {
  @Input() selectedEmployee?: EmployeeDTOInterface;
  protected readonly Boolean = Boolean;
}
