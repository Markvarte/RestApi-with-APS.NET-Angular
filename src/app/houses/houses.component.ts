import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { House } from './house';
import { HousesService } from '../houses.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  //constructor(private houseService: HousesService) { // don't sure it is necessary
    //houseService.get().subscribe((data : House) => this.housesValues = data);
   //}

  @Input() house: Array<House>;
  @Output() recordDeleted = new EventEmitter<House>(); // sent when click on delete ? 
  @Output() newClicked = new EventEmitter<House>(); // sent when click on new ? 
  @Output() editClicked = new EventEmitter<House>(); // sent when click on edit ? 
   
  //housesValues: House;
 
  public deleteH(data) {
    this.recordDeleted.emit(data);
  }
  public editH(data) {
    this.editClicked.emit(Object.assign({}, data));
  }
  public newH(data) { // new is blank for now
    this.newClicked.emit(data);
  }

 // getHouses(): void {
  //  this.houseService.get().subscribe((houses : House) => this.housesValues = houses);
  //}
  // addhouse(name: string): void {
 //   name = name.trim();
 // if (!name) { return; }
 // this.houseService.add({name} ).subscribe(h => {
 //   this.housesValues = h;
 // })
 // }

  ngOnInit() {
   // this.getHouses();
    //  this._httpService.get(this.accessPointUrl).subscribe(val => { // json returns from server
    //    this.housesValues = val.json();
    //  });


    }
}
