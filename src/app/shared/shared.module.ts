import { NgModule } from '@angular/core';
import { LevelStarsComponent } from './components/level-stars/level-stars.component';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@NgModule({
  declarations: [LevelStarsComponent],
  imports: [MatIconModule, NgForOf, NgIf, NgClass],
  exports: [LevelStarsComponent],
})
export class SharedModule {}
