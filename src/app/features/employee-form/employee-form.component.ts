import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { EMPLOYEES } from '../../mocks/mock-employees';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  @Input() editedEmployee?: EmployeeDTOInterface;
  skills: string[] = ['Angular', 'Java', 'Python', 'C++'];
  projects: string[] = ['JJIT', 'OSMG', 'WW2D'];
  otherEmployees: EmployeeDTOInterface[];

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
    this.otherEmployees = this.getEmployees().filter(
      (e: EmployeeDTOInterface) => e.id != this.editedEmployee?.id
    );
  }

  ngOnChanges(): void {
    if (this.editedEmployee) {
      console.log('OnChanges');
      this.employeeForm.patchValue(this.editedEmployee);
    } else {
      this.employeeForm.reset();
    }
    this.otherEmployees = this.getEmployees().filter(
      (e: EmployeeDTOInterface) => e.id != this.editedEmployee?.id
    );
  }

  @Output() editEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  editEmployee(newEmployee: EmployeeDTOInterface) {
    this.editEmployeeEvent.emit(newEmployee);
  }

  onSubmit() {
    console.log('OnSubmit');
    this.editEmployee(this.employeeForm.getRawValue());
    this.employeeForm.reset();
  }

  onResetForm() {
    if (this.editedEmployee) {
      this.employeeForm.patchValue(this.editedEmployee);
    } else {
      this.employeeForm.reset();
    }
  }
  // tODO: symuluje zapytanie do backendu
  private getEmployees() {
    // TODO: czy mogę tak zrobic,czy powinienem od rodzica jakos liste pobierac employees - imo po prostu z backendu by sie to bralo zapytaniem
    return EMPLOYEES;
  }
}
