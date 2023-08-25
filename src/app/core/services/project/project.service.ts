import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { ProjectInterface } from '../../models/project';
import { PROJECTS } from '../../../mocks/mock-projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private messageService: MessageService) {}

  getProjects(): Observable<ProjectInterface[]> {
    const projects: Observable<ProjectInterface[]> = of(PROJECTS);
    this.messageService.addByKey('messages.service.project.fetched.projects');
    return projects;
  }
}
