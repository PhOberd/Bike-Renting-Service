import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TicketsService } from '../tickets.service';
import { AuthService } from '../auth.service';
import { AdminOverdueTicketComponent } from '../admin-overdue-ticket/admin-overdue-ticket.component';

@Component({
  selector: 'app-admin-overdue-tickets',
  standalone: true,
  imports: [CommonModule, AdminOverdueTicketComponent],
  templateUrl: './admin-overdue-tickets.component.html',
  styleUrl: './admin-overdue-tickets.component.css'
})
export class AdminOverdueTicketsComponent  {
  ticketId: string = "";
  tickets: any[] = [];

  constructor(private ticketsService: TicketsService, private authService: AuthService) {}

  async ngOnInit() {
    this.fetchTickets();
   }

  async fetchTickets() {
    const token = this.authService.getToken();
    if (token) {
        try {
          this.ticketsService.getOverdueTickets(token).subscribe(
            (response) => {
              this.tickets = response;
            },
            (error) => {
              console.error('Error fetching overdue tickets:', error);
            }
          );
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    }
  }
}