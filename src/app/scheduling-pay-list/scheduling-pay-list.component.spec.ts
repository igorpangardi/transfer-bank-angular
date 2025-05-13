import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingPayListComponent } from './scheduling-pay-list.component';

describe('SchedulingPayListComponent', () => {
  let component: SchedulingPayListComponent;
  let fixture: ComponentFixture<SchedulingPayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingPayListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingPayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
