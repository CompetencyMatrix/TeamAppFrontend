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

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  @Input() editedEmployee?: EmployeeDTOInterface;
  @Output() editEmployeeEvent = new EventEmitter<EmployeeDTOInterface>();
  skills: string[] = ['Angular', 'Java', 'Python', 'C++'];
  projects: string[] = ['JJIT', 'OSMG', 'WW2D'];
  otherEmployees: EmployeeDTOInterface[];
  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      surname: [''],
      hireDate: [''],
      skills: [''],
      manager: [''],
    });
    this.otherEmployees = this.getEmployees().filter(
      (e: EmployeeDTOInterface) => e.id != this.editedEmployee?.id
    );
  }

  ngOnInit(): void {
    if (this.editedEmployee) {
      this.employeeForm.patchValue(this.editedEmployee);
      this.otherEmployees = this.getEmployees().filter(
        (e: EmployeeDTOInterface) => e.id != this.editedEmployee?.id
      );
    }
  }

  ngOnChanges(): void {
    if (this.editedEmployee) {
      this.employeeForm.patchValue({
        ...this.editedEmployee,
        hireDate: this.editedEmployee.hireDate.toISOString().slice(0, 10),
      });
    } else {
      this.employeeForm.reset();
    }
    this.otherEmployees = this.getEmployees().filter(
      (e: EmployeeDTOInterface) => e.id != this.editedEmployee?.id
    );
  }

  editEmployee(newEmployee: EmployeeDTOInterface) {
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
  // TODO: symuluje zapytanie do backendu
  private getEmployees() {
    // TODO: czy mogę tak zrobic,czy powinienem od rodzica jakos liste pobierac employees - imo po prostu z backendu by sie to bralo zapytaniem
    return EMPLOYEES;
  }
}
