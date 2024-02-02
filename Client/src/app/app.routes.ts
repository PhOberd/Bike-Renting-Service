import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WalletComponent } from './wallet/wallet.component';
import { BikestationsComponent } from './bikestations/bikestations.component';
import { TicketsComponent } from './tickets/tickets.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'wallet', component: WalletComponent },
    { path: 'bikestations', component: BikestationsComponent },
    { path: 'tickets', component: TicketsComponent }
];
