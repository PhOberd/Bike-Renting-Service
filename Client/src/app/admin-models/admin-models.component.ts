import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CategoryService } from '../category.service';
import { AdminModelComponent } from '../admin-model/admin-model.component';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-admin-models',
  standalone: true,
  imports: [AdminModelComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-models.component.html',
  styleUrl: './admin-models.component.css'
})
export class AdminModelsComponent implements OnInit {
  models: any[] = [];
  categories: any[] = [];
  modelForm: FormGroup;
  message = "";

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private categoryService: CategoryService, private router: Router,
    private modelService: ModelService){
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

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchModels();
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

  fetchModels() {
    const token = this.authService.getToken();
    if (token) {
      this.modelService.getModels(token).subscribe(
        (models) => {
          this.models = models;
        },
        (error) => {
          console.error('Error fetching models:', error);
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
        this.modelService.postModels(token, this.modelForm.value).subscribe(
          (response: any) => {
            this.message = "Model succesfully created!";
            this.modelForm.reset();
            this.fetchModels();
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

  onModelClick(modelId: number) {
    this.router.navigateByUrl(`/admin/models/${modelId}`);
    }

  onFetchRequested() {
    this.fetchModels();
  }
}
