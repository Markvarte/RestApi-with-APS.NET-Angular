import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Flat, DefaultFlat } from '../flats/flat';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatsService } from '../flats.service';
import { NumberValidator } from '../numberValidator/number.validator';

@Component({
  selector: 'app-add-update-flats',
  templateUrl: './add-update-flats.component.html',
  styleUrls: ['./add-update-flats.component.css']
})
export class AddUpdateFlatsComponent implements OnInit {
  @Output() flatCreated = new EventEmitter<Flat>();
  @Input() flat: Flat;
  newFlatForm: FormGroup; // reactive form name

 // houseId: number;
  constructor(
    private formBuilder: FormBuilder,
    private flatService: FlatsService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    //this.clearFlat();
    this.createForm();
    }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      console.log("houseId: " + param.houseId);
      this.flat.houseId = param.houseId;
    });
  }
  private createForm() {
    this.newFlatForm = this.formBuilder.group({
      id: [null],
      num: [null, [Validators.required, NumberValidator.validateNumbers] ],
      floor: [null, [Validators.required, NumberValidator.validateNumbers] ],
      roomsCount: [null, [Validators.required, NumberValidator.validateNumbers] ],
      tenantsCount: [null, [Validators.required, NumberValidator.validateNumbers] ],
      totalArea: [null, [Validators.required, NumberValidator.validateNumbers] ],
      livingArea: [null, [Validators.required, NumberValidator.validateNumbers] ]
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
