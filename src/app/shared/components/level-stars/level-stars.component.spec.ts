import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStarsComponent } from './level-stars.component';

describe('LevelStarsComponent', () => {
  let component: LevelStarsComponent;
  let fixture: ComponentFixture<LevelStarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelStarsComponent]
    });
    fixture = TestBed.createComponent(LevelStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
