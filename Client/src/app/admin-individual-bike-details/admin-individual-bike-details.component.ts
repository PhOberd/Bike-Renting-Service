import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BikesService } from '../bikes.service';
import { ModelService } from '../model.service';
import { MapService } from '../map.service';
import { ParkingPlaceService } from '../parking-place.service';

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

  selectedStationId: string = "";
  selectedModelId: string = "";
  selectedCategoryId: string = "";
  selectedParkingPlace: string = "";
  parkingPlaces: any[] = [];
  filteredParkingPlaces: any[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService,
    private bikesService: BikesService, private mapService: MapService, private modelService: ModelService,
    private parkingPlaceService: ParkingPlaceService) {
      this.bikeForm = this.formBuilder.group({
        model_id: ['', Validators.required],
        unique_id: ['', Validators.required],
        station_id: ['', Validators.required],
        number: ['', Validators.required],
        status: ['Free', Validators.required]
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
          this.fetchParkingPlaces();
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
              this.message = "Bike succesfully changed!";
              this.bikeForm.reset();
              this.getBikeDetails();
              this.parkingPlaceService.assignParkingPlaceByBikeId(token, this.bikeDetails.bike_id,
                +this.selectedParkingPlace, +this.selectedStationId).subscribe(
                (response: any) => {},
                (error: any) => {
                  this.message = `Error changing parking place: ${error.error.message}`
                }
              )
            },
            (error: any) => {
              this.message = `Error changing bike: ${error.error.message}`
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
            console.error('Error fetching parking places:', error);
          }
        );
        } else {
          console.error('Authentication not found');
        }
    }

    fetchParkingPlaces(){
      const token = this.authService.getToken();
      if (token) {
        this.parkingPlaceService.getParkingPlaces(token).subscribe(
          (parkingPlaces) => {
            this.parkingPlaces = parkingPlaces;
            this.filteredParkingPlaces = parkingPlaces;
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

    onStationChange(event: any) {
      this.selectedStationId = event.target.value;
      this.filteredParkingPlaces = this.filterParkingPlaces();
      console.log(this.filteredParkingPlaces);
    }

    onModelChange(event: any) {
      this.selectedModelId = event.target.value;
      this.selectedCategoryId = this.getCategory();
      this.filteredParkingPlaces = this.filterParkingPlaces();
      console.log(this.filteredParkingPlaces);
    }

    onParkingPlaceChange(event: any) {
      this.selectedParkingPlace = event.target.value;
    }

    getCategory(){
      const model = this.models.find(model => model.model_id === +this.selectedModelId);
      return model.category_id;
    }

    filterParkingPlaces() {
      const selectedStationId = +this.selectedStationId;
      const selectedCategoryId = +this.selectedCategoryId;
    
      return this.parkingPlaces.filter(place => 
        place.station_id === selectedStationId && place.category_id === selectedCategoryId && place.bike_id === null
      );
    }
}