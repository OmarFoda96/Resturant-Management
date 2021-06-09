import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMealsComponent } from './store-meals.component';

describe('StoreMealsComponent', () => {
  let component: StoreMealsComponent;
  let fixture: ComponentFixture<StoreMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreMealsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
