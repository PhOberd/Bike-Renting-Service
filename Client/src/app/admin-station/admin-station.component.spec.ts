import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStationComponent } from './admin-station.component';

describe('AdminStationComponent', () => {
  let component: AdminStationComponent;
  let fixture: ComponentFixture<AdminStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
