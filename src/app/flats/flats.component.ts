import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@angular/http'
import { Flat, DefaultFlat } from './flat';
import { FlatsService } from '../flats.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit { // nu very похоже на этот house Component

  constructor(
    private flatService: FlatsService,
    private route: ActivatedRoute
    ) {
    flatService.get().subscribe((data: Array<Flat>) => this.flatsValues = data);
    this.currentFlat = this.getDefaultFlat();
   }
  flatIdForT: number = null; // for connected tenants

  @Input() flatsValues: Array<Flat>;
  show: number; // for flat list / contains house id ? - yes
  public currentFlat: Flat;
  public getConnectedTenants(data : number) {
    this.flatIdForT = data;

  }

  private getDefaultFlat(): Flat {
    return new DefaultFlat();
  }

  public createUpdateFlat(flat: Flat) {
    flat.houseId = this.show; // inicialize in new object house id 
    let flatWithId = _.find(this.flatsValues, (el => el.id === flat.id));
    if (flatWithId) {
      const updateIndex = _.findIndex(this.flatsValues, { id: flatWithId.id });
      this.flatService.update(flat).subscribe(() => {
        this.flatsValues.splice(updateIndex, 1, flat);
      }
      );
    } else {
      flat.id = this.flatsValues[this.flatsValues.length - 1].id + 1; // solution for Internal server error
      this.flatService.add(flat).subscribe(
        () => {
          this.flatsValues.push(flat)
        }
      );
    }
    this.currentFlat = this.getDefaultFlat();
  };

  public deleteF(data: Flat) {
    const deleteIndex = _.findIndex(this.flatsValues, { id: data.id });
    this.flatService.remove(data).subscribe(
      () => this.flatsValues.splice(deleteIndex, 1)
    );
  }
  public editF(data: Flat) {
    this.currentFlat = data;
  }
  public newF(data: Flat) { // cleans form if it contains any info
    this.currentFlat = data;
  }
    ngOnInit() {
      this.route.params.subscribe(param => {
        this.show = param.houseId;
      });
    }

}
