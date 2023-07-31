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
// TODO: ask
//
// export class EmployeeDTO implements EmployeeDTOInterface {
//   hireDate: Date;
//   id: string;
//   manager: string;
//   name: string;
//   projects: ProjectDTOInterface[];
//   skills: string[];
//   surname: string;
//
//   describe(): string {
//     return [this.name, this.surname].filter(Boolean).join(' ');
//   }
//
//   constructor(
//     hireDate: Date,
//     id: string,
//     manager: string,
//     name: string,
//     projects: ProjectDTOInterface[],
//     skills: string[],
//     surname: string
//   ) {
//     this.hireDate = hireDate;
//     this.id = id;
//     this.manager = manager;
//     this.name = name;
//     this.projects = projects;
//     this.skills = skills;
//     this.surname = surname;
//   }
// }
