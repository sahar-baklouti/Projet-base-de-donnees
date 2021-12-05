import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireResponsableComponent } from './formulaire-responsable.component';

describe('FormulaireResponsableComponent', () => {
  let component: FormulaireResponsableComponent;
  let fixture: ComponentFixture<FormulaireResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
