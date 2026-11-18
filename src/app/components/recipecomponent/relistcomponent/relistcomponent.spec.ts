import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Relistcomponent } from './relistcomponent';

describe('Relistcomponent', () => {
  let component: Relistcomponent;
  let fixture: ComponentFixture<Relistcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Relistcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Relistcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
