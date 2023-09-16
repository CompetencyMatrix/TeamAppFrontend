import { Component, Input, Output } from '@angular/core';
import { EmployeeInterface } from '../../../../core/models/employee';
import { ProficiencyLevel } from '../../../../core/enums/proficiency-level-enum';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent {
  @Input() selectedEmployee?: EmployeeInterface;
  @Input() possibleSkillLevelsNames: (string | ProficiencyLevel)[] = [];
  protected readonly Boolean = Boolean;

  public onExitDetails(): void {
    this.selectedEmployee = undefined;
  }
  //
  // public onEditEmployee(): void {
  //   this.selectedEmployee = undefined;
  // }
  getProficiencyLevel(level: string | ProficiencyLevel): ProficiencyLevel {
    return typeof level === 'string' ? (<any>ProficiencyLevel)[level] : level;
  }
}
