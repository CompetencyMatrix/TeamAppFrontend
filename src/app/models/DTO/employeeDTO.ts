import { ProjectDTO } from './projectDTO';

export interface EmployeeDTOInterface {
  id: string;
  name: string;
  surname: string;
  hireDate: Date;
  skills?: string[];
  projects: ProjectDTO[];
  manager?: string;
}
