import { Component, Input } from '@angular/core';
import { ProjectDTOInterface } from '../../models/DTO/projectDTO';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() projects?: ProjectDTOInterface[];
}
