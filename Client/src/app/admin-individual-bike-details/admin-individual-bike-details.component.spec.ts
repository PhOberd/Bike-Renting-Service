import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndividualBikeDetailsComponent } from './admin-individual-bike-details.component';

describe('AdminIndividualBikeDetailsComponent', () => {
  let component: AdminIndividualBikeDetailsComponent;
  let fixture: ComponentFixture<AdminIndividualBikeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIndividualBikeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminIndividualBikeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
