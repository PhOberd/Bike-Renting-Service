import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BikesService } from '../bikes.service';
import { ModelService } from '../model.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-admin-individual-bike-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-individual-bike-details.component.html',
  styleUrl: './admin-individual-bike-details.component.css'
})
export class AdminIndividualBikeDetailsComponent implements OnInit {
  bikeId: string = "";
  bikeForm: FormGroup;
  bikeDetails: any;
  message = "";
  models: any[] = [];
  stations: any[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService,
    private bikesService: BikesService, private mapService: MapService, private modelService: ModelService) {
      this.bikeForm = this.formBuilder.group({
        model_id: ['', Validators.required],
        unique_id: ['', Validators.required],
        station_id: ['', Validators.required],
        status: ['', Validators.required]
      });
  }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id = params.get('Id');
        if (id !== null) {
          this.bikeId = id;
          this.getBikeDetails();
          this.fetchStations();
          this.fetchModels();
        } else {
          console.error('Id parameter not found in URL');
        }
      });
    }

    getBikeDetails(){
      const token = this.authService.getToken();
      if (token) {
        this.bikesService.getBikeById(token, this.bikeId).subscribe(
          (bikeDetails) => {
            this.bikeDetails = bikeDetails;
          },
          (error) => {
            console.error('Error fetching bike details:', error);
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
          this.bikesService.changeBike(token, this.bikeForm.value, this.bikeId).subscribe(
            (response: any) => {
              this.message = "Category succesfully changed!";
              this.bikeForm.reset();
              this.getBikeDetails();
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

    fetchModels(){
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

    fetchStations(){
      const token = this.authService.getToken();
      if (token) {
        this.mapService.getStations(token).subscribe(
          (stations) => {
            this.stations = stations;
          },
          (error) => {
            console.error('Error fetching stations:', error);
          }
        );
        } else {
          console.error('Authentication not found');
        }
    }
}