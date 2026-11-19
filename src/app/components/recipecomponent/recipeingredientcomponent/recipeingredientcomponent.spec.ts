import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recipeingredientcomponent } from './recipeingredientcomponent';

describe('Recipeingredientcomponent', () => {
  let component: Recipeingredientcomponent;
  let fixture: ComponentFixture<Recipeingredientcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recipeingredientcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Recipeingredientcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
