import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierblocComponent } from './modifierbloc.component';

describe('ModifierblocComponent', () => {
  let component: ModifierblocComponent;
  let fixture: ComponentFixture<ModifierblocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierblocComponent]
    });
    fixture = TestBed.createComponent(ModifierblocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
