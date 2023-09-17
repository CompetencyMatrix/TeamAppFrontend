import { Component, Input } from '@angular/core';
import { ProjectInterface } from '../../../core/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @Input() project?: ProjectInterface;
}
