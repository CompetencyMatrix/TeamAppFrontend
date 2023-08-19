import { SkillDTOInterface } from './skillDTO';
import { EmployeeDTOInterface } from './employeeDTO';

export interface EmployeeSkillDTOInterface {
  employee: EmployeeDTOInterface;
  skill: SkillDTOInterface;
  proficiency: number;
  interest: number;
}
