import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeSkillInterface } from '../../../core/models/employeeSkill';

@Pipe({
  name: 'skillLevel',
})
export class SkillLevelPipe implements PipeTransform {
  transform(
    skills: EmployeeSkillInterface[],
    name: string
  ): number | undefined {
    const skill: EmployeeSkillInterface | undefined = skills.find(
      (skill: EmployeeSkillInterface) => skill.name === name
    );
    return skill ? skill.proficiency : undefined;
  }
}
