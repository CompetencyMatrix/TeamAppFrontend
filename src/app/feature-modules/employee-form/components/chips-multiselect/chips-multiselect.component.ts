import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmployeeSkillInterface } from '../../../../core/models/employeeSkill';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControlDirective, FormControlName, NgModel } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProficiencyLevel } from '../../../../core/enums/proficiency-level-enum';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InjectionManagerService } from '../../../../core/services/injection-manager/injection-manager.service';
import { FormControlValueAccessorDirective } from '../../../../shared/directives/FormControlValueAccessorDirective';

@Component({
  selector: 'app-chips-multiselect',
  hostDirectives: [FormControlValueAccessorDirective],
  templateUrl: './chips-multiselect.component.html',
  styleUrls: ['./chips-multiselect.component.scss'],
})
export class ChipsMultiselectComponent implements OnInit {
  @Input() allSkills: EmployeeSkillInterface[] = [];
  @ViewChild('skillsInput') skillsInput?: ElementRef<HTMLInputElement>;
  skillsFormControl: FormControlDirective | FormControlName | NgModel =
    this.injectionManager.injectNgControl();
  chosenSkills: EmployeeSkillInterface[] = [];
  filteredSkills$?: Observable<EmployeeSkillInterface[]>;
  announcer: LiveAnnouncer = inject(LiveAnnouncer);
  destroyRef: DestroyRef = inject(DestroyRef);
  possibleLevelsNames: (string | ProficiencyLevel)[] =
    this.getPossibleLevelsNames();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private injectionManager: InjectionManagerService,
    private valueAccessor: FormControlValueAccessorDirective<
      EmployeeSkillInterface[]
    >
  ) {
    console.log('Constructor');
    this.filteredSkills$ = this.getFilteredObservable();
  }

  ngOnInit(): void {
    console.log('INIT');
    console.log(this.valueAccessor.value$);
    this.valueAccessor.value$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: EmployeeSkillInterface[]) => {
        console.log('INSUB' + value);
        this.chosenSkills = value;
      });
    console.log(this.valueAccessor.value$);

    this.filteredSkills$ = this.getFilteredObservable();
  }

  private getPossibleLevelsNames(): (ProficiencyLevel | string)[] {
    return Object.values(ProficiencyLevel).filter(
      (lvl: string | ProficiencyLevel) => isNaN(Number(lvl))
    );
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
    console.log('FilterName: skillName ' + JSON.stringify(skillName));
    console.log('FilterName: value observable: ');
    console.log(this.valueAccessor.value$);

    return this.allSkills.filter((skill: EmployeeSkillInterface) =>
      skill.name.toLowerCase().includes(skillName)
    );
  }

  remove(skill: EmployeeSkillInterface): void {
    const index = this.chosenSkills.indexOf(skill);

    if (index >= 0) {
      this.chosenSkills.splice(index, 1);

      this.announcer.announce(`Removed ${skill}`);
    }
    this.filteredSkills$ = this.getFilteredObservable();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('SELECTED autocomplete: ' + JSON.stringify(event.option.value));
    //TODO: tutaj tez pobierz level
    this.chosenSkills.push(event.option.value);
    this.skillsFormControl.control.setValue([...this.chosenSkills]);

    if (this.skillsInput) {
      this.skillsInput.nativeElement.value = '';
    }
    this.filteredSkills$ = this.getFilteredObservable();
  }

  public onChooseLevel(
    skill: EmployeeSkillInterface,
    level: ProficiencyLevel | string
  ): void {
    const proficiencyLevel: ProficiencyLevel = level as ProficiencyLevel;

    const enumValue: ProficiencyLevel = (<any>ProficiencyLevel)[level];
    skill.proficiency = enumValue;
  }

  protected readonly ProficiencyLevel = ProficiencyLevel;
}

// add(event: MatChipInputEvent): void {
//   console.log('MATCHIP ADD');
//   console.log(event);
//   console.log(event.value);
//   //TODO: tutaj pobierac wartosc proficiency
//   const value: string = (event.value || '').trim();
//
//   // this.updateOrInsertChosenSkills(event.value);
//   if (value) {
//     this.chosenSkills.push({
//       name: value,
//       proficiency: ProficiencyLevel.JUNIOR,
//     });
//   }
//
//   this.skillsFormControl.control.setValue([...this.chosenSkills]);
//
//   event.chipInput.clear();
//   this.filteredSkills$ = this.getFilteredObservable();
// }
