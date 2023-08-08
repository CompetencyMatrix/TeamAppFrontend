import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDTOInterface } from '../../../models/DTO/employeeDTO';
import { ProjectDTOInterface } from '../../../models/DTO/projectDTO';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Location } from '@angular/common';
import { SkillService } from '../../../core/services/skill/skill.service';
import { ProjectService } from '../../../core/services/project/project.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
// TODO: I wasn't sure if this component should be smart or dumb - it is the only one that needs skills and projects, but in future other ones may need them also so maybe its best to pass them from the main - manager component - as it is done now (they used to be set here from mocks without input)
export class EmployeeFormComponent implements OnInit, OnChanges {
  employeeToEdit?: EmployeeDTOInterface;
  otherEmployees: EmployeeDTOInterface[] = [];
  skills: string[] = [];
  projects: ProjectDTOInterface[] = [];

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
    this.getOtherEmployees();
    this.getSkills();
    this.getProjects();
    //   TODO: dodaj tutaj patchValue i inicjalne wartosci
    this.employeeForm = this.buildForm();
  }

  ngOnChanges(): void {
    if (this.employeeToEdit) {
      this.employeeForm.patchValue({
        ...this.employeeToEdit,
        hireDate: this.employeeToEdit.hireDate.toISOString().slice(0, 10),
      });
    } else {
      this.employeeForm.reset();
    }
  }

  buildForm(): FormGroup {
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
      avatarUrl: ['../../../assets/img/avatar-default.jpg'],
      skills: [[]],
      projects: [[]],
      manager: [''],
    });
  }

  updateEmployee(employeeToUpdate: EmployeeDTOInterface): void {
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
      this.location.back();
    }
  }
  onResetForm(): void {
    if (this.employeeToEdit) {
      this.employeeForm.patchValue({
        ...this.employeeToEdit,
        hireDate: this.employeeToEdit.hireDate.toISOString().slice(0, 10),
      });
    } else {
      this.employeeForm.reset();
    }
  }

  protected readonly Boolean = Boolean;

  getEmployee(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      this.employeeToEdit = undefined;
    } else {
      this.employeeService
        .getEmployeeById(id)
        .subscribe(employee => (this.employeeToEdit = employee));
    }
  }

  goBack(): void {
    this.location.back();
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

  //TODO: rewrite
  private getOtherEmployees(): void {
    if (this.employeeToEdit === undefined) {
      this.employeeService
        .getEmployees()
        .subscribe(
          (employees: EmployeeDTOInterface[]) =>
            (this.otherEmployees = employees)
        );
    }
    this.employeeService
      .getEmployees()
      .subscribe(
        (employees: EmployeeDTOInterface[]) =>
          (this.otherEmployees = employees.filter(
            (e: EmployeeDTOInterface) => e.id != this.employeeToEdit?.id
          ))
      );
  }
}
