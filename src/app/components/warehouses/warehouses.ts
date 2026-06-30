import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './warehouses.html',
  styleUrl: './warehouses.css'
})
export class WarehousesComponent implements OnInit {

  warehouses: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadWarehouses();
  }

  loadWarehouses() {
    this.api.getWarehouses().subscribe({
      next: (res) => {
        this.warehouses = res;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}