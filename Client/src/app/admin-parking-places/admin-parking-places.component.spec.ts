import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParkingPlacesComponent } from './admin-parking-places.component';

describe('AdminParkingPlacesComponent', () => {
  let component: AdminParkingPlacesComponent;
  let fixture: ComponentFixture<AdminParkingPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminParkingPlacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminParkingPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
