import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { SKILLS } from '../../../mocks/mock-skills';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private messageService: MessageService) {}

  getSkills(): Observable<string[]> {
    const skills = of(SKILLS);
    this.messageService.addByKey('messages.service.skill.fetched.skills');
    return skills;
  }
}
