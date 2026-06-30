import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  // Use empty string to route through proxy.conf.json to avoid CORS issues
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Auth
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, { email, password });
  }

  // Dashboard stats
  getDrivers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/drivers`, { headers: this.getHeaders() });
  }

  getWarehouses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/warehouses`, { headers: this.getHeaders() });
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/vehicles`, { headers: this.getHeaders() });
  }

  getShipments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/shipments`, { headers: this.getHeaders() });
  }

  createShipment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/shipments`, data, { headers: this.getHeaders() });
  }

  trackShipment(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/shipments/tracking/${code}`, { headers: this.getHeaders() });
  }

  updateShipmentStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/shipments/${id}/status`, { status }, { headers: this.getHeaders() });
  }

  getRoutes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/routes`, { headers: this.getHeaders() });
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/customers`, { headers: this.getHeaders() });
  }

  getAvailableDrivers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/drivers/available`, { headers: this.getHeaders() });
  }

  getActiveVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/vehicles/active`, { headers: this.getHeaders() });
  }
}