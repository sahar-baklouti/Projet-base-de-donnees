import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireTechnicienComponent } from './formulaire-technicien.component';

describe('FormulaireTechnicienComponent', () => {
  let component: FormulaireTechnicienComponent;
  let fixture: ComponentFixture<FormulaireTechnicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireTechnicienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
