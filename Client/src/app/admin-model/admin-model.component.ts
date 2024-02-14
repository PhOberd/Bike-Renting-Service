import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModelService } from '../model.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-model.component.html',
  styleUrl: './admin-model.component.css'
})
export class AdminModelComponent {
  @Input() model: any
  message = "";
  @Output() fetchRequest = new EventEmitter<any>();
  
  constructor(private authService: AuthService,
    private modelService: ModelService){}

  onModelDelete(modelId: string){
      const token = this.authService.getToken();
      if (token) {
        this.modelService.deleteModel(token, modelId).subscribe(
          (response) => {
            this.fetchRequest.emit();
          },
          (error) => {
            this.message = error.error.message;
          }
        );
        } else {
          this.message = 'Authentication not found'
      }
  }
}
