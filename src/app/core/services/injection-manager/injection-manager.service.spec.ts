import { TestBed } from '@angular/core/testing';

import { InjectionManagerService } from './injection-manager.service';

describe('InjectionManagerService', () => {
  let service: InjectionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
