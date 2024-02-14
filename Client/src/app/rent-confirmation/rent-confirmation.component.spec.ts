import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentConfirmationComponent } from './rent-confirmation.component';

describe('RentConfirmationComponent', () => {
  let component: RentConfirmationComponent;
  let fixture: ComponentFixture<RentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
