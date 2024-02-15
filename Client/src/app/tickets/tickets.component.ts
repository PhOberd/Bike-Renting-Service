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
  
    async ngOnInit() {
      await this.fetchTickets();
     }
  
  async fetchTickets() {
      const token = this.authService.getToken();
      if (token) {
          try {
              const tickets = await this.ticketsService.getTickets(token).toPromise();
              //sort tickets, so most recent ticket is on top!
              this.tickets = tickets.sort((a: any, b: any) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
          } catch (error) {
              console.error('Error fetching tickets:', error);
          }
      }
  }

  onFetchRequested(){
    this.fetchTickets();
  }
}