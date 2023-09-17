import { Component, Input, OnInit } from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee';
import { ProficiencyLevel } from '../../../core/enums/proficiency-level-enum';
import { EmployeeSkillInterface } from '../../../core/models/employeeSkill';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() selectedEmployee?: EmployeeInterface;
  @Input() possibleSkillLevelsNames: (string | ProficiencyLevel)[] = [];
  public skillNamesByLevelMap: Map<ProficiencyLevel, string[]> = new Map();

  ngOnInit(): void {
    this.skillNamesByLevelMap = this.createSkillsNamesByLevel();
  }

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

  createSkillsNamesByLevel(): Map<ProficiencyLevel, string[]> {
    const skillNamesByLevelMap: Map<ProficiencyLevel, string[]> = new Map();
    this.possibleSkillLevelsNames.forEach(
      (skillName: string | ProficiencyLevel) => {
        skillNamesByLevelMap.set(
          this.getProficiencyLevel(skillName),
          this.selectedEmployee
            ? this.selectedEmployee.skills
                .filter(
                  (skill: EmployeeSkillInterface) =>
                    skill.proficiency == this.getProficiencyLevel(skillName)
                )
                .map((skill: EmployeeSkillInterface) => skill.name)
            : []
        );
      }
    );
    return skillNamesByLevelMap;
  }
}
