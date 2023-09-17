import { EmployeeInterface } from '../core/models/employee';
import { PROJECTS } from './mock-projects';
import { ProficiencyLevel } from '../core/enums/proficiency-level-enum';
import { SKILLS } from './mock-skills';

export const EMPLOYEES: EmployeeInterface[] = [
  {
    id: '1212',
    name: 'Dr. Nice',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.MID },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.MID,
      },
      { skill: SKILLS[3], level: ProficiencyLevel.SENIOR },
      {
        skill: SKILLS[1],
        level: ProficiencyLevel.SENIOR,
      },
      { skill: SKILLS[4], level: ProficiencyLevel.JUNIOR },
      {
        skill: SKILLS[5],
        level: ProficiencyLevel.JUNIOR,
      },
      {
        skill: SKILLS[6],
        level: ProficiencyLevel.SENIOR,
      },
      { skill: SKILLS[7], level: ProficiencyLevel.JUNIOR },
      {
        skill: SKILLS[8],
        level: ProficiencyLevel.JUNIOR,
      },
    ],
    projects: [PROJECTS[4], PROJECTS[3]],
    managerId: 'Marcello',
  },
  {
    id: '1313',
    name: 'Bombasto',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.JUNIOR },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.JUNIOR,
      },
      { skill: SKILLS[3], level: ProficiencyLevel.SENIOR },
      {
        skill: SKILLS[1],
        level: ProficiencyLevel.JUNIOR,
      },
      { skill: SKILLS[4], level: ProficiencyLevel.JUNIOR },
      {
        skill: SKILLS[5],
        level: ProficiencyLevel.JUNIOR,
      },
      {
        skill: SKILLS[6],
        level: ProficiencyLevel.JUNIOR,
      },
      { skill: SKILLS[7], level: ProficiencyLevel.JUNIOR },
      {
        skill: SKILLS[8],
        level: ProficiencyLevel.JUNIOR,
      },
    ],

    projects: [PROJECTS[5], PROJECTS[3]],
    managerId: 'Marcello',
  },
  {
    id: '1414',
    name: 'Celeritas',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.MID },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[4], PROJECTS[3]],
    managerId: 'Marcello',
  },
  {
    id: '1515',
    name: 'Magneta',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.JUNIOR },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.JUNIOR,
      },
    ],
    projects: [PROJECTS[4], PROJECTS[5]],
    managerId: 'Marcello',
  },
  {
    id: '1616',
    name: 'RubberMan',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.MID },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[2], PROJECTS[3]],
    managerId: 'Marcello',
  },
  {
    id: '1717',
    name: 'Dynama',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.MID },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[0], PROJECTS[1]],
    managerId: 'Marcello',
  },
  {
    id: '1818',
    name: 'Dr. IQ',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.MID },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[5], PROJECTS[4]],
    managerId: 'Marcello',
  },
  {
    id: '1919',
    name: 'Magma',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.MID },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[3], PROJECTS[5]],
    managerId: 'Marcello',
  },
  {
    id: '2020',
    name: 'Tornado',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { skill: SKILLS[0], level: ProficiencyLevel.MID },
      {
        skill: SKILLS[2],
        level: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[3], PROJECTS[4]],
    managerId: 'Marcello',
  },
];
