export interface EmployeeDTOInterface {
  id: string;
  name: string;
  surname: string;
  hireDate: string;
  skills?: string[];
  manager?: string;
  //TODO: manager?: Employee; add projects
}
