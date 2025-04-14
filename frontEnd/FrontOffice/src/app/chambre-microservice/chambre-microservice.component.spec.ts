import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreMicroserviceComponent } from './chambre-microservice.component';

describe('ChambreMicroserviceComponent', () => {
  let component: ChambreMicroserviceComponent;
  let fixture: ComponentFixture<ChambreMicroserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChambreMicroserviceComponent]
    });
    fixture = TestBed.createComponent(ChambreMicroserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
