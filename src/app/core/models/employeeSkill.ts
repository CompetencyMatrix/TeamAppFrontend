import { ProficiencyLevel } from '../enums/proficiency-level-enum';
import { SkillInterface } from './skill';

export interface EmployeeSkillInterface {
  skill: SkillInterface;
  level: ProficiencyLevel;
}
