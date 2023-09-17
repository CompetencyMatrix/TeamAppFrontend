import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() unselectEmployeeEvent = new EventEmitter<void>();
  @Output() editEmployeeEvent = new EventEmitter<EmployeeInterface>();

  public skillNamesByLevelMap: Map<ProficiencyLevel, string[]> = new Map();

  ngOnInit(): void {
    this.skillNamesByLevelMap = this.createSkillsNamesByLevel();
  }

  public onExitDetails(): void {
    this.selectedEmployee = undefined;
    this.unselectEmployeeEvent.emit();
  }

  public onEditEmployee(): void {
    this.editEmployeeEvent.emit(this.selectedEmployee);
  }
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
                  (skill: EmployeeSkillInterface) => skill.level === skillName
                )
                .map((skill: EmployeeSkillInterface) => skill.skill.name)
            : []
        );
      }
    );
    console.log(JSON.stringify('skillNamesByLevelMap'));
    console.log(JSON.stringify(skillNamesByLevelMap));
    console.log(JSON.stringify('possibleSkillLevelsNames'));
    console.log(JSON.stringify(this.possibleSkillLevelsNames));
    console.log(JSON.stringify(this.selectedEmployee?.skills[0].level));
    return skillNamesByLevelMap;
  }
}
