import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { ProjectInterface } from '../../models/project';
import { PROJECTS } from '../../../mocks/mock-projects';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsApiUrl = `${environment.apiBaseUrl}/projects`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  getProjects(): Observable<ProjectInterface[]> {
    const projects: Observable<ProjectInterface[]> = this.httpClient.get<
      ProjectInterface[]
    >(this.projectsApiUrl);
    this.messageService.addByKey('messages.service.project.fetched.projects');
    return projects;
  }
}
