import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModelService } from '../model.service';
import { CategoryService } from '../category.service';
import { ReviewService } from '../review.service';
import { AdminReviewComponent } from '../admin-review/admin-review.component';

@Component({
  selector: 'app-admin-model-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminReviewComponent],
  templateUrl: './admin-model-details.component.html',
  styleUrl: './admin-model-details.component.css'
})
export class AdminModelDetailsComponent implements OnInit {
  modelId: string = "";
  categories: any[] = [];
  modelForm: FormGroup;
  modelDetails: any;
  message = "";
  reviews: any[] = [];
  stars: number[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService,
    private modelService: ModelService, private categoryService: CategoryService, private reviewService: ReviewService) {
      this.modelForm = this.formBuilder.group({
        name: ['', Validators.required],
        category_id: ['', Validators.required],
        description: ['', Validators.required],
        wheel_size: ['', Validators.required],
        manufacturer: ['', Validators.required],
        brake_type: ['', Validators.required],
        price: ['', Validators.required]
      });
  }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id = params.get('Id');
        if (id !== null) {
          this.modelId = id;
          this.getModelDetails();
          this.fetchCategories();
          this.getStars();
          this.getReviews();
        } else {
          console.error('Id parameter not found in URL');
        }
      });
    }

    fetchCategories() {
      const token = this.authService.getToken();
      if (token) {
        this.categoryService.getCategories(token).subscribe(
          (categories) => {
            this.categories = categories;
            console.log(this.categories);
          },
          (error) => {
            console.error('Error fetching categories:', error);
          }
        );
        } else {
          console.error('Authentication not found');
        }
    }

    getModelDetails(){
      const token = this.authService.getToken();
      if (token) {
        this.modelService.getModelById(token, this.modelId).subscribe(
          (modelDetails) => {
            this.modelDetails = modelDetails;
            console.log(this.modelDetails);
          },
          (error) => {
            console.error('Error fetching model details:', error);
          }
        );
        } else {
          console.error('Authentication not found');
        }
    }

    getStars(): void {
      const token = this.authService.getToken();
      if (token) {
        this.reviewService.getRatioByModelId(token, this.modelId).subscribe(
          (average) => {
            this.stars = Array(average).fill(1);
            console.log(this.stars)
        },
          (error) => {
            console.error('Error fetching reviews:', error);
          }
        );
        }
    }
  
    getReviews(){
      const token = this.authService.getToken();
      if (token) {
        this.reviewService.getReviewsByModelId(token, this.modelId).subscribe(
          (reviews) => {
            this.reviews = reviews;
            console.log(this.reviews);
          },
          (error) => {
            console.error('Error fetching reviews:', error);
          }
        );
        } else {
          console.error('Authentication not found');
        }
    }

    onSubmit() {
      if (this.modelForm.valid) {
        const token = this.authService.getToken();
        if(token){
          this.modelService.changeModel(token, this.modelForm.value, this.modelId).subscribe(
            (response: any) => {
              this.message = "Model succesfully changed!";
              this.modelForm.reset();
              this.getModelDetails();
            },
            (error: any) => {
              this.message = `Error changing model: ${error.error.message}`
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
