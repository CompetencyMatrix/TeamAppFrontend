import { NgModule } from '@angular/core';
import { LevelStarsComponent } from './components/level-stars/level-stars.component';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ProjectsComponent } from './components/projects/projects.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    LevelStarsComponent,
    EmployeeDetailsComponent,
    ProjectsComponent,
  ],
  imports: [
    MatIconModule,
    NgForOf,
    NgIf,
    NgClass,
    MatCardModule,
    TranslateModule,
    MatButtonModule,
    DatePipe,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
  ],
  exports: [LevelStarsComponent, EmployeeDetailsComponent, ProjectsComponent],
})
export class SharedModule {}
