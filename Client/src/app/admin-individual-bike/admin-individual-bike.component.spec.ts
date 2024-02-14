import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndividualBikeComponent } from './admin-individual-bike.component';

describe('AdminIndividualBikeComponent', () => {
  let component: AdminIndividualBikeComponent;
  let fixture: ComponentFixture<AdminIndividualBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIndividualBikeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminIndividualBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
