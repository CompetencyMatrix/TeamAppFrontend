import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeInterface } from '../../../../core/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { ProficiencyLevel } from '../../../../core/enums/proficiency-level-enum';
import { EmployeeSkillInterface } from '../../../../core/models/employeeSkill';

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

  constructor() {}
  // TODO: implement own DataSource
  employeesDataSource: MatTableDataSource<EmployeeInterface> =
    new MatTableDataSource(this.employees);

  getEmployeeSkillsNames(employee: EmployeeInterface): string[] {
    return employee.skills.map((skill: EmployeeSkillInterface) => skill.name);
  }

  getSkillLevel(
    employee: EmployeeInterface,
    skillName: string
  ): ProficiencyLevel | undefined {
    const skill: EmployeeSkillInterface | undefined = employee.skills.find(
      (skill: EmployeeSkillInterface) => skill.name === skillName
    );
    return skill ? skill.proficiency : undefined;
  }

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
          accumulator.push(...this.getSkillNamesInOrder());
        }
        return accumulator;
      },
      []
    );
    this.skillsExpanded = true;
    this.skillsHovered = false;
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

  private getSkillNamesInOrder(): string[] {
    return this.skillsNames.sort((name_1: string, name_2: string) =>
      name_1.toLowerCase().localeCompare(name_2.toLowerCase())
    );
  }
}
