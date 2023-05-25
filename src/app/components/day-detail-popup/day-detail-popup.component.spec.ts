import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDetailPopupComponent } from './day-detail-popup.component';

describe('DayDetailPopupComponent', () => {
  let component: DayDetailPopupComponent;
  let fixture: ComponentFixture<DayDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayDetailPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
