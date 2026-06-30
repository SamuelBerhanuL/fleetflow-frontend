import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shipments.html',
  styleUrl: './shipments.css'
})
export class ShipmentsComponent implements OnInit {

  shipments: any[] = [];
  drivers: any[] = [];
  vehicles: any[] = [];
  routes: any[] = [];
  customers: any[] = [];
  warehouses: any[] = [];

  loading = true;
  showForm = false;
  showTracker = false;
  trackingCode = '';
  trackedShipment: any = null;
  trackError = '';

  newShipment = {
    driverId: null,
    vehicleId: null,
    routeId: null,
    customerId: null,
    originWarehouseId: null,
    weight: null,
    description: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.api.getShipments().subscribe({
      next: (res) => {
        this.shipments = res.content || [];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
    this.api.getAvailableDrivers().subscribe({ next: (res) => this.drivers = res });
    this.api.getActiveVehicles().subscribe({ next: (res) => this.vehicles = res });
    this.api.getRoutes().subscribe({ next: (res) => this.routes = res });
    this.api.getCustomers().subscribe({ next: (res) => this.customers = res });
    this.api.getWarehouses().subscribe({ next: (res) => this.warehouses = res });
  }

  createShipment() {
    this.api.createShipment(this.newShipment).subscribe({
      next: () => {
        this.showForm = false;
        this.loadAll();
        this.newShipment = {
          driverId: null, vehicleId: null, routeId: null,
          customerId: null, originWarehouseId: null, weight: null, description: ''
        };
      },
      error: () => alert('Failed to create shipment. Check all fields.')
    });
  }

  trackShipment() {
    this.trackError = '';
    this.trackedShipment = null;
    this.api.trackShipment(this.trackingCode).subscribe({
      next: (res) => this.trackedShipment = res,
      error: () => this.trackError = 'Shipment not found for tracking code: ' + this.trackingCode
    });
  }

  updateStatus(id: number, status: string) {
    this.api.updateShipmentStatus(id, status).subscribe({
      next: () => this.loadAll(),
      error: () => alert('Cannot update to that status.')
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

  getNextStatuses(current: string): string[] {
    const transitions: any = {
      'PENDING': ['PICKED_UP', 'CANCELLED'],
      'PICKED_UP': ['IN_TRANSIT', 'CANCELLED'],
      'IN_TRANSIT': ['DELIVERED', 'CANCELLED'],
      'DELIVERED': [],
      'CANCELLED': []
    };
    return transitions[current] || [];
  }
}