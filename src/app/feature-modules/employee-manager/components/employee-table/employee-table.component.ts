import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeInterface } from '../../../../core/models/employee';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent {
  @Input() employees: EmployeeInterface[] = [];
  @Input() skillsNames: string[] = [];
  selectedEmployee?: EmployeeInterface;
  skillsExpanded = false;
  skillsHovered = false;
  @Output() selectEmployeeEvent = new EventEmitter<EmployeeInterface>();
  @Output() deleteEmployeeEvent = new EventEmitter<EmployeeInterface>();
  baseColumnsToDisplay: string[] = [
    'name',
    'surname',
    'hireDate',
    'skills',
    'manager',
    'actions',
  ];
  displayedColumns: string[] = this.baseColumnsToDisplay.slice();

  // TODO: implement own DataSource
  employeesDataSource: MatTableDataSource<EmployeeInterface> =
    new MatTableDataSource(this.employees);

  onSelectEmployee(employee: EmployeeInterface): void {
    if (
      this.selectedEmployee === undefined ||
      this.selectedEmployee != employee
    ) {
      this.selectEmployee(employee);
    } else {
      this.unselectEmployee();
    }
  }

  onDeleteEmployee(employee: EmployeeInterface): void {
    this.deleteEmployeeEvent.emit(employee);
  }

  onExpandSkills(): void {
    this.displayedColumns = this.displayedColumns.reduce(
      (accumulator: string[], currentValue: string) => {
        if (currentValue !== 'skills') {
          accumulator.push(currentValue);
        } else {
          accumulator.push(...this.skillsNames);
        }
        return accumulator;
      },
      []
    );
    this.skillsExpanded = true;
  }

  onContractSkills(): void {
    this.displayedColumns = this.baseColumnsToDisplay.slice();
    this.skillsExpanded = false;
  }

  private unselectEmployee(): void {
    this.selectEmployee(undefined);
  }
  private selectEmployee(employee: EmployeeInterface | undefined): void {
    this.selectedEmployee = employee;
    this.selectEmployeeEvent.emit(this.selectedEmployee);
  }

  protected readonly console = console;
}
