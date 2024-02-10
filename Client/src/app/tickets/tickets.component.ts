import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TicketComponent, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
    ticketId: string = "";
    tickets: any[] = [];
  
    constructor(private ticketsService: TicketsService, private authService: AuthService) {}
  
      ngOnInit() {
        this.fetchTickets();
      }
  
    fetchTickets() {
      const token = this.authService.getToken();
      if (token) {
        this.ticketsService.getTickets(token).subscribe(
          (tickets) => {
            this.tickets = tickets
            console.log(this.tickets)
        },
          (error) => {
            console.error('Error fetching tickets:', error);
          }
        );
        }
    }
  }