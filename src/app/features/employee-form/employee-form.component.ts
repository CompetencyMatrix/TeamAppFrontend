import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
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

  //TODO: Why values are never set using this initialization - always after onChanges
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

  ngOnChanges(): void {
    if (this.editedEmployee) {
      this.employeeForm.patchValue(this.editedEmployee);
    } else {
      this.employeeForm.reset();
    }
  }

  @Output() editEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  editEmployee(newEmployee: EmployeeDTOInterface) {
    this.editEmployeeEvent.emit(newEmployee);
  }

  onSubmit() {
    this.editEmployee(this.employeeForm.getRawValue());
    this.employeeForm.reset();
  }
}
