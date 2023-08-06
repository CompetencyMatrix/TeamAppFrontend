import { Component, OnInit } from '@angular/core';
import { EmployeeDTOInterface } from '../../../models/DTO/employeeDTO';
import { v4 as uuid } from 'uuid';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { ProjectDTOInterface } from '../../../models/DTO/projectDTO';
import { MessageService } from '../../../core/services/message/message.service';
import { SkillService } from '../../../core/services/skill/skill.service';
import { ProjectService } from '../../../core/services/project/project.service';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss'],
})
export class EmployeeManagerComponent implements OnInit {
  allEmployees: EmployeeDTOInterface[] = [];
  otherEmployees: EmployeeDTOInterface[] = [];
  selectedEmployee?: EmployeeDTOInterface;
  skills: string[] = [];
  projects: ProjectDTOInterface[] = [];

  ngOnInit(): void {
    this.getAllEmployees();
    this.setOtherEmployees();
    this.getSkills();
    this.getProjects();
  }

  constructor(
    private employeeService: EmployeeService,
    private skillService: SkillService,
    private projectService: ProjectService,
    private messageService: MessageService
  ) {}

  selectEmployee(newEmployee: EmployeeDTOInterface | undefined): void {
    if (newEmployee === undefined) {
    } else {
      this.messageService.addByKey('messages.service.employee.select', {
        employee: newEmployee,
      });
    }
    this.selectedEmployee = newEmployee;
    this.setOtherEmployees();
  }
  // TODO: 3 below functions: to be moved to service, once it can really update the list -now its not stored in service anyhow - just returned in the getEmployees() call
  updateEmployeesList(submittedEmployee: EmployeeDTOInterface): void {
    const foundEmployee: EmployeeDTOInterface | undefined =
      this.allEmployees.find(
        (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
      );

    if (foundEmployee) {
      this.editEmployee(submittedEmployee);
    } else {
      this.addNewEmployee(submittedEmployee);
    }
    this.selectedEmployee = undefined;
  }

  private addNewEmployee(submittedEmployee: EmployeeDTOInterface): void {
    // TODO: changed to Synchronus - should it stay like this and why?
    this.messageService.addByKeySynchronus(
      'messages.service.employee.add.new',
      {
        employee: submittedEmployee,
      }
    );
    this.allEmployees.push({
      ...submittedEmployee,
      // TODO: ID: to be set in database
      id: uuid(),
    });
  }
  private editEmployee(submittedEmployee: EmployeeDTOInterface): void {
    this.messageService.addByKey('messages.service.employee.edit', {
      employee: submittedEmployee,
    });
    const foundEmployee = this.allEmployees.find(
      (e: EmployeeDTOInterface) => e.id === submittedEmployee.id
    );
    if (foundEmployee) {
      this.allEmployees.splice(
        this.allEmployees.indexOf(foundEmployee),
        1,
        submittedEmployee
      );
    }
  }

  private setOtherEmployees(): void {
    if (this.allEmployees === undefined) {
      this.otherEmployees = [];
    } else {
      if (this.selectedEmployee === undefined) {
        this.otherEmployees = this.allEmployees;
      }
      this.otherEmployees = this.allEmployees.filter(
        (e: EmployeeDTOInterface) => e.id != this.selectedEmployee?.id
      );
    }
  }

  private getAllEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe(
        (employees: EmployeeDTOInterface[]) => (this.allEmployees = employees)
      );
  }

  private getProjects(): void {
    this.projectService
      .getProjects()
      .subscribe(
        (projects: ProjectDTOInterface[]) => (this.projects = projects)
      );
  }

  private getSkills(): void {
    this.skillService
      .getSkills()
      .subscribe((skills: string[]) => (this.skills = skills));
  }
}
