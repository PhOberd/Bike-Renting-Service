import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModelDetailsComponent } from './admin-model-details.component';

describe('AdminModelDetailsComponent', () => {
  let component: AdminModelDetailsComponent;
  let fixture: ComponentFixture<AdminModelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModelDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminModelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
