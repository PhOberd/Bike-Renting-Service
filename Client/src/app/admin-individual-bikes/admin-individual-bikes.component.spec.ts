import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndividualBikesComponent } from './admin-individual-bikes.component';

describe('AdminIndividualBikesComponent', () => {
  let component: AdminIndividualBikesComponent;
  let fixture: ComponentFixture<AdminIndividualBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIndividualBikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminIndividualBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
