import { ReportDTOInterface } from '../models/DTO/reportDTO';
import { PROJECTS } from './mock-projects';
import { EMPLOYEES } from './mock-employees';
import { DateRange } from '../models/dateRange';

export const REPORTS: ReportDTOInterface[] = [
  {
    project: PROJECTS[0],
    employee: EMPLOYEES[0],
    hoursWorked: 20,
    dateRange: new DateRange(new Date(2001, 0, 1), new Date(2001, 1, 1)),
  },
];
