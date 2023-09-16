import { NgModule } from '@angular/core';
import { NameConcatPipe } from './pipes/name-concat/name-concat.pipe';
import { SkillsNamesPipe } from './pipes/skills-names/skills-names.pipe';
import { SkillLevelPipe } from './pipes/skill-level/skill-level.pipe';
import { LevelStarsComponent } from './components/level-stars/level-stars.component';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@NgModule({
  declarations: [
    NameConcatPipe,
    SkillsNamesPipe,
    SkillLevelPipe,
    LevelStarsComponent,
  ],
  imports: [MatIconModule, NgForOf, NgIf, NgClass],
  exports: [
    NameConcatPipe,
    SkillsNamesPipe,
    SkillLevelPipe,
    LevelStarsComponent,
  ],
})
export class SharedModule {}
