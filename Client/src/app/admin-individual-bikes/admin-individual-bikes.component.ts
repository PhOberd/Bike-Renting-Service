import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CategoryService } from '../category.service';
import { ModelService } from '../model.service';
import { AdminIndividualBikeComponent } from '../admin-individual-bike/admin-individual-bike.component';
import { MapService } from '../map.service';
import { BikesService } from '../bikes.service';

@Component({
  selector: 'app-admin-individual-bikes',
  standalone: true,
  imports: [AdminIndividualBikeComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-individual-bikes.component.html',
  styleUrl: './admin-individual-bikes.component.css'
})
export class AdminIndividualBikesComponent implements OnInit {
  bikes: any[] = [];
  models: any[] = [];
  stations: any[] = [];
  bikeForm: FormGroup;
  message = "";

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private categoryService: CategoryService, private router: Router,
    private modelService: ModelService, private mapService: MapService, private bikesService: BikesService){
      this.bikeForm = this.formBuilder.group({
        model_id: ['', Validators.required],
        unique_id: ['', Validators.required],
        station_id: ['', Validators.required],
        status: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.fetchModels();
    this.fetchStations();
    this.fetchBikes();
  }

  fetchStations() {
    const token = this.authService.getToken();
    if (token) {
      this.mapService.getStations(token).subscribe(
        (stations) => {
          this.stations = stations;
          console.log(this.stations);
        },
        (error) => {
          console.error('Error fetching stations:', error);
        }
      );
      } else {
        console.error('Authentication not found');
      }
  }

  fetchBikes() {
    const token = this.authService.getToken();
    if (token) {
      this.bikesService.getBikes(token).subscribe(
        (bikes) => {
          this.bikes = bikes;
          console.log(this.bikes);
        },
        (error) => {
          console.error('Error fetching bikes:', error);
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
          console.log(this.models);
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
    if (this.bikeForm.valid) {
      const token = this.authService.getToken();
      if(token){
        this.bikesService.postBike(token, this.bikeForm.value).subscribe(
          (response: any) => {
            this.message = "Bike succesfully created!";
            console.log('Form data posted successfully:', response);
            this.bikeForm.reset();
            this.fetchBikes();
          },
          (error: any) => {
            this.message = `Error creating bike: ${error.error.message}`
            console.error('Error creating bike:', error.error.message);
          }
        )
      }
    } else {
      this.message = "Invalid data!";
      console.error('Invalid data!');
    }
  }

  onBikeClick(bikeId: number) {
    this.router.navigateByUrl(`/admin/bikes/${bikeId}`);
    }
}