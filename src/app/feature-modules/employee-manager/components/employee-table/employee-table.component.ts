import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeInterface } from '../../../../core/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { ProficiencyLevel } from '../../../../core/enums/proficiency-level-enum';
import { EmployeeSkillInterface } from '../../../../core/models/employeeSkill';
import { SkillInterface } from '../../../../core/models/skill';

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
    'managerId',
    'actions',
  ];
  displayedColumns: string[] = this.baseColumnsToDisplay.slice();

  constructor() {}
  // TODO: implement own DataSource
  employeesDataSource: MatTableDataSource<EmployeeInterface> =
    new MatTableDataSource(this.employees);

  getEmployeeSkillsNames(employee: EmployeeInterface): string[] {
    return employee.skills.map(
      (skill: EmployeeSkillInterface) => skill.skill.name
    );
  }

  getEmployeeById(id: string): EmployeeInterface | undefined {
    return this.employees.find(
      (employee: EmployeeInterface) => employee.id == id
    );
  }

  getSkillLevel(
    employee: EmployeeInterface,
    skillName: string
  ): ProficiencyLevel | undefined {
    const skill: EmployeeSkillInterface | undefined = employee.skills.find(
      (skill: EmployeeSkillInterface) => skill.skill.name === skillName
    );
    return skill ? skill.level : undefined;
  }

  onSelectEmployee(employee: EmployeeInterface): void {
    this.selectEmployee(employee);
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
