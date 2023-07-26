export interface EmployeeInterface {
  id: string;
  name: string;
  surname: string;
  hireDate: string;
  skills?: string[];
  manager?: string;
  //TODO: manager?: Employee;
}

export class Employee implements EmployeeInterface {
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public hireDate: string,
    public skills?: string[],
    public manager?: string
  ) {}
}
