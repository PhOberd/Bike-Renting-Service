import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';
  balance: number = 0;

  constructor(
    private walletService: WalletService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchBalance();
  }

  fetchBalance() {
    const token = this.authService.getToken();
    if (token) {
      this.walletService.getBalance(token).subscribe(
        (response: any) => {
          if (response && response.balance) {
            this.balance = parseFloat(response.balance);
          } else {
            this.errorMessage = 'Invalid response format.';
          }
        },
        (error) => {
          this.errorMessage = 'Failed to fetch balance.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Authentication token not found.';
    }
  }
  
  chargeBalance(amountString: string, creditCard: string) {
    const token = this.authService.getToken();
    if (token) {
      const amount = parseFloat(amountString);
      if(amount > 0) {
      this.walletService.chargeBalance(token, amount).subscribe(
        (response: any) => {
          if (response && response.success) {
            this.successMessage = response.message;
          } else {
            this.errorMessage = response.message || 'Failed to charge balance.';
          }
        },
        (error) => {
          this.errorMessage = 'Failed to charge balance.';
          console.error(error);
        }
      );
      } else {
        this.errorMessage = 'Please put in a valid data!';
      }
    } else {
      this.errorMessage = 'Authentication token not found.';
    }
    this.fetchBalance();
  }
}
