import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOverdueTicketComponent } from './admin-overdue-ticket.component';

describe('AdminOverdueTicketComponent', () => {
  let component: AdminOverdueTicketComponent;
  let fixture: ComponentFixture<AdminOverdueTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOverdueTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOverdueTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
