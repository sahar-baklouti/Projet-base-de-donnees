import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireVoitureComponent } from './formulaire-voiture.component';

describe('FormulaireVoitureComponent', () => {
  let component: FormulaireVoitureComponent;
  let fixture: ComponentFixture<FormulaireVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireVoitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
