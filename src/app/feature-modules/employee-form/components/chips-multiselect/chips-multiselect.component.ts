import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmployeeSkillInterface } from '../../../../core/models/employeeSkill';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControlDirective, FormControlName, NgModel } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlValueAccessorDirective } from '../../../../shared/directives/FormControlValueAccessorDirective';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProficiencyLevel } from '../../../../core/enums/proficiency-level-enum';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InjectionManagerService } from '../../../../core/services/injection-manager/injection-manager.service';

@Component({
  selector: 'app-chips-multiselect',
  hostDirectives: [FormControlValueAccessorDirective],
  templateUrl: './chips-multiselect.component.html',
  styleUrls: ['./chips-multiselect.component.scss'],
})
export class ChipsMultiselectComponent implements OnInit {
  @ViewChild('skillsInput') skillsInput?: ElementRef<HTMLInputElement>;
  @Input() allSkills: EmployeeSkillInterface[] = [];

  chosenSkills: EmployeeSkillInterface[] = [];
  filteredSkills?: Observable<EmployeeSkillInterface[]>;
  skillsFormControl: FormControlDirective | FormControlName | NgModel =
    this.injectionManager.injectNgControl();
  announcer = inject(LiveAnnouncer);
  destroyRef: DestroyRef = inject(DestroyRef);
  possibleLevels: (string | ProficiencyLevel)[] = Object.values(
    ProficiencyLevel
  ).filter((lvl: string | ProficiencyLevel) => isNaN(Number(lvl)));
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private injectionManager: InjectionManagerService,
    private valueAccessor: FormControlValueAccessorDirective<
      EmployeeSkillInterface[]
    >
  ) {
    this.filteredSkills = this.getFilteredObservable();
    valueAccessor.value
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (value: EmployeeSkillInterface[]) => (this.chosenSkills = value)
      );
  }

  ngOnInit(): void {
    this.filteredSkills = this.getFilteredObservable();
    this.chosenSkills = this.chosenSkills === null ? [] : this.chosenSkills;
  }

  @Input()
  set initChosenSkills(skills: EmployeeSkillInterface[] | undefined) {
    this.chosenSkills = skills === undefined ? [] : skills;
  }

  add(event: MatChipInputEvent): void {
    console.log(event.value);
    //TODO: tutaj pobierac wartosc proficiency
    const value: string = (event.value || '').trim();

    // this.updateOrInsertChosenSkills(event.value);
    if (value) {
      this.chosenSkills.push({
        name: value,
        proficiency: ProficiencyLevel.JUNIOR,
      });
    }

    this.skillsFormControl.control.setValue([...this.chosenSkills]);

    event.chipInput.clear();
    this.filteredSkills = this.getFilteredObservable();
  }

  remove(skill: EmployeeSkillInterface): void {
    const index = this.chosenSkills.indexOf(skill);

    if (index >= 0) {
      this.chosenSkills.splice(index, 1);

      this.announcer.announce(`Removed ${skill}`);
    }
    this.skillsFormControl.control.setValue([...this.chosenSkills]);
    this.filteredSkills = this.getFilteredObservable();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value);
    //TODO: tutaj tez pobierz level
    this.chosenSkills.push({
      name: event.option.viewValue,
      proficiency: ProficiencyLevel.JUNIOR,
    });

    this.skillsFormControl.control.setValue([...this.chosenSkills]);

    if (this.skillsInput) {
      this.skillsInput.nativeElement.value = '';
    }
    this.filteredSkills = this.getFilteredObservable();
  }

  private getFilteredObservable():
    | Observable<EmployeeSkillInterface[]>
    | undefined {
    if (!this.skillsFormControl.control) {
      return undefined;
    } else {
      return this.skillsFormControl.control.valueChanges?.pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(null),
        map((typedName: string | null) =>
          typedName ? this._filterWithName(typedName) : this.allSkills.slice()
        )
      );
    }
  }
  private _filterWithName(skillName: string): EmployeeSkillInterface[] {
    console.log(skillName);

    return this.allSkills.filter((skill: EmployeeSkillInterface) =>
      skill.name.toLowerCase().includes(skillName)
    );
  }
}
