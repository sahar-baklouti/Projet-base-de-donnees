import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCommuneComponent } from './ajout-commune.component';

describe('AjoutCommuneComponent', () => {
  let component: AjoutCommuneComponent;
  let fixture: ComponentFixture<AjoutCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutCommuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
