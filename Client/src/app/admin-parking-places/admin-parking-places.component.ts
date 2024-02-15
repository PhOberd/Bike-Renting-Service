import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AdminParkingPlaceComponent } from '../admin-parking-place/admin-parking-place.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParkingPlaceService } from '../parking-place.service';
import { AuthService } from '../auth.service';
import { CategoryService } from '../category.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-admin-parking-places',
  standalone: true,
  imports: [FormsModule, CommonModule, AdminParkingPlaceComponent, ReactiveFormsModule],
  templateUrl: './admin-parking-places.component.html',
  styleUrl: './admin-parking-places.component.css'
})
export class AdminParkingPlacesComponent {
  stationId: string = "";
  parkingPlaces: any[] = [];
  categories: any[] = [];
  stations: any[] = [];
  parkingPlaceForm: FormGroup;
  message = "";

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService,
    private parkingPlaceService: ParkingPlaceService, private categoryService: CategoryService,
    private mapService: MapService) { 
      this.parkingPlaceForm = this.formBuilder.group({
        number: ['', Validators.required],
        category_id: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('Id');
      if (id !== null) {
        this.stationId = id;
        this.getParkingPlaces();
        this.fetchCategories();
      } else {
        console.error('Id parameter not found in URL');
      }
    });
  }

  getParkingPlaces(){
    const token = this.authService.getToken();
    if (token) {
      this.parkingPlaceService.getParkingPlacesByStationId(token, this.stationId).subscribe(
        (parkingPlaces) => {
          this.parkingPlaces = parkingPlaces;
        },
        (error) => {
          console.error('Error fetching parking places:', error);
        }
      );
      } else {
        console.error('Authentication not found');
      }
  }

  onFetchRequested() {
    this.getParkingPlaces();
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
    if (this.parkingPlaceForm.valid) {
      const token = this.authService.getToken();
      if(token){
        this.parkingPlaceService.postParkingPlace(token, this.stationId, this.parkingPlaceForm.value).subscribe(
          (response: any) => {
            this.message = "Parking place succesfully created!";
            this.parkingPlaceForm.reset();
            this.getParkingPlaces();
            this.categories.forEach(category => {
              this.getParkingPlacesByCategoryId(category.category_id);
            });
          },
          (error: any) => {
            this.message = `Error posting parking place: ${error.error.message}`
          }
        )
      }
    } else {
      this.message = "Invalid data!!";
    }
  }

  getParkingPlacesByCategoryId(categoryId: string) {
    const totalPlaces = this.parkingPlaces.filter(place => place.category_id === categoryId).length;
    return { totalPlaces };
  }
}
