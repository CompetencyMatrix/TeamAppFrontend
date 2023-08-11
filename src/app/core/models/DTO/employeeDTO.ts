import { ProjectDTOInterface } from './projectDTO';

export interface EmployeeDTOInterface {
  id: string;
  name: string;
  surname: string;
  avatarUrl?: string;
  hireDate: Date;
  skills?: string[];
  projects: ProjectDTOInterface[];
  manager?: string;
}