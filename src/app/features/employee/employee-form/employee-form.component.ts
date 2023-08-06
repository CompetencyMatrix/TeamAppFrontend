import {
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDTOInterface } from '../../../models/DTO/employeeDTO';
import { ProjectDTOInterface } from '../../../models/DTO/projectDTO';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
// TODO: I wasn't sure if this component should be smart or dumb - it is the only one that needs skills and projects, but in future other ones may need them also so maybe its best to pass them from the main - manager component - as it is done now (they used to be set here from mocks without input)
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employeeToEdit?: EmployeeDTOInterface;
  @Input() allowedManagers: EmployeeDTOInterface[] = [];
  @Input() skills: string[] = [];
  @Input() projects: ProjectDTOInterface[] = [];

  @Output() editEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  // TODO: czy nie powinien byc private i do tego setter i getter?
  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.buildForm();
  }

  ngOnInit(): void {
    if (this.employeeToEdit) {
      this.employeeForm.patchValue(this.employeeToEdit);
    }
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
      hireDate: [new Date()],
      avatarUrl: ['../../../assets/img/avatar-default.jpg'],
      skills: [[]],
      projects: [[]],
      manager: [''],
    });
  }

  updateEmployee(employeeToUpdate: EmployeeDTOInterface): void {
    this.editEmployeeEvent.emit(employeeToUpdate);
  }

  onSubmit(): void {
    // TODO: form is not initalized correctly? - nulls
    console.log(this.employeeForm.getRawValue());

    this.updateEmployee({
      ...this.employeeForm.getRawValue(),
      hireDate: new Date(this.employeeForm.value['hireDate']),
    });
    this.employeeForm.reset();
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
}
