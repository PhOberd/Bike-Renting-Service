import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WalletComponent } from './wallet/wallet.component';
import { TicketsComponent } from './tickets/tickets.component';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './station/station.component';
import { AdminStationsComponent } from './admin-stations/admin-stations.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminModelsComponent } from './admin-models/admin-models.component';
import { AdminStationDetailsComponent } from './admin-station-details/admin-station-details.component';
import { AdminCategoryDetailsComponent } from './admin-category-details/admin-category-details.component';
import { AdminModelDetailsComponent } from './admin-model-details/admin-model-details.component';
import { AdminIndividualBikesComponent } from './admin-individual-bikes/admin-individual-bikes.component';
import { AdminIndividualBikeDetailsComponent } from './admin-individual-bike-details/admin-individual-bike-details.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdminGuard } from './AdminGuard';
import { AdminOverdueTicketsComponent } from './admin-overdue-tickets/admin-overdue-tickets.component';
import { LogInGuard } from './LogInGuard';
import { AdminParkingPlacesComponent } from './admin-parking-places/admin-parking-places.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'wallet', component: WalletComponent, canActivate: [LogInGuard] },
    { path: 'stations', component: StationsComponent },
    { path: 'tickets', component: TicketsComponent, canActivate: [LogInGuard] },
    { path: 'stations/:Id', component: StationComponent, canActivate: [LogInGuard] },
    { path: 'admin/stations', component: AdminStationsComponent, canActivate: [AdminGuard] },
    { path: 'admin/stations/:Id', component: AdminStationDetailsComponent, canActivate: [AdminGuard] },
    { path: 'admin/stations/:Id/parking-places', component: AdminParkingPlacesComponent, canActivate: [AdminGuard] },
    { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminGuard] },
    { path: 'admin/categories/:Id', component: AdminCategoryDetailsComponent, canActivate: [AdminGuard] },
    { path: 'admin/models', component: AdminModelsComponent, canActivate: [AdminGuard] },
    { path: 'admin/models/:Id', component: AdminModelDetailsComponent, canActivate: [AdminGuard] },
    { path: 'admin/bikes', component: AdminIndividualBikesComponent, canActivate: [AdminGuard] },
    { path: 'admin/bikes/:Id', component: AdminIndividualBikeDetailsComponent, canActivate: [AdminGuard] },
    { path: 'admin/overdue-tickets', component: AdminOverdueTicketsComponent, canActivate: [AdminGuard] },
    { path: 'access-denied', component: AccessDeniedComponent }
];
