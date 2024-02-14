import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service'
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AdminStationComponent } from '../admin-station/admin-station.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StationsService } from '../stations.service';

@Component({
  selector: 'app-admin-stations',
  standalone: true,
  imports: [AdminStationComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-stations.component.html',
  styleUrl: './admin-stations.component.css'
})
export class AdminStationsComponent implements OnInit {
  stations: any[] = [];
  stationForm: FormGroup;
  message = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private mapService: MapService, private router: Router,
    private stationsservice: StationsService){
    this.stationForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchStations();
  }

  fetchStations() {
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

  onSubmit() {
    if (this.stationForm.valid) {
      const token = this.authService.getToken();
      if(token){
        this.stationsservice.postStation(token, this.stationForm.value).subscribe(
          (response: any) => {
            this.message = "Station succesfully created!";
            this.stationForm.reset();
            this.fetchStations();
          },
          (error: any) => {
            this.message = `Error posting category: ${error.error.message}`
          }
        )
      }
    } else {
      this.message = "Invalid data! For longitude and latitude please use format number.number!";
    }
  }

  onStationClick(stationId: number) {
    this.router.navigateByUrl(`/admin/stations/${stationId}`);
  }

  onFetchRequested() {
    this.fetchStations();
  }
}
