import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { WalletService } from '../wallet.service';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-rent-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rent-confirmation.component.html',
  styleUrl: './rent-confirmation.component.css'
})
export class RentConfirmationComponent implements OnInit {
  @Input() selectedBike: any;
  @Input() isRentNow: any;
  @Input() stationId: any;
  selectedRentHours: number = 1;
  price: number = 0;
  balance: number = 0;
  errorMessage: string = "";
  successMessage: string = "";
  startDate: string = "";

  constructor(private authService: AuthService, private walletService: WalletService,
    private ticketsService: TicketsService){}

  ngOnInit(): void { 
    this.calculatePrice();
  }

  calculatePrice() {
    this.price = this.selectedBike.pph * this.selectedRentHours;
  }

  async confirm(){
    await this.fetchBalance();
    if(this.balance >= this.price){
      const token = this.authService.getToken();
      const ticket = this.createTicket();
      if (token) {
        this.ticketsService.postTicket(token, ticket).subscribe(
          response => {
            console.log(response);
            this.walletService.useBalance(token, this.price).subscribe(
              response => {
                console.log(response);
                this.errorMessage = ""
                this.successMessage = "Successfully booked!";
              },
              error => {
                console.error("Error in using balance:", error);
              }
            );
          },
          error => {
            console.error("Error in creating ticket:", error);
          }
        );
      }
    } else {
      this.errorMessage = "Not enough money in your wallet!"
    }
  }

  async fetchBalance() {
    const token = this.authService.getToken();
    if (token) {
        try {
            const response: any = await this.walletService.getBalance(token).toPromise();
            if (response && response.balance) {
                this.balance = parseFloat(response.balance);
            } else {
                this.errorMessage = 'Invalid response format.';
            }
        } catch (error) {
            this.errorMessage = 'Failed to fetch balance.';
            console.error(error);
        }
    } else {
        this.errorMessage = 'Authentication token not found.';
    }
  }

  createTicket(): any{
    let currentTime = new Date();
    if(!this.isRentNow){
      currentTime = new Date(this.startDate);
    }

    const endTime = new Date(currentTime.getTime() + this.selectedRentHours * 60 * 60 * 1000);

    //use time format as in database
    const startTimeISOString = currentTime.toISOString();
    const endTimeISOString = endTime.toISOString();

    return {
      "user_id": 2,
      "model_id": this.selectedBike.model_id,
      "category_id": this.selectedBike.category_id,
      "start_time": startTimeISOString,
      "end_time": endTimeISOString,
      "price": this.price,
      "status": "Inactive",
      "station_id": parseInt(this.stationId)
    };
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 16);
  }
}