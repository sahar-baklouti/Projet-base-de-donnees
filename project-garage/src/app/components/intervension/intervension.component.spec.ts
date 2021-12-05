import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervensionComponent } from './intervension.component';

describe('IntervensionComponent', () => {
  let component: IntervensionComponent;
  let fixture: ComponentFixture<IntervensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
