import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  navigateToBikeStations() {
    this.router.navigateByUrl('/stations');
  }

  navigateToWallet() {
    this.router.navigateByUrl('/wallet');
  }

  navigateToTickets() {
    this.router.navigateByUrl('/tickets');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToAdminStations(){
    this.router.navigateByUrl('admin/stations');
  }

  navigateToAdminCategories(){
    this.router.navigateByUrl('admin/categories');
  }

  navigateToAdminModels(){
    this.router.navigateByUrl('admin/models');
  }

  navigateToAdminBikes(){
    this.router.navigateByUrl('admin/bikes');
  }

  navigateToOverdueTickets(){
    this.router.navigateByUrl('admin/overdue-tickets');
  }

  isAdmin(): boolean{
    return this.authService.isAdmin();
  }
}
