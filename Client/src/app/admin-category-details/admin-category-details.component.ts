import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-category-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-category-details.component.html',
  styleUrl: './admin-category-details.component.css'
})
export class AdminCategoryDetailsComponent implements OnInit {
  categoryId: string = "";
  categoryForm: FormGroup;
  categoryDetails: any;
  message = "";

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService,
    private categoryService: CategoryService) {
      this.categoryForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
  }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id = params.get('Id');
        if (id !== null) {
          this.categoryId = id;
          this.getCategoryDetails();
        } else {
          console.error('Id parameter not found in URL');
        }
      });
    }

    getCategoryDetails(){
      const token = this.authService.getToken();
      if (token) {
        this.categoryService.getCategoriesById(token, this.categoryId).subscribe(
          (categoryDetails) => {
            this.categoryDetails = categoryDetails;
            console.log(this.categoryDetails);
          },
          (error) => {
            console.error('Error fetching category details:', error);
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
          this.categoryService.changeCategory(token, this.categoryForm.value, this.categoryId).subscribe(
            (response: any) => {
              this.message = "Category succesfully changed!";
              this.categoryForm.reset();
              this.getCategoryDetails();
            },
            (error: any) => {
              this.message = `Error changing category: ${error.error.message}`
            }
          )
        } else {
          console.error('Authentication not found');
        }
      } else {
        this.message = "Invalid data!";
      }
    }
}