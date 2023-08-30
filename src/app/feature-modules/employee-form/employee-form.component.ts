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
  allProjects: ProjectInterface[] = [];
  allSkills: EmployeeSkillInterface[] = [];
  private pathEmployeeId: string | null = null;

  employeeForm: FormGroup;
  destroyRef: DestroyRef = inject(DestroyRef);
  announcer: LiveAnnouncer = inject(LiveAnnouncer);

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
  }

  ngOnChanges(): void {
    //TODO: rethink - how often do we need to get data - how to react to different lifecycle events
    this.getInitialData();
  }

  onSubmit(): void {
    // Check in case submit button 'disabled' attribute was changed manually
    if (this.employeeForm.valid) {
      if (this.isAddingNewEmployee()) {
        this.addEmployee(this.getFormData());
      } else {
        this.updateEmployee(this.getFormData());
      }
      // this.employeeForm.reset();
      this.goBack();
      this.openSnackBar('Form submitted successfully', 'Ok');
    }
  }

  onResetForm(): void {
    this.initializeForm();
  }

  fetchEmployeeToForm(): void {
    // TODO: this.isAddingNewEmployee() but then in 'else' block compiler is not aware that pathEmployeeId is never null -> can i use 'pathEmployeeId!' in such cases or is it still bad pracitce even though code would be more understandable imo
    if (this.pathEmployeeId === null || this.pathEmployeeId === 'new') {
      this.employeeToEdit = undefined;
    } else {
      this.employeeService
        .getEmployeeById(this.pathEmployeeId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((employee: EmployeeInterface | undefined) => {
          this.employeeToEdit = employee;
          this.initializeForm();
        });
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
      .subscribe(
        (projects: ProjectInterface[]) => (this.allProjects = projects)
      );
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

  private getOtherEmployees(): void {
    if (this.employeeToEdit === undefined) {
      this.employeeService
        .getEmployees()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(
          (employees: EmployeeInterface[]) => (this.otherEmployees = employees)
        );
    } else {
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
    if (this.employeeToEdit != undefined) {
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
    this.getEmployeeId();
    this.fetchEmployeeToForm();
    this.getOtherEmployees();
    this.getSkills();
    this.getProjects();
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
    this.pathEmployeeId = this.route.snapshot.paramMap.get('id');
  }

  private isAddingNewEmployee(): boolean {
    //TODO: move to config - 'add_employee-_id_indicator'
    return this.pathEmployeeId === 'new';
  }
}
