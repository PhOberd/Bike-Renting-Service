import { Component } from '@angular/core';
import { BikesService } from '../bikes.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { BikeComponent } from '../bike/bike.component';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../review.service';
import { FormsModule } from '@angular/forms';
import { RentConfirmationComponent } from '../rent-confirmation/rent-confirmation.component';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [BikeComponent, CommonModule, FormsModule, RentConfirmationComponent],
  templateUrl: './station.component.html',
  styleUrl: './station.component.css'
})
export class StationComponent {
  stationId: string = "";
  
  originalBikes: any[] = [];
  bikes: any[] = [];
  filteredModelNames: string[] = [];

  modelNames: string[] = [];
  categories: string[] = [];

  selectedModel: string = "";
  selectedCategory: string = "";

  stars: number[] = [];

  selectedBike: any;
  isRentNow: boolean = false;
  isRentConfirmationOpen: boolean = false;

  startDate: string = ""
  endDate: string = ""

  constructor(private route: ActivatedRoute,
    private bikesService: BikesService, private authService: AuthService, private reviewService: ReviewService) {}

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id = params.get('Id');
        if (id !== null) {
          this.stationId = id;
          this.getStars();
          this.fetchBikes();
        } else {
          console.error('Id parameter not found in URL');
        }
      });
    }

  fetchBikes() {
    const token = this.authService.getToken();
    if (token) {
      this.bikesService.getBikesByStationId(token, this.stationId).subscribe(
        (bikes) => {
          this.originalBikes = bikes.bikes
          this.getFilteredValues();
          this.filterBikes();
      },
        (error) => {
          console.error('Error fetching bikes:', error);
        }
      );
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

  getFilteredValues() {
    this.modelNames = this.getUniqueValues(this.originalBikes.map(bike => bike.model_name));
    this.categories = this.getUniqueValues(this.originalBikes.map(bike => bike.category_name));
  }

  getUniqueValues(array: any[]): any[] {
    const uniqueValues: any[] = [];
    array.forEach(value => {
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    });
    return uniqueValues;
  }

  filterBikes() {
    if (this.selectedCategory || this.selectedModel) {
      this.bikes = this.originalBikes.filter(bike =>
        (!this.selectedModel || bike.model_name === this.selectedModel) &&
        (!this.selectedCategory || bike.category_name === this.selectedCategory)
      );
    } else {
      this.bikes = this.originalBikes;
    }
  }

  filterBikesByCategory() {
    this.filteredModelNames = this.modelNames.filter(modelName =>
      this.originalBikes.some(bike =>
        bike.category_name === this.selectedCategory && bike.model_name === modelName
      )
    );
    this.selectedModel = "";
    this.filterBikes();
  }
  
  filterBikesByModel() {
    this.filterBikes();
  }

  onRentNowRequested(bike: any) {
    this.selectedBike = bike;
    this.isRentConfirmationOpen = true;
    this.isRentNow = true
  }

  onRentLaterRequested(bike: any) {
    this.selectedBike = bike;
    this.isRentConfirmationOpen = true;
    this.isRentNow = false
  }
}
