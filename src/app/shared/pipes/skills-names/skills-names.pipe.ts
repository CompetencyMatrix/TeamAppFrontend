import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeSkillInterface } from '../../../core/models/employeeSkill';

@Pipe({
  name: 'skillsNames',
})
export class SkillsNamesPipe implements PipeTransform {
  transform(skills: EmployeeSkillInterface[]): string[] {
    return skills.map((skill: EmployeeSkillInterface) => skill.name);
  }
}
