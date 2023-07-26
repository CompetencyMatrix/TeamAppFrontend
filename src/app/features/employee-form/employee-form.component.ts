import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeInterface } from '../../models/employee';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  @Input() editedEmployee?: EmployeeInterface;

  skills = ['Angular', 'Java', 'Python', 'C++'];
  constructor(private formBuilder: FormBuilder) {}

  employeeForm = this.formBuilder.group({
    // TODO: can i define type here without long employeeForm: FormGroup<FormControl<string>, FormControl<........ >>  = this.fb.group({
    //TODO 2: Can this be initialized clever
    firstName:
      this.editedEmployee != undefined
        ? this.editedEmployee.name
        : ['', Validators.required],
    surname:
      this.editedEmployee != undefined ? this.editedEmployee.surname : [''],
    hireDate:
      this.editedEmployee != undefined ? this.editedEmployee.hireDate : [''],
    skills:
      this.editedEmployee != undefined ? this.editedEmployee.skills : [''],
    manager:
      this.editedEmployee != undefined ? this.editedEmployee.manager : [''],
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.editedEmployee);
    console.warn(this.employeeForm.value);
  }
}
