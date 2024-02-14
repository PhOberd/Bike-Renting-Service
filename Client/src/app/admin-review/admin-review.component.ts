import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-review',
  standalone: true,
  imports: [],
  templateUrl: './admin-review.component.html',
  styleUrl: './admin-review.component.css'
})
export class AdminReviewComponent {
  @Input() review: any;
}
