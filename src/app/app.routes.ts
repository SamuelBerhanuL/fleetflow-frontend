import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ShipmentsComponent } from './components/shipments/shipments';
import { DriversComponent } from './components/drivers/drivers';
import { WarehousesComponent } from './components/warehouses/warehouses';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'shipments', component: ShipmentsComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent }
];