import { Component, Input } from '@angular/core';
import { ProjectInterface } from '../../../core/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() projects?: ProjectInterface[];
}
