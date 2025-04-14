import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierfoyerComponent } from './modifierfoyer.component';

describe('ModifierfoyerComponent', () => {
  let component: ModifierfoyerComponent;
  let fixture: ComponentFixture<ModifierfoyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierfoyerComponent]
    });
    fixture = TestBed.createComponent(ModifierfoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
