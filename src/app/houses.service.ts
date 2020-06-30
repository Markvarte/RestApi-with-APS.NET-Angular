import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flat } from './flats/flat';
import { House } from './houses/house';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class HousesService {
  private headers: HttpHeaders;
  private url: string = 'http://localhost:49928/api/';
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public get(obj) {
   return this.http.get<Array<House>>(this.url + obj, { headers: this.headers });
  }
  public add(payload, obj) {
    return this.http.post<Array<House>>(this.url + obj, payload, { headers: this.headers });
  }
  public remove(payload, obj) {
    return this.http.delete<Array<House>>(this.url + obj + '/' + payload.id, { headers: this.headers });
  }
  public update(payload, obj) {
    return this.http.put<Array<House>>(this.url + obj + '/' + payload.id, payload, { headers: this.headers });
  }
}
