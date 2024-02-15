import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-parking-place',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-parking-place.component.html',
  styleUrl: './admin-parking-place.component.css'
})
export class AdminParkingPlaceComponent {
  @Input() parkingPlace: any
}
