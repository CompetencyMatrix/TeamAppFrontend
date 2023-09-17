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
      { name: SKILLS[0], proficiency: ProficiencyLevel.MID },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.MID,
      },
      { name: SKILLS[3], proficiency: ProficiencyLevel.SENIOR },
      {
        name: SKILLS[1],
        proficiency: ProficiencyLevel.SENIOR,
      },
      { name: SKILLS[4], proficiency: ProficiencyLevel.JUNIOR },
      {
        name: SKILLS[5],
        proficiency: ProficiencyLevel.JUNIOR,
      },
      {
        name: SKILLS[6],
        proficiency: ProficiencyLevel.SENIOR,
      },
      { name: SKILLS[7], proficiency: ProficiencyLevel.JUNIOR },
      {
        name: SKILLS[8],
        proficiency: ProficiencyLevel.JUNIOR,
      },
    ],
    projects: [PROJECTS[4], PROJECTS[3]],
    manager: 'Marcello',
  },
  {
    id: '1313',
    name: 'Bombasto',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.JUNIOR },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.JUNIOR,
      },
      { name: SKILLS[3], proficiency: ProficiencyLevel.SENIOR },
      {
        name: SKILLS[1],
        proficiency: ProficiencyLevel.JUNIOR,
      },
      { name: SKILLS[4], proficiency: ProficiencyLevel.JUNIOR },
      {
        name: SKILLS[5],
        proficiency: ProficiencyLevel.JUNIOR,
      },
      {
        name: SKILLS[6],
        proficiency: ProficiencyLevel.JUNIOR,
      },
      { name: SKILLS[7], proficiency: ProficiencyLevel.JUNIOR },
      {
        name: SKILLS[8],
        proficiency: ProficiencyLevel.JUNIOR,
      },
    ],

    projects: [PROJECTS[5], PROJECTS[3]],
    manager: 'Marcello',
  },
  {
    id: '1414',
    name: 'Celeritas',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.MID },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[4], PROJECTS[3]],
    manager: 'Marcello',
  },
  {
    id: '1515',
    name: 'Magneta',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.JUNIOR },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.JUNIOR,
      },
    ],
    projects: [PROJECTS[4], PROJECTS[5]],
    manager: 'Marcello',
  },
  {
    id: '1616',
    name: 'RubberMan',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.MID },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[2], PROJECTS[3]],
    manager: 'Marcello',
  },
  {
    id: '1717',
    name: 'Dynama',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.MID },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[0], PROJECTS[1]],
    manager: 'Marcello',
  },
  {
    id: '1818',
    name: 'Dr. IQ',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.MID },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[5], PROJECTS[4]],
    manager: 'Marcello',
  },
  {
    id: '1919',
    name: 'Magma',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.MID },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[3], PROJECTS[5]],
    manager: 'Marcello',
  },
  {
    id: '2020',
    name: 'Tornado',
    surname: 'Wonter',
    hireDate: new Date('12.10.2131'),
    skills: [
      { name: SKILLS[0], proficiency: ProficiencyLevel.MID },
      {
        name: SKILLS[2],
        proficiency: ProficiencyLevel.MID,
      },
    ],
    projects: [PROJECTS[3], PROJECTS[4]],
    manager: 'Marcello',
  },
];
