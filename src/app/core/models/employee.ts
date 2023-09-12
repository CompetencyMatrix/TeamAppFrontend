import { ProjectInterface } from './project';
import { EmployeeSkillInterface } from './employeeSkill';

export interface EmployeeInterface {
  id: string;
  name: string;
  surname: string;
  hireDate: Date;
  skills: EmployeeSkillInterface[];
  projects: ProjectInterface[];
  manager?: string;
}
