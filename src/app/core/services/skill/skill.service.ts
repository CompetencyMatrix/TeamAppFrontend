import { DestroyRef, inject, Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { SKILLS } from '../../../mocks/mock-skills';
import { ProficiencyLevel } from '../../enums/proficiency-level-enum';
import { SkillInterface } from '../../models/skill';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  destroyRef: DestroyRef = inject(DestroyRef);
  private skillsApiUrl = `${environment.apiBaseUrl}/skills`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  getSkills(): Observable<SkillInterface[]> {
    const skills = this.httpClient.get<SkillInterface[]>(
      `${this.skillsApiUrl}`
    );
    this.messageService.addByKey('messages.service.skill.fetched.skills');
    return skills;
  }

  public getPossibleLevelsNames(): (ProficiencyLevel | string)[] {
    // TODO: take from backend
    // const skillsLevels = this.httpClient.get<string[]>(`${this.skillsApiUrl}/levels`);
    // this.messageService.addByKey('messages.service.skill.fetched.levels');
    return Object.values(ProficiencyLevel).filter(
      (lvl: string | ProficiencyLevel) => isNaN(Number(lvl))
    );
  }

  //TODO
  // getJuniorSkills(): Observable<EmployeeSkillInterface[]> {}
}
