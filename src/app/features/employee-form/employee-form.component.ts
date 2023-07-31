import {
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDTOInterface } from '../../models/DTO/employeeDTO';
import { SKILLS } from '../../mocks/mock-skills';
import { PROJECTS } from '../../mocks/mock-projects';
import { ProjectDTOInterface } from '../../models/DTO/projectDTO';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
// TODO: I wasn't sure if this component should be smart or dumb - it is the only one that needs skills and projects, but in future other ones may need them also so maybe its best to pass them from the main - manager component - as it is done now (they used to be set here from mocks without input)
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employeeToEdit?: EmployeeDTOInterface;
  // TODO: initalization of those lists or allow undefined "name?"
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
      name: ['', Validators.required],
      surname: [''],
      hireDate: [''],
      skills: [''],
      projects: [''],
      manager: [''],
    });
  }

  updateEmployee(employeeToUpdate: EmployeeDTOInterface): void {
    this.editEmployeeEvent.emit(employeeToUpdate);
  }

  onSubmit(): void {
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
  //
  // setAllowedManagers(): void {
  //   this.allowedManagers = this.getOtherEmployees();
  // }

  // TODO: Czy taka funkcja mogłaby być w serwisie? Czy proszenie serwisu o podanie listy wszystkich pracownikow pomniejszonej o jednego konkretnego za kazdym razem kiedy zachodzi event select w liscie bedzie kosztowne?
  //  Czy można to zrobić w jakiś sposób Lazy - tak aby dopiero kiedy ktos bedzie chcial wybrać managera to wywołało się faktyczne wykonanie operacji w serwisie?
  // TU wlasnie Observable sie zrobi?
  // getOtherEmployees(): EmployeeDTOInterface[] {
  //   if (this.allEmployees === undefined) {
  //     return [];
  //   } else {
  //     if (this.employeeToEdit === undefined) {
  //       return this.allEmployees;
  //     }
  //     return this.allEmployees.filter(
  //       (e: EmployeeDTOInterface) => e.id != this.employeeToEdit?.id
  //     );
  //   }
  // }

  // // TODO: 2 ponizej symulują zapytanie do backendu
  // private getSkills(): string[] {
  //   return SKILLS;
  // }
  //
  // private getProjects(): ProjectDTOInterface[] {
  //   return PROJECTS;
  // }

  protected readonly Boolean = Boolean;
}
