import { ProficiencyLevel } from '../enums/proficiency-level-enum';

export interface EmployeeSkillInterface {
  skill: string;
  proficiency: ProficiencyLevel;
}
