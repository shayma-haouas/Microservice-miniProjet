import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversiteManagementComponent } from './universite-management.component';

describe('UniversiteManagementComponent', () => {
  let component: UniversiteManagementComponent;
  let fixture: ComponentFixture<UniversiteManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversiteManagementComponent]
    });
    fixture = TestBed.createComponent(UniversiteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
