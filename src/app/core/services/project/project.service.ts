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

  getProjects(): Observable<ProjectDTOInterface[]> {
    const projects: Observable<ProjectDTOInterface[]> = of(PROJECTS);
    this.messageService.add('ProjectService: fetched projects.');
    return projects;
  }
}
