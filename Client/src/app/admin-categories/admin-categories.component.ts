import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AdminCategoryComponent } from '../admin-category/admin-category.component';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [AdminCategoryComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit{
  categories: any[] = [];
  categoryForm: FormGroup;
  message = "";

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private categoryService: CategoryService, private router: Router){
      this.categoryForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    const token = this.authService.getToken();
    if (token) {
      this.categoryService.getCategories(token).subscribe(
        (categories) => {
          this.categories = categories;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
      } else {
        console.error('Authentication not found');
      }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const token = this.authService.getToken();
      if(token){
        this.categoryService.postCategory(token, this.categoryForm.value).subscribe(
          (response: any) => {
            this.message = "Category succesfully created!";
            this.categoryForm.reset();
            this.fetchCategories();
          },
          (error: any) => {
            this.message = `Error posting category: ${error.error.message}`
          }
        )
      }
    } else {
      this.message = "Invalid data!";
    }
  }

  onCategoryClick(categoryId: number) {
  this.router.navigateByUrl(`/admin/categories/${categoryId}`);
  }

  onFetchRequested() {
    this.fetchCategories();
  }
}
