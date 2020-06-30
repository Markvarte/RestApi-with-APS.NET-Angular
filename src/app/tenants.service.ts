import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tenant } from './tenants/tenant';
@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  private headers: HttpHeaders;
  private url: string = 'http://localhost:49928/api/Tenants';
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public get() {
    return this.http.get<Array<Tenant>>(this.url, { headers: this.headers });
  }
  public add(payload) {
    return this.http.post<Array<Tenant>>(this.url, payload, { headers: this.headers });
  }
  public remove(payload) {
    return this.http.delete<Array<Tenant>>(this.url + '/' + payload.id, { headers: this.headers });
  }
  public update(payload) {
    return this.http.put<Array<Tenant>>(`${environment.apiUrl}/tenants/${payload.id}`, payload, { headers: this.headers });
  }
}