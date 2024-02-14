import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private registerService: RegisterService) {}

  register() {
    this.registerService.register(this.email, this.password).subscribe(
      response => {
        // successful register
        this.successMessage = 'Registration successful';
      },
      error => {
        // error
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
