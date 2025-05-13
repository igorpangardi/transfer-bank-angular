import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingPayComponent } from './scheduling-pay.component';

describe('SchedulingPayComponent', () => {
  let component: SchedulingPayComponent;
  let fixture: ComponentFixture<SchedulingPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
