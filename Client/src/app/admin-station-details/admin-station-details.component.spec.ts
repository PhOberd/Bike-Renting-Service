import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStationDetailsComponent } from './admin-station-details.component';

describe('AdminStationDetailsComponent', () => {
  let component: AdminStationDetailsComponent;
  let fixture: ComponentFixture<AdminStationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminStationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
