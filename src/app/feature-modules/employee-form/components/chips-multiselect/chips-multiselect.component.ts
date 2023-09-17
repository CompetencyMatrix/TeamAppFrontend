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
  @Input() possibleLevelsNames: (string | ProficiencyLevel)[] = [];
  @ViewChild('skillsInput') skillsInput?: ElementRef<HTMLInputElement>;
  skillsFormControl: FormControlDirective | FormControlName | NgModel =
    this.injectionManager.injectNgControl();
  chosenSkills: EmployeeSkillInterface[] = [];
  filteredSkills$?: Observable<EmployeeSkillInterface[]>;
  announcer: LiveAnnouncer = inject(LiveAnnouncer);
  destroyRef: DestroyRef = inject(DestroyRef);

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private injectionManager: InjectionManagerService,
    private valueAccessor: FormControlValueAccessorDirective<
      EmployeeSkillInterface[]
    >
  ) {
    console.log('Constructor');
    this.filteredSkills$ = this._getFilteredObservable();
  }

  ngOnInit(): void {
    console.log('INIT');
    console.log(this.valueAccessor.value$);
    this.valueAccessor.value$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: EmployeeSkillInterface[]) => {
        console.log('INSUB' + value);
        this.chosenSkills = value ? value : [];
      });
    console.log(this.valueAccessor.value$);

    this.filteredSkills$ = this._getFilteredObservable();
  }

  private _getFilteredObservable():
    | Observable<EmployeeSkillInterface[]>
    | undefined {
    if (!this.skillsFormControl.control) {
      return undefined;
    } else {
      return this.skillsFormControl.control.valueChanges?.pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(null),
        map((typedName: string | null) =>
          this._filterOutAlreadyChosen(
            typedName ? this._filterWithName(typedName) : this.allSkills.slice()
          )
        )
      );
    }
  }

  private _filterOutAlreadyChosen(
    skills: EmployeeSkillInterface[]
  ): EmployeeSkillInterface[] {
    return this.chosenSkills
      ? skills.filter(
          (skill: EmployeeSkillInterface) =>
            !this._isSkillNameChosen(skill.skill.name)
        )
      : skills;
  }

  private _isSkillNameChosen(skillName: string): boolean {
    return this.chosenSkills
      ? this.chosenSkills.find(
          (chosenSkill: EmployeeSkillInterface) =>
            chosenSkill.skill.name == skillName
        ) != undefined
      : false;
  }
  private _filterWithName(skillName: string): EmployeeSkillInterface[] {
    console.log(this.valueAccessor.value$);

    return this.allSkills.filter((skill: EmployeeSkillInterface) =>
      skill.skill.name.toLowerCase().includes(skillName)
    );
  }

  remove(skill: EmployeeSkillInterface): void {
    const index = this.chosenSkills.indexOf(skill);

    if (index >= 0) {
      this.chosenSkills.splice(index, 1);

      this.announcer.announce(`Removed ${skill}`);
    }
    this.filteredSkills$ = this._getFilteredObservable();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this._chooseSkill(event.option.value);
    this.skillsFormControl.control.setValue([...this.chosenSkills]);

    if (this.skillsInput) {
      this.skillsInput.nativeElement.value = '';
    }
    this.filteredSkills$ = this._getFilteredObservable();
  }

  private _chooseSkill(chosenSkill: EmployeeSkillInterface): void {
    if (!this._isSkillNameChosen(chosenSkill.skill.name)) {
      this.chosenSkills.push(chosenSkill);
    }
  }
  public onChooseLevel(
    skill: EmployeeSkillInterface,
    level: ProficiencyLevel | string
  ): void {
    // const proficiencyLevel: ProficiencyLevel = level as ProficiencyLevel;

    const enumValue: ProficiencyLevel = this.getProficiencyLevel(level);
    skill.level = enumValue;
  }

  onChangeLevel(
    skill: EmployeeSkillInterface,
    level: ProficiencyLevel | string
  ): void {
    const enumValue: ProficiencyLevel = this.getProficiencyLevel(level);
    skill.level = enumValue;
  }

  getProficiencyLevel(level: string | ProficiencyLevel): ProficiencyLevel {
    return typeof level === 'string' ? (<any>ProficiencyLevel)[level] : level;
  }
}
