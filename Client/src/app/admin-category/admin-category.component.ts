import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {
  @Input() category: any
  message = "";
  @Output() fetchRequest = new EventEmitter<any>();
  
  constructor(private authService: AuthService,
    private categoryService: CategoryService){}

  onCategoryDelete(categoryId: string){
      const token = this.authService.getToken();
      if (token) {
        this.categoryService.deleteCategory(token, categoryId).subscribe(
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
