import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsMultiselectComponent } from './chips-multiselect.component';

describe('ChipsMultiselectComponent', () => {
  let component: ChipsMultiselectComponent;
  let fixture: ComponentFixture<ChipsMultiselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsMultiselectComponent]
    });
    fixture = TestBed.createComponent(ChipsMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
