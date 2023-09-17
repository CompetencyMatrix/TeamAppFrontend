import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EmployeeInterface } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { MessageService } from '../../core/services/message/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SkillService } from '../../core/services/skill/skill.service';
import { ProficiencyLevel } from '../../core/enums/proficiency-level-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss'],
})
export class EmployeeManagerComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  allEmployees: EmployeeInterface[] = [];
  allSkills: string[] = [];
  selectedEmployee?: EmployeeInterface;

  ngOnInit(): void {
    this.getData();
  }

  constructor(
    private employeeService: EmployeeService,
    private skillService: SkillService,
    private messageService: MessageService,
    private readonly router: Router
  ) {}

  unselectEmployee(): void {
    this.selectEmployee(undefined);
  }
  selectEmployee(newEmployee: EmployeeInterface | undefined): void {
    if (newEmployee === undefined) {
      //   TODO: throw exception
    } else {
      this.messageService.addByKey('messages.service.employee.select', {
        employee: newEmployee,
      });
    }
    this.selectedEmployee = newEmployee;
  }

  editEmployee(employeeToEdit: EmployeeInterface): void {
    this.router.navigate(['/employee/' + employeeToEdit.id]);
  }

  deleteEmployee(employeeToDelete: EmployeeInterface): void {
    this.employeeService
      .deleteEmployee(employeeToDelete.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(_ => {
        this.allEmployees = this.allEmployees.filter(
          (employee: EmployeeInterface) => employee !== employeeToDelete
        );
      });
  }

  private getAllEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (employees: EmployeeInterface[]) => (this.allEmployees = employees)
      );
  }

  public getPossibleLevelsNamesReversedCopy(): (ProficiencyLevel | string)[] {
    return [...this.skillService.getPossibleLevelsNames()].reverse();
  }

  private getAllSkills(): void {
    this.skillService
      .getSkills()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((skills: string[]) => (this.allSkills = skills));
  }

  private getData(): void {
    this.getAllSkills();
    this.getAllEmployees();
  }
}
