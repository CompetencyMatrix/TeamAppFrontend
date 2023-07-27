import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  @Input() editedEmployee?: EmployeeDTOInterface;
  SKILLS: string[] = ['Angular', 'Java', 'Python', 'C++'];
  PROJECTS: string[] = ['JJIT', 'OSMG', 'WW2D'];
  employeeForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      id: [{ value: this.editedEmployee?.id || '', disabled: true }],
      name: [this.editedEmployee?.name || '', Validators.required],
      surname: [this.editedEmployee?.surname || ''],
      hireDate: [this.editedEmployee?.hireDate || ''],
      skills: [this.editedEmployee?.skills || ''],
      manager: [this.editedEmployee?.manager || ''],
    });
  }

  @Output() editEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  editEmployee(newEmployee: EmployeeDTOInterface) {
    this.editEmployeeEvent.emit(newEmployee);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.editedEmployee);
    console.warn(this.employeeForm.value);
    this.editEmployee(this.employeeForm.getRawValue());
  }
}
