import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http'
import { Tenant } from './tenant';
import { Flat } from '../flats/flat';
import { HousesService } from '../houses.service';


@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit { 
  

  
  @Input() tenant: Array<Tenant>;
  @Output() recordDeleted = new EventEmitter<Tenant>(); // sent when click on delete ? 
  @Output() newClicked = new EventEmitter<Tenant>(); // sent when click on new ? 
  @Output() editClicked = new EventEmitter<Tenant>(); // sent when click on edit ? 

  public deleteT(data) {
    this.recordDeleted.emit(data);
  }
  public editT(data) {
    this.editClicked.emit(Object.assign({}, data));
  }
  public newT(data) { // new is blank for now
    this.newClicked.emit(data);
  }
    ngOnInit() {}
}
