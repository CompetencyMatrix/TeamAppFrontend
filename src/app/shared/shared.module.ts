import { NgModule } from '@angular/core';
import { LevelStarsComponent } from './components/level-stars/level-stars.component';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { EmployeeSkillComponent } from './components/employee-skill/employee-skill.component';

@NgModule({
  declarations: [LevelStarsComponent, EmployeeSkillComponent],
  imports: [MatIconModule, NgForOf, NgIf, NgClass],
  exports: [LevelStarsComponent, EmployeeSkillComponent],
})
export class SharedModule {}
