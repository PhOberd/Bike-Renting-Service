import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikestationsComponent } from './bikestations.component';

describe('BikestationsComponent', () => {
  let component: BikestationsComponent;
  let fixture: ComponentFixture<BikestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikestationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BikestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
