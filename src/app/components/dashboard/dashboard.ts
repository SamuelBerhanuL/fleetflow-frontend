import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  stats = {
    shipments: 0,
    drivers: 0,
    vehicles: 0,
    warehouses: 0
  };

  recentShipments: any[] = [];
  loading = true;
  email = localStorage.getItem('email') || 'Admin';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.api.getShipments().subscribe({
      next: (res) => {
        this.stats.shipments = res.totalElements || 0;
        this.recentShipments = res.content?.slice(0, 5) || [];
      },
      error: () => {}
    });

    this.api.getDrivers().subscribe({
      next: (res) => { this.stats.drivers = res.length; },
      error: () => {}
    });

    this.api.getVehicles().subscribe({
      next: (res) => { this.stats.vehicles = res.length; },
      error: () => {}
    });

    this.api.getWarehouses().subscribe({
      next: (res) => {
        this.stats.warehouses = res.length;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'PICKED_UP': 'bg-blue-100 text-blue-800',
      'IN_TRANSIT': 'bg-purple-100 text-purple-800',
      'DELIVERED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}