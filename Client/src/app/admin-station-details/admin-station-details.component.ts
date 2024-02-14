import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { StationsService } from '../stations.service';
import { ReviewService } from '../review.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AdminReviewComponent } from '../admin-review/admin-review.component';

@Component({
  selector: 'app-admin-station-details',
  standalone: true,
  imports: [FormsModule, CommonModule, AdminReviewComponent, ReactiveFormsModule],
  templateUrl: './admin-station-details.component.html',
  styleUrl: './admin-station-details.component.css'
})
export class AdminStationDetailsComponent implements OnInit {
  stationId: string = "";
  stationDetails: any;
  stars: number[] = [];
  reviews: any[] = [];
  parkingPlaces: any[] = [];
  stationForm: FormGroup;
  message = "";

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService,
    private stationsService: StationsService,  private reviewService: ReviewService) { 
      this.stationForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required]
      });
    }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id = params.get('Id');
        if (id !== null) {
          this.stationId = id;
          this.fetchStationDetails();
          this.getStars();
          this.getReviews();
        } else {
          console.error('Id parameter not found in URL');
        }
      });
    }


  fetchStationDetails(){
    const token = this.authService.getToken();
    if (token) {
      this.stationsService.getStationById(token, this.stationId).subscribe(
        (stationDetails) => {
          this.stationDetails = stationDetails;
          console.log(this.stationDetails);
        },
        (error) => {
          console.error('Error fetching station details:', error);
        }
      );
      } else {
        console.error('Authentication not found');
      }
  }

  getStars(): void {
    const token = this.authService.getToken();
    if (token) {
      this.reviewService.getRatio(token, this.stationId).subscribe(
        (average) => {
          this.stars = Array(average).fill(1);
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
      this.reviewService.getReviewsByStationID(token, this.stationId).subscribe(
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
    if (this.stationForm.valid) {
      const token = this.authService.getToken();
      if(token){
        this.stationsService.changeStation(token, this.stationForm.value, this.stationId).subscribe(
          (response: any) => {
            this.message = "Station succesfully changed!";
            console.log('Form data posted successfully:', response);
            this.stationForm.reset();
            this.fetchStationDetails();
          },
          (error: any) => {
            this.message = `Error changing Station: ${error.error.message}`
            console.error('Error changing Station:', error.error.message);
          }
        )
      } else {
        console.error('Authentication not found');
      }
    } else {
      this.message = "Invalid data!";
      console.error('Invalid data!');
    }
  }
}