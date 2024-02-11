import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { AuthService } from '../auth.service';
import { TicketsService } from '../tickets.service';
import { ReviewComponent } from '../review/review.component';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, ReviewComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  @Input() ticket: any;
  qrCodeData: string | null = null;
  showReview: boolean = false;
  isReturnable: boolean = false;

  constructor(private authService: AuthService, private ticketsService: TicketsService,
    private walletService: WalletService){}

  ngOnInit(): void {
    const currentDate = new Date();

    if (new Date(this.ticket.start_time) > currentDate) {
      this.isReturnable = true;
    }
  }

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
  
  returnTicket(){
    const token = this.authService.getToken();
    if (token) {
      this.ticketsService.changeTicketStatus(token, this.ticket.ticket_id, "Returned").subscribe(
        (response) => {
          this.ticket.status = "Returned"
          this.walletService.chargeBalance(token, this.ticket.price).subscribe(
            (response) => {
              console.log(response);
            }
          );
      },
        (error) => {
          console.error('Error changing Status:', error);
        }
      );
    }
  }

  handleReviewed(){
    this.ticket.status = "Reviewed"
  }
}
