import { DestroyRef, inject, Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { SKILLS } from '../../../mocks/mock-skills';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  destroyRef: DestroyRef = inject(DestroyRef);
  constructor(private messageService: MessageService) {}

  getSkills(): Observable<string[]> {
    const skills = of(SKILLS);
    this.messageService.addByKey('messages.service.skill.fetched.skills');
    return skills;
  }

  //TODO
  // getJuniorSkills(): Observable<EmployeeSkillInterface[]> {}
}
