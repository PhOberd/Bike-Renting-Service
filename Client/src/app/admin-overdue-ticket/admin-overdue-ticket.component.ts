import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-admin-overdue-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-overdue-ticket.component.html',
  styleUrl: './admin-overdue-ticket.component.css'
})
export class AdminOverdueTicketComponent implements OnInit{
  @Input() ticket: any;
  canDoNastyThing: boolean = false;
  balance: number = 0;
  message: string = "";
  
  constructor(private walletService: WalletService, private authService: AuthService){}

  ngOnInit(): void {
    const currentDate = new Date();
    const end_time = new Date(this.ticket.end_time);
    
    const endTimePlusOneHour = new Date(end_time.getTime());
    endTimePlusOneHour.setHours(end_time.getHours() + 24);

    if (currentDate > endTimePlusOneHour) {
      this.canDoNastyThing = true;
    }
  }

  doNastyThing(userId: string){
      const token = this.authService.getToken();
      if (token) {
        this.walletService.resetBalanceById(token, userId).subscribe(
          (response) => {
            this.message = "Reset balance successful.";
            this.canDoNastyThing = false;
          },
          (error) => {
            this.message = "Reset balance failed:" + error.error.message;
          }
        );      
      } else {
        this.message = "Authentication not found!";
      }
  }
}
