import { NgModule } from '@angular/core';
import { NameConcatPipe } from './pipes/name-concat/name-concat.pipe';
import { SkillsNamesPipe } from './pipes/skills-names/skills-names.pipe';
import { SkillLevelPipe } from './pipes/skill-level/skill-level.pipe';
import { LevelStarsComponent } from './components/level-stars/level-stars.component';

@NgModule({
  declarations: [NameConcatPipe, SkillsNamesPipe, SkillLevelPipe, LevelStarsComponent],
  imports: [],
  exports: [NameConcatPipe, SkillsNamesPipe, SkillLevelPipe],
})
export class SharedModule {}
