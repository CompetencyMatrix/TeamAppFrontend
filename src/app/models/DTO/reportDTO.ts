import { ProjectDTOInterface } from './projectDTO';
import { EmployeeDTOInterface } from './employeeDTO';
import { DateRange } from '../dateRange';

export interface ReportDTOInterface {
  employee: EmployeeDTOInterface;
  project: ProjectDTOInterface;
  dateRange: DateRange;
  hoursWorked: number;
}
