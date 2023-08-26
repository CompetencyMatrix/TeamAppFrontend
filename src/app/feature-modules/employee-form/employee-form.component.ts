import {
  Component,
  DestroyRef,
  inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeInterface } from '../../core/models/employee';
import { ProjectInterface } from '../../core/models/project';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { Location } from '@angular/common';
import { SkillService } from '../../core/services/skill/skill.service';
import { ProjectService } from '../../core/services/project/project.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  destroyRef: DestroyRef = inject(DestroyRef);
  employeeToEdit?: EmployeeInterface;
  otherEmployees: EmployeeInterface[] = [];
  skills: string[] = [];
  projects: ProjectInterface[] = [];
  private employeeId: string | null = null;

  // TODO: czy nie powinien byc private i do tego setter i getter?
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private skillService: SkillService,
    private projectService: ProjectService,
    private location: Location
  ) {
    this.employeeForm = this.buildForm();
  }

  ngOnInit(): void {
    this.getEmployeeId();
    this.getEmployee();
    this.getOtherEmployees();
    this.getSkills();
    this.getProjects();
    this.employeeForm = this.buildForm();
    this.initializeForm();
  }

  ngOnChanges(): void {
    this.getEmployee();
    this.initializeForm();
  }

  onSubmit(): void {
    // Check in case submit button 'disbaled' attribute was changed manually
    if (this.employeeForm.valid) {
      if (this.isAddingNewEmployee()) {
        this.addEmployee(this.getFormData());
      } else {
        this.updateEmployee(this.getFormData());
      }
      // this.employeeForm.reset();
      this.goBack();
    }
  }

  onResetForm(): void {
    this.initializeForm();
  }

  protected readonly Boolean = Boolean;

  getEmployee(): void {
    // TODO: this.isAddingNewEmployee() but then in 'else' block compiler is not aware that employeeId is never null -> can i use 'employeeId!' in such cases or is it still bad pracitce even though code would be more understandable imo
    if (this.employeeId == null) {
      this.employeeToEdit = undefined;
    } else {
      this.employeeService
        .getEmployeeById(this.employeeId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(
          (employee: EmployeeInterface | undefined) =>
            (this.employeeToEdit = employee)
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getProjects(): void {
    this.projectService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((projects: ProjectInterface[]) => (this.projects = projects));
  }

  private getSkills(): void {
    this.skillService
      .getSkills()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((skills: string[]) => (this.skills = skills));
  }

  //TODO: rewrite
  private getOtherEmployees(): void {
    if (this.employeeToEdit === undefined) {
      this.employeeService
        .getEmployees()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(
          (employees: EmployeeInterface[]) => (this.otherEmployees = employees)
        );
    }
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (employees: EmployeeInterface[]) =>
          (this.otherEmployees = employees.filter(
            (e: EmployeeInterface) => e.id != this.employeeToEdit?.id
          ))
      );
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      hireDate: '',
      skills: this.formBuilder.group({ name: [''], proficiency: [''] }),
      projects: [[]],
      manager: [''],
    });
  }

  private initializeForm(): void {
    if (this.employeeToEdit) {
      this.employeeForm.patchValue(this.employeeToEdit);
    } else {
      this.employeeForm.reset();
    }
    // this.employeeForm.patchValue({
    //   ...this.employeeToEdit,
    //   hireDate: this.employeeToEdit?.hireDate.toISOString().slice(0, 10),
    // });
  }

  private updateEmployee(employeeToUpdate: EmployeeInterface): void {
    this.employeeService
      .updateEmployee(employeeToUpdate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private addEmployee(employeeToAdd: EmployeeInterface): void {
    this.employeeService
      .addNewEmployee(employeeToAdd)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private getFormData(): EmployeeInterface {
    return {
      ...this.employeeForm.getRawValue(),
      hireDate: new Date(this.employeeForm.value['hireDate']),
    };
  }

  private getEmployeeId(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
  }

  private isAddingNewEmployee(): boolean {
    return this.employeeId == null;
  }
}
