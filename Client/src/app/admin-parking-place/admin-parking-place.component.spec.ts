import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParkingPlaceComponent } from './admin-parking-place.component';

describe('AdminParkingPlaceComponent', () => {
  let component: AdminParkingPlaceComponent;
  let fixture: ComponentFixture<AdminParkingPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminParkingPlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminParkingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
