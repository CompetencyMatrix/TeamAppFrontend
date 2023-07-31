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
import { SKILLS } from '../../mocks/mock-skills';
import { PROJECTS } from '../../mocks/mock-projects';
import { ProjectDTOInterface } from '../../models/DTO/projectDTO';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() editedEmployee?: EmployeeDTOInterface;
  @Input() allEmployees?: EmployeeDTOInterface[];
  @Output() editEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  skills: string[] = this.getSkills();
  projects: ProjectDTOInterface[] = this.getProjects();
  otherEmployees: EmployeeDTOInterface[] = [];
  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      surname: [''],
      hireDate: [''],
      skills: [''],
      projects: [''],
      manager: [''],
    });
  }

  ngOnInit(): void {
    this.setOtherEmployees();
    if (this.editedEmployee) {
      this.employeeForm.patchValue(this.editedEmployee);
    }
  }

  ngOnChanges(): void {
    this.setOtherEmployees();
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

  setOtherEmployees(): void {
    this.otherEmployees = this.getOtherEmployees();
  }

  getOtherEmployees(): EmployeeDTOInterface[] {
    if (this.allEmployees === undefined) {
      return [];
    } else {
      if (this.editedEmployee === undefined) {
        return this.allEmployees;
      }
      return this.allEmployees.filter(
        (e: EmployeeDTOInterface) => e.id != this.editedEmployee?.id
      );
    }
  }

  // TODO: 2 ponizej symulują zapytanie do backendu
  private getSkills(): string[] {
    return SKILLS;
  }

  private getProjects(): ProjectDTOInterface[] {
    return PROJECTS;
  }

  protected readonly Boolean = Boolean;
}
