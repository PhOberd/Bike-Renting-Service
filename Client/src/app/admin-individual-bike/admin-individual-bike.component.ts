import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-individual-bike',
  standalone: true,
  imports: [],
  templateUrl: './admin-individual-bike.component.html',
  styleUrl: './admin-individual-bike.component.css'
})
export class AdminIndividualBikeComponent {
  @Input() bike: any;
}
