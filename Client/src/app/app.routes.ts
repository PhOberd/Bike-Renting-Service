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

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'wallet', component: WalletComponent },
    { path: 'stations', component: StationsComponent },
    { path: 'tickets', component: TicketsComponent },
    { path: 'stations/:Id', component: StationComponent },
    { path: 'admin/stations', component: AdminStationsComponent, canActivate: [AdminGuard] },
    { path: 'admin/stations/:Id', component: AdminStationDetailsComponent, canActivate: [AdminGuard] },
    { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminGuard] },
    { path: 'admin/categories/:Id', component: AdminCategoryDetailsComponent, canActivate: [AdminGuard] },
    { path: 'admin/models', component: AdminModelsComponent, canActivate: [AdminGuard] },
    { path: 'admin/models/:Id', component: AdminModelDetailsComponent, canActivate: [AdminGuard] },
    { path: 'admin/bikes', component: AdminIndividualBikesComponent, canActivate: [AdminGuard] },
    { path: 'admin/bikes/:Id', component: AdminIndividualBikeDetailsComponent, canActivate: [AdminGuard] },
    { path: 'access-denied', component: AccessDeniedComponent }
];
