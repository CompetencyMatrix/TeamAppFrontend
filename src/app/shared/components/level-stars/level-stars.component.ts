import { Component, Input, OnInit } from '@angular/core';
import { ProficiencyLevel } from '../../../core/enums/proficiency-level-enum';

@Component({
  selector: 'app-level-stars',
  templateUrl: './level-stars.component.html',
  styleUrls: ['./level-stars.component.scss'],
})
export class LevelStarsComponent implements OnInit {
  @Input() proficiency?: ProficiencyLevel;
  @Input() proficiencyName?: string;
  @Input() displayName = false;

  ngOnInit(): void {
    this.initProficiency();
  }

  initProficiency(): void {
    if (this.proficiency === undefined) {
      if (this.proficiencyName != undefined) {
        this.proficiency = (<any>ProficiencyLevel)[this.proficiencyName];
      }
    } else {
      this.proficiencyName = (<any>ProficiencyLevel)[this.proficiency];
    }
  }

  getLevels(): number[] {
    if (this.hasAnyProficiency()) {
      return Array.from(Array(this.proficiency! + 1).keys());
    }
    return [];
  }

  hasAnyProficiency(): boolean {
    return this.proficiency != undefined;
  }
}
