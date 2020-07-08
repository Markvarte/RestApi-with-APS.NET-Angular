import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Flat, DefaultFlat } from '../flats/flat';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-flats',
  templateUrl: './add-update-flats.component.html',
  styleUrls: ['./add-update-flats.component.css']
})
export class AddUpdateFlatsComponent implements OnInit {
  @Output() flatCreated = new EventEmitter<Flat>();
  @Input() flat: Flat;

 // houseId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.clearFlat();
    }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.flat.houseId = param.houseId;
    });
  }

  backToFlats() {
    this.router.navigate(['/flats', this.flat.houseId]);
  }
  private clearFlat() {
    this.flat = new DefaultFlat();
  }
  public addUpdateFlats() { // all types are interface types //event: Flat -> parametrs needed ? - no
    console.log("Should something happend!");
  this.flatCreated.emit(this.flat); // sent to base component becouse of flatCreated event
 // this.clearFlat(); Don't !1!
}

}
