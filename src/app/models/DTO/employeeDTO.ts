import { ProjectDTOInterface } from './projectDTO';

export interface EmployeeDTOInterface {
  id: string;
  name: string;
  surname: string;
  hireDate: Date;
  skills?: string[];
  projects: ProjectDTOInterface[];
  manager?: string;
}
