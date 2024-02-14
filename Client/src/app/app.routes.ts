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

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'wallet', component: WalletComponent },
    { path: 'stations', component: StationsComponent },
    { path: 'tickets', component: TicketsComponent },
    { path: 'stations/:Id', component: StationComponent },
    { path: 'admin/stations', component: AdminStationsComponent },
    { path: 'admin/stations/:Id', component: AdminStationDetailsComponent },
    { path: 'admin/categories', component: AdminCategoriesComponent },
    { path: 'admin/categories/:Id', component: AdminCategoryDetailsComponent },
    { path: 'admin/models', component: AdminModelsComponent },
    { path: 'admin/models/:Id', component: AdminModelDetailsComponent },
];
