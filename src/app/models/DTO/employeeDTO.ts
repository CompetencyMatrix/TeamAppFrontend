export interface EmployeeDTOInterface {
  id: string;
  name: string;
  surname: string;
  hireDate: Date;
  skills?: string[];
  manager?: string;
}
