import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reupdatecomponent } from './reupdatecomponent';

describe('Reupdatecomponent', () => {
  let component: Reupdatecomponent;
  let fixture: ComponentFixture<Reupdatecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reupdatecomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Reupdatecomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
