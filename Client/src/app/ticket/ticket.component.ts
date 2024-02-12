import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { AuthService } from '../auth.service';
import { TicketsService } from '../tickets.service';
import { ReviewComponent } from '../review/review.component';
import { WalletService } from '../wallet.service';
import { BikesService } from '../bikes.service';
import { ParkingPlaceService } from '../parking-place.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, ReviewComponent, FormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  @Input() ticket: any;
  qrCodeData: string | null = null;
  showReview: boolean = false;
  isReturnable: boolean = false;
  isUseable: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  parkingPlaces: { station_id: number, number: number }[] = [];
  stations: number[] = [];
  parkingPlaceNumbers: number[] = [];
  selectedStation: number = -1; // Set default value
  selectedParkingPlace: number = -1; // Set default value

  constructor(private authService: AuthService, private ticketsService: TicketsService,
    private walletService: WalletService, private bikeService: BikesService,
    private parkingPlaceService: ParkingPlaceService){}

    ngOnInit(): void {
      const currentDate = new Date();
      const start_time = new Date(this.ticket.start_time);
    
      // start_time is one hour behind current time
      const oneHourAhead = new Date(start_time.getTime());
      oneHourAhead.setHours(start_time.getHours() + 1);
    
      if (start_time > currentDate) {
        this.isReturnable = true;
      } else if (currentDate > oneHourAhead) {
        this.isUseable = true;
      }
    
      if (this.ticket.status === 'Inactive') {
        this.requestQR();
      } else if (this.ticket.status === 'Active') {
        this.fetchParkingPlaces();
      }
    }

  onStationSelectionChange() {
    this.parkingPlaceNumbers = this.parkingPlaces.filter(station => station.station_id === Number(this.selectedStation)).map(station => station.number);
  }

  toggleReview(){
    this.showReview = !this.showReview;
  }

  fetchParkingPlaces(){
    const token = this.authService.getToken();
    if (token) {
      this.parkingPlaceService.getFreeParkingPlaces(token, this.ticket.category_id).subscribe(
        (response: any[]) => {
          this.parkingPlaces = response;
          this.stations = [...new Set(response.map(station => station.station_id))];
        }
      );
    }
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

  useBike() {
    const token = this.authService.getToken();
    if (token) {
      this.ticketsService.changeTicketStatus(token, this.ticket.ticket_id, "Active").subscribe(
        (response) => {
          this.ticket.status = "Active";
          this.bikeService.changeBikeStatus(token, this.ticket.bike_id, "InUse").subscribe(
            (response) => {
              this.parkingPlaceService.emptyParkingPlaceByBikeId(token, this.ticket.bike_id).subscribe(
                (response) => {
                  this.fetchParkingPlaces();
                }
              );
            }
          );
        },
        (error) => {
          console.error('Error changing Status:', error);
        }
      );
    }  
  }  

  parkBike() {
    if(this.selectedParkingPlace !== -1 && this.selectedStation !== -1){
    const token = this.authService.getToken();
    if (token) {
          this.bikeService.changeBikeStatus(token, this.ticket.bike_id, "Free").subscribe(
            (response) => {
              this.ticketsService.changeTicketStatus(token, this.ticket.ticket_id, "Used").subscribe(
                (response) => {
                  this.ticket.status = 'Used';
                  this.parkingPlaceService.assignParkingPlaceByBikeId(token, this.ticket.bike_id, this.selectedParkingPlace!,
                     this.selectedStation).subscribe(
                    (response) => {
                      this.errorMessage = "";
                    }
                  );
                }
              );
            }
          );
        }
      }else {
        this.addErrorMessage("Select a station and parking place!");
      }
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
              this.addSuccessMessage("Succesfully returned the bike!")
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

  addSuccessMessage(successMessage: string){
    this.successMessage = successMessage;
    this.errorMessage = '';
  }

  addErrorMessage(errorMessage: string){
    this.successMessage = '';
    this.errorMessage = errorMessage;
  }
}
