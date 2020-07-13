import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@angular/http'
import { Flat, DefaultFlat } from './flat';
import { FlatsService } from '../flats.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit {

  constructor(
    private flatService: FlatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentFlat = this.getDefaultFlat();
  }
  flatIdForT: number = null; // for connected tenants

  @Input() flatsValues: Array<Flat>;
  currentHouseId: number; // for flat list / contains house id ? - yes
  public currentFlat: Flat;
  public getConnectedTenants(data: number) {
    this.flatIdForT = data;

  }

  private getDefaultFlat(): Flat {
    return new DefaultFlat();
  }

 /*  public deleteF(data: Flat) {
    const deleteIndex = _.findIndex(this.flatsValues, { id: data.id });
    this.flatService.remove(data).subscribe(
      () => {
        this.flatsValues.splice(deleteIndex, 1);
        this.ngOnInit();
        this.router.navigateByUrl('/createFlats' + this.currentHouseId, { skipLocationChange: true }).then(() => { // seems not working
          this.router.navigate(['flats', this.currentHouseId]);
          // source -> https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular
      });
        location.reload();  // but "would completely destroy all stored states, including WebSocket connections." >>
      // source -> https://github.com/vuejs/vue-router/issues/311
      // + there still is a problem, when delete is pressed more that 1 time
      }
    );
  }
 */
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.currentHouseId = +param.houseId;
    });
    this.flatService.getByHouseId(this.currentHouseId).subscribe(
      (data: Array<Flat>) => {
        this.flatsValues = data;
        console.log(data);
      }
    );
    console.log('flat array on init: ' + this.flatsValues);
  }

}
