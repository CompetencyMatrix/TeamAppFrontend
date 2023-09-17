import {
  Component,
  DestroyRef,
  inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
import { map, Observable, of, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProficiencyLevel } from '../../core/enums/proficiency-level-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillInterface } from '../../core/models/skill';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  employeeToEdit?: EmployeeInterface;
  otherEmployees: EmployeeInterface[] = [];
  filteredOtherEmployees: Observable<EmployeeInterface[]>;
  projects: ProjectInterface[] = [];
  allSkills: EmployeeSkillInterface[] = [];

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
    this.filteredOtherEmployees = this.getInitialFilteredOtherEmployees();
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
        (skills: SkillInterface[]) =>
          (this.allSkills = skills.map((skill: SkillInterface) => {
            return {
              skill: skill,
              proficiency: ProficiencyLevel.JUNIOR,
            } as EmployeeSkillInterface;
          }))
      );
  }
  public getPossibleLevelsNames(): (ProficiencyLevel | string)[] {
    return this.skillService.getPossibleLevelsNames();
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
    this.getEmployee();
    console.log('INITIALIZE FORM WITH: ' + JSON.stringify(this.employeeToEdit));
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

  private getInitialFilteredOtherEmployees(): Observable<EmployeeInterface[]> {
    const managerControl: AbstractControl | null =
      this.employeeForm.get('manager');

    return managerControl === null
      ? of([])
      : managerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterManagerByName(value || ''))
        );
  }

  private _filterManagerByName(value: string): EmployeeInterface[] {
    const filterValue: string = value.toLowerCase();

    return this.otherEmployees.filter((employee: EmployeeInterface) =>
      employee.name.toLowerCase().includes(filterValue)
    );
  }

  public managerAutocompleteDisplayFunction(managerId: string): string {
    const foundEmployee: EmployeeInterface | undefined =
      this.otherEmployees.find(
        (employee: EmployeeInterface) => employee.id === managerId
      );
    return foundEmployee === undefined ? '' : foundEmployee.name;
  }

  public managerAutocompleteDisplayFunctionWrapper() {
    return (managerId: string) =>
      this.managerAutocompleteDisplayFunction(managerId);
  }
}
