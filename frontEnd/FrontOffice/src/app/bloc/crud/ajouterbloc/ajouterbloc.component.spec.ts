import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterblocComponent } from './ajouterbloc.component';

describe('AjouterblocComponent', () => {
  let component: AjouterblocComponent;
  let fixture: ComponentFixture<AjouterblocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterblocComponent]
    });
    fixture = TestBed.createComponent(AjouterblocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
