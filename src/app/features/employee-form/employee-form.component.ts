import {
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../mocks/mock-employees';
import { SKILLS } from '../../mocks/mock-skills';
import { PROJECTS } from '../../mocks/mock-projects';
import { ProjectDTOInterface } from '../../models/DTO/projectDTO';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() editedEmployee?: EmployeeDTOInterface;
  @Output() editEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  skills: string[] = this.getSkills();
  projects: ProjectDTOInterface[] = this.getProjects();
  otherEmployees: EmployeeDTOInterface[] = [];
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
    this.employeeForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      surname: [''],
      hireDate: [''],
      skills: [''],
      projects: [''],
      manager: [''],
    });
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  setLanguage(value: string): void {
    this.translate.use(value);
  }

  ngOnInit(): void {
    this.otherEmployees = this.getOtherEmployees();
    if (this.editedEmployee) {
      this.employeeForm.patchValue(this.editedEmployee);
    }
  }

  ngOnChanges(): void {
    this.otherEmployees = this.getOtherEmployees();
    if (this.editedEmployee) {
      this.employeeForm.patchValue({
        ...this.editedEmployee,
        hireDate: this.editedEmployee.hireDate.toISOString().slice(0, 10),
      });
    } else {
      this.employeeForm.reset();
    }
  }

  editEmployee(newEmployee: EmployeeDTOInterface): void {
    this.editEmployeeEvent.emit(newEmployee);
  }

  onSubmit(): void {
    this.editEmployee({
      ...this.employeeForm.getRawValue(),
      hireDate: new Date(this.employeeForm.value['hireDate']),
    });
    this.employeeForm.reset();
  }

  onResetForm(): void {
    if (this.editedEmployee) {
      this.employeeForm.patchValue({
        ...this.editedEmployee,
        hireDate: this.editedEmployee.hireDate.toISOString().slice(0, 10),
      });
    } else {
      this.employeeForm.reset();
    }
  }

  getOtherEmployees(): EmployeeDTOInterface[] {
    if (this.editedEmployee === undefined) {
      return this.getEmployees();
    }
    return this.getEmployees().filter(
      (e: EmployeeDTOInterface) => e.id != this.editedEmployee?.id
    );
  }

  // TODO: 3 ponizej symulują zapytanie do backendu
  private getEmployees(): EmployeeDTOInterface[] {
    // TODO: czy mogę tak zrobic,czy powinienem od rodzica jakos liste pobierac employees - imo po prostu z backendu by sie to bralo zapytaniem
    return EMPLOYEES;
  }

  private getSkills(): string[] {
    return SKILLS;
  }

  private getProjects(): ProjectDTOInterface[] {
    return PROJECTS;
  }
}
