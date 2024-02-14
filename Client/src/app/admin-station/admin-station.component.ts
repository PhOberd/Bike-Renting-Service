import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-station',
  standalone: true,
  imports: [],
  templateUrl: './admin-station.component.html',
  styleUrl: './admin-station.component.css'
})
export class AdminStationComponent {
  @Input() station: any

  constructor(private router: Router) {}

  edit(){
    //TODO...
  }

  delete(){
    //TODO...
  }
}
