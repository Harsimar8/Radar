import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverCard } from './hover-card';

describe('HoverCard', () => {
  let component: HoverCard;
  let fixture: ComponentFixture<HoverCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoverCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HoverCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
