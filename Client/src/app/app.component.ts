import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http'
import { RegisterService } from './register.service';
import { AuthService } from './auth.service';
import { MapService } from './map.service';
import { BikesService } from './bikes.service';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, HttpClientModule],
  providers: [RegisterService, AuthService, MapService, BikesService, TicketsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client';
}
