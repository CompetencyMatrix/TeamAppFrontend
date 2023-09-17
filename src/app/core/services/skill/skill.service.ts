import { DestroyRef, inject, Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { SKILLS } from '../../../mocks/mock-skills';
import { ProficiencyLevel } from '../../enums/proficiency-level-enum';
import { SkillInterface } from '../../models/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  destroyRef: DestroyRef = inject(DestroyRef);
  constructor(private messageService: MessageService) {}

  getSkills(): Observable<SkillInterface[]> {
    const skills = of(SKILLS);
    this.messageService.addByKey('messages.service.skill.fetched.skills');
    return skills;
  }

  public getPossibleLevelsNames(): (ProficiencyLevel | string)[] {
    return Object.values(ProficiencyLevel).filter(
      (lvl: string | ProficiencyLevel) => isNaN(Number(lvl))
    );
  }

  //TODO
  // getJuniorSkills(): Observable<EmployeeSkillInterface[]> {}
}
