import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-model',
  standalone: true,
  imports: [],
  templateUrl: './admin-model.component.html',
  styleUrl: './admin-model.component.css'
})
export class AdminModelComponent {
  @Input() model: any

}
