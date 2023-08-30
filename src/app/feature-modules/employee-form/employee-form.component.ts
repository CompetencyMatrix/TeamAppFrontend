import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeInterface } from '../../core/models/employee';
import { ProjectInterface } from '../../core/models/project';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { Location } from '@angular/common';
import { SkillService } from '../../core/services/skill/skill.service';
import { ProjectService } from '../../core/services/project/project.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmployeeSkillInterface } from '../../core/models/employeeSkill';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProficiencyLevel } from '../../core/enums/proficiency-level-enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  employeeToEdit?: EmployeeInterface;
  otherEmployees: EmployeeInterface[] = [];
  projects: ProjectInterface[] = [];
  allSkills: EmployeeSkillInterface[] = [];

  employeeForm: FormGroup;
  destroyRef: DestroyRef = inject(DestroyRef);
  announcer = inject(LiveAnnouncer);
  // TODO: dodaj ten banner z info ze sie udalo dodac

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private skillService: SkillService,
    private projectService: ProjectService,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
    this.employeeForm = this.buildForm();
  }

  ngOnInit(): void {
    this.getInitialData();
    this.initializeForm();
  }

  ngOnChanges(): void {
    this.initializeForm();
  }

  updateEmployee(employeeToUpdate: EmployeeInterface): void {
    this.employeeService.updateEmployee(employeeToUpdate);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    // Check in case submit button 'disbaled' attribute was changed manually
    if (this.employeeForm.valid) {
      this.updateEmployee({
        ...this.employeeForm.getRawValue(),
        hireDate: new Date(this.employeeForm.value['hireDate']),
      });
      // this.employeeForm.reset();
      this.goBack();
      this.openSnackBar('Form submitted successfully', 'Ok');
    }
  }
  onResetForm(): void {
    console.log(this.employeeToEdit);
    this.initializeForm();
  }

  getEmployee(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      this.employeeToEdit = undefined;
    } else {
      this.employeeService
        .getEmployeeById(id)
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

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
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
      .subscribe(
        (skills: string[]) =>
          (this.allSkills = skills.map((skillName: string) => {
            return { name: skillName, proficiency: ProficiencyLevel.JUNIOR };
          }))
      );
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
      skills: [[]],
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

  private getInitialData(): void {
    this.getEmployee();
    this.getOtherEmployees();
    this.getSkills();
    this.getProjects();
  }
}
