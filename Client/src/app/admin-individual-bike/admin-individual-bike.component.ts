import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BikesService } from '../bikes.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-individual-bike',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-individual-bike.component.html',
  styleUrl: './admin-individual-bike.component.css'
})
export class AdminIndividualBikeComponent {
  @Input() bike: any;
  message = "";
  @Output() fetchRequest = new EventEmitter<any>();
  
  constructor(private authService: AuthService,
    private bikesService: BikesService){}

  onBikeDelete(bikeId: string){
      const token = this.authService.getToken();
      if (token) {
        this.bikesService.deleteBike(token, bikeId).subscribe(
          (response) => {
            this.fetchRequest.emit();
          },
          (error) => {
            this.message = error.error.message;
          }
        );
        } else {
          this.message = 'Authentication not found'
      }
  }
}
