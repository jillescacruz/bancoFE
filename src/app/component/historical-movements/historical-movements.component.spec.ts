import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalMovementsComponent } from './historical-movements.component';

describe('HistoricalMovementsComponent', () => {
  let component: HistoricalMovementsComponent;
  let fixture: ComponentFixture<HistoricalMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalMovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
