import { Component, Input, Output, EventEmitter} from '@angular/core';
import { StationsService } from '../stations.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-station',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-station.component.html',
  styleUrl: './admin-station.component.css'
})
export class AdminStationComponent {
  @Input() station: any
  message = "";
  @Output() fetchRequest = new EventEmitter<any>();
  
  constructor(private authService: AuthService,
    private stationsService: StationsService){}

  onStationDelete(stationId: string){
      const token = this.authService.getToken();
      if (token) {
        this.stationsService.deleteStation(token, stationId).subscribe(
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
