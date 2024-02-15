import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOverdueTicketsComponent } from './admin-overdue-tickets.component';

describe('AdminOverdueTicketsComponent', () => {
  let component: AdminOverdueTicketsComponent;
  let fixture: ComponentFixture<AdminOverdueTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOverdueTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOverdueTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
