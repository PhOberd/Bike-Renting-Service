import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as QRCode from 'qrcode';
import { AuthService } from '../auth.service';
import { TicketsService } from '../tickets.service';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, ReviewComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input() ticket: any;
  qrCodeData: string | null = null;
  showReview: boolean = false;

  constructor(private authService: AuthService, private ticketsService: TicketsService){}

  toggleReview(){
    this.showReview = !this.showReview;
  }

  requestQR(){
    const ticketData = "Ticket for model " + this.ticket.model_id + ", endTime is" + this.ticket.end_time;
  
    QRCode.toDataURL(ticketData, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return;
      }
      this.qrCodeData = url;
    });
  }

  useBike(){
    const token = this.authService.getToken();
    if (token) {
      this.ticketsService.changeTicketStatus(token, this.ticket.ticket_id, "Active").subscribe(
        (response) => {
          this.ticket.status = "Active"
          console.log(response)
      },
        (error) => {
          console.error('Error changing Status:', error);
        }
      );
    }
  }

  parkBike(){
    //TODO:...
  }

  handleReviewed(){
    this.ticket.status = "Reviewed"
  }
}
