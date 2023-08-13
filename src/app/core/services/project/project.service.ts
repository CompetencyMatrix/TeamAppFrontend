import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { ProjectDTOInterface } from '../../../models/DTO/projectDTO';
import { PROJECTS } from '../../../mocks/mock-projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private messageService: MessageService) {}

  // TODO: pewnie powinno być Lazy
  getProjects(): Observable<ProjectDTOInterface[]> {
    const projects: Observable<ProjectDTOInterface[]> = of(PROJECTS);
    this.messageService.addByKey('messages.service.project.fetched.projects');
    return projects;
  }
}
