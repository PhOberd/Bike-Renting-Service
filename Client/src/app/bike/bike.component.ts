import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bike',
  standalone: true,
  imports: [],
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.css'
})
export class BikeComponent {
  @Input() bike: any;
  @Output() rentNowRequest = new EventEmitter<any>();
  @Output() rentLaterRequest = new EventEmitter<any>();

  rentNow() {
    this.rentNowRequest.emit(this.bike);
  }

  rentLater(){
    this.rentLaterRequest.emit(this.bike);
  }
}
