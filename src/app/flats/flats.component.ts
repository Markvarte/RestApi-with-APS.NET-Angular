import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@angular/http'
import { Flat } from './flat';

@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit { // nu very похоже на этот house Component
 
  @Input() flatsValues: Array<Flat>;
  @Output() recordDeleted = new EventEmitter<Flat>(); // sent when click on delete ? 
  @Output() newClicked = new EventEmitter<Flat>(); // sent when click on new ? 
  @Output() editClicked = new EventEmitter<Flat>(); // sent when click on edit ? 

  public deleteF(data) {
    this.recordDeleted.emit(data);
  }
  public editF(data) {
    this.editClicked.emit(Object.assign({}, data)); // for not reactive forms
  }
  public newF(data) { // new is blank for now
    this.newClicked.emit(data);
  }
    ngOnInit() {
    
    }

}
