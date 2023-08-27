import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { EmployeeSkillInterface } from '../../../../core/models/employeeSkill';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControlDirective, FormControlName, NgModel } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  injectNgControl,
  NoopValueAccessorDirective,
} from '../../../../core/directives/NoopValueAccesorDirective';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProficiencyLevel } from '../../../../core/enums/proficiency-level-enum';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-chips-multiselect',
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './chips-multiselect.component.html',
  styleUrls: ['./chips-multiselect.component.scss'],
})
export class ChipsMultiselectComponent {
  chosenSkills: EmployeeSkillInterface[] = [];
  allSkills: EmployeeSkillInterface[] = [];
  filteredSkills?: Observable<EmployeeSkillInterface[]>;
  destroyRef: DestroyRef = inject(DestroyRef);

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('skillsInput') skillsInput?: ElementRef<HTMLInputElement>;
  skillsFormControl: FormControlDirective | FormControlName | NgModel =
    injectNgControl();
  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredSkills = this.getFilteredObservable();
  }

  add(event: MatChipInputEvent): void {
    console.log(event.value);
    //TODO: tutaj pobierac wartosc proficiency
    const value: string = (event.value || '').trim();

    if (value) {
      this.chosenSkills.push({
        name: value,
        proficiency: ProficiencyLevel.JUNIOR,
      });
    }
    //TODO
    //    event.chipInput!.clear();
    event.chipInput.clear();
    this.skillsFormControl.control.setValue(null);
  }

  remove(skill: EmployeeSkillInterface): void {
    const index = this.chosenSkills.indexOf(skill);

    if (index >= 0) {
      this.chosenSkills.splice(index, 1);

      this.announcer.announce(`Removed ${skill}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    //TODO: tutaj tez pobierz level
    this.chosenSkills.push({
      name: event.option.viewValue,
      proficiency: ProficiencyLevel.JUNIOR,
    });
    if (this.skillsInput) {
      this.skillsInput.nativeElement.value = '';
    }
    this.skillsFormControl.control.setValue(null);
  }

  private getFilteredObservable():
    | Observable<EmployeeSkillInterface[]>
    | undefined {
    return this.skillsFormControl.valueChanges?.pipe(
      takeUntilDestroyed(this.destroyRef),
      startWith(null),
      map((skill: EmployeeSkillInterface | null) =>
        skill ? this._filterWithName(skill) : this.allSkills.slice()
      )
    );
  }
  private _filterWithName(
    skill: EmployeeSkillInterface
  ): EmployeeSkillInterface[] {
    const nameFilterValue = skill.name.toLowerCase();

    return this.allSkills.filter((skill: EmployeeSkillInterface) =>
      //TODO: change to '===' instead of 'includes'
      skill.name.toLowerCase().includes(nameFilterValue)
    );
  }
}
