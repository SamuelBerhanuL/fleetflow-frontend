import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drivers.html',
  styleUrl: './drivers.css'
})
export class DriversComponent implements OnInit {

  drivers: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.api.getDrivers().subscribe({
      next: (res) => {
        this.drivers = res;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}