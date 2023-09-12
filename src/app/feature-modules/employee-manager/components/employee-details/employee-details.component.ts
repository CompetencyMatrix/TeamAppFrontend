import { Component, Input } from '@angular/core';
import { EmployeeInterface } from '../../../../core/models/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent {
  @Input() selectedEmployee?: EmployeeInterface;
  protected readonly Boolean = Boolean;
}
