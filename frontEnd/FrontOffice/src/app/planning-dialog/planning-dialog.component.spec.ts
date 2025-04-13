import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDialogComponent } from './planning-dialog.component';

describe('PlanningDialogComponent', () => {
  let component: PlanningDialogComponent;
  let fixture: ComponentFixture<PlanningDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningDialogComponent]
    });
    fixture = TestBed.createComponent(PlanningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
