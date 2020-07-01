import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Flat, DefaultFlat } from '../flats/flat';

@Component({
  selector: 'app-add-update-flats',
  templateUrl: './add-update-flats.component.html',
  styleUrls: ['./add-update-flats.component.css']
})
export class AddUpdateFlatsComponent implements OnInit {
  @Output() flatCreated = new EventEmitter<Flat>();
  @Input() flat: Flat;
  constructor() { 
    this.clearFlat();
  }

  ngOnInit(): void {
    
  }
  private clearFlat() {
    this.flat = new DefaultFlat();
  }
  public addUpdateFlats(event : Flat) { // all types are interface types
  this.flatCreated.emit(this.flat); // sent to base component becouse of flatCreated event
  this.clearFlat();
};

}
