import { EmployeeDTOInterface } from './employeeDTO';

// TODO: docelowo to bedzie wyswietlane w tabeli, dane obliczane i pobierane z backendu w razie potrzeby wyswietlenia tabeli
export interface EmployeeStatisticsDTOInterface {
  employee: EmployeeDTOInterface;
  totalHoursWorked: number;
  hoursWorkedPerProject: { ProjectDTOInterface: number }[];
}
