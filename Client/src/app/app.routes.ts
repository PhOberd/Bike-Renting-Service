import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WalletComponent } from './wallet/wallet.component';
import { TicketsComponent } from './tickets/tickets.component';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './station/station.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'wallet', component: WalletComponent },
    { path: 'stations', component: StationsComponent },
    { path: 'tickets', component: TicketsComponent },
    { path: 'stations/:Id', component: StationComponent }
];
