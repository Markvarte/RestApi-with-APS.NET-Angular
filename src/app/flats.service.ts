import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flat } from './flats/flat';
@Injectable({
  providedIn: 'root'
})
export class FlatsService {

  private headers: HttpHeaders;
  private url: string = 'http://localhost:49928/api/Flats';
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public get() {
    return this.http.get<Array<Flat>>(this.url, { headers: this.headers });
  }
  public add(payload) {
    return this.http.post<Array<Flat>>(this.url, payload, { headers: this.headers });
  }
  public remove(payload) {
    return this.http.delete<Array<Flat>>(this.url + '/' + payload.id, { headers: this.headers });
  }
  public update(payload) {
    return this.http.put<Array<Flat>>(this.url + '/' + payload.id, payload, { headers: this.headers });
  }
}