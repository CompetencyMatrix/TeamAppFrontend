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
    this.getProficiency();
  }

  getProficiency(): void {
    if (this.proficiency === undefined) {
      if (this.proficiencyName != undefined) {
        this.proficiency = (<any>ProficiencyLevel)[this.proficiencyName];
      }
    }
  }
}
