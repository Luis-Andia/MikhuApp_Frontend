import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reinsertcomponent } from './reinsertcomponent';

describe('Reinsertcomponent', () => {
  let component: Reinsertcomponent;
  let fixture: ComponentFixture<Reinsertcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reinsertcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Reinsertcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
