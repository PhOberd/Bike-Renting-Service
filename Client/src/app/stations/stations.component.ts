import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MapService } from '../map.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [],
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  map: any;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private mapService: MapService,
  private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet().then(() => {
        this.initMap();
      });
    }
  }

  async loadLeaflet() {
    if (!(window as any).L) {
      await import('leaflet');
    }
  }

  initMap() {
    this.map = (window as any).L.map('map').setView([46.616700, 14.311817], 13);

    (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.fetchStations();
  }

  addMarker(lat: number, lng: number, title: string, Id: number) {
    const customIcon = (window as any).L.icon({
      iconUrl: 'assets/icon.png',
      iconSize: [25, 41]
    });

    const marker = (window as any).L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
    marker.bindPopup(`<a id="${title}" style="cursor: pointer;">${title}</a>`);
    marker.on('popupopen', () => {
      const element = document.getElementById(title);
      if (element) {
        element.addEventListener('click', () => {
          this.router.navigateByUrl(`/stations/${Id}`);
        });
      }
    });
  }  

  fetchStations() {
    const token = this.authService.getToken();
    if (token) {
      this.mapService.getStations(token).subscribe(
        (stations) => {
          this.processStations(stations);
        },
        (error) => {
          console.error('Error fetching stations:', error);
        }
      );
      } else {
        console.error('Authentication not found');
      }
  }

  processStations(stations: any[]) {
    stations.forEach(station => {
      this.addMarker(station.latitude, station.longitude, station.name, station.station_id);
    });
  }
}
