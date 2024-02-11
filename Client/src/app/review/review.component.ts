import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../review.service';
import { AuthService } from '../auth.service';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() ticket: any;
  @Output() reviewed: EventEmitter<any> = new EventEmitter();
  reviewText: string = '';
  selectedRating: number = 1;

  constructor(private reviewService: ReviewService, private authService: AuthService,
    private ticketService: TicketsService){}

  submit(){
    const token = this.authService.getToken();
    if (token) {
      this.reviewService.postReview(token, 2, this.ticket.model_id, this.ticket.station_id, this.reviewText, this.selectedRating).subscribe(
        (response) => {
          this.ticketService.changeTicketStatus(token, this.ticket.ticket_id, "Reviewed").subscribe(
            () => {
              this.reviewed.emit();
            },
            (error) => {
              console.error('Error changing ticket status:', error);
            }
          );
        },
        (error) => {
          console.error('Error submiting review:', error);
        }
      );
      } else {
        console.error('Authentication not found');
      }
  }
}
