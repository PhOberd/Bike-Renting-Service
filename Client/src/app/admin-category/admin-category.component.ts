import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {
  @Input() category: any

}
