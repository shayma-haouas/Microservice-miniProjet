import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterfoyerComponent } from './ajouterfoyer.component';

describe('AjouterfoyerComponent', () => {
  let component: AjouterfoyerComponent;
  let fixture: ComponentFixture<AjouterfoyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterfoyerComponent]
    });
    fixture = TestBed.createComponent(AjouterfoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
