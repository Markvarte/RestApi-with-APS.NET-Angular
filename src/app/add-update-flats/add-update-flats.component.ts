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
  isValidFormSubmitted = false; // for "submitted sucessfully" alert

  // houseId: number;
  constructor(
    private formBuilder: FormBuilder,
    private flatService: FlatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clearFlat(); // that is necessary thing for default values added
    this.createForm();
  }

  ngOnInit(): void {
        // if ID exist => edit, if not => create
 
    this.route.params.subscribe(param => {
      console.log("houseId: " + param.houseId);
      this.flat.houseId = parseInt(param.houseId, 10); // parse to int decimal string value
      this.flat.id = param.id;
      if (this.flat.id) {
        this.getFlatInfo(this.flat.id);
      }
    });
  }

  private getFlatInfo(flatId: number){
    this.flatService.getById(flatId)
    .subscribe(flat => {
      console.log(flat);
      this.editFlatForm(flat);
      // TODO: Update values on form -->
    });
  }

  editFlatForm(flat: Flat) {
    this.newFlatForm.patchValue(flat);
  }
  private createForm() {
    this.newFlatForm = this.formBuilder.group({
      id: [null],
      num: [null, [Validators.required, NumberValidator.validateNumbers]],
      floor: [null, [Validators.required, NumberValidator.validateNumbers]],
      roomsCount: [null, [Validators.required, NumberValidator.validateNumbers]],
      tenantsCount: [null, [Validators.required, NumberValidator.validateNumbers]],
      totalArea: [null, [Validators.required, NumberValidator.validateNumbers]],
      livingArea: [null, [Validators.required, NumberValidator.validateNumbers]],
      houseId: [null]
    });
  }

  backToFlats() {
    this.router.navigate(['/flats', this.flat.houseId]);
  }
  private clearFlat() {
    this.flat = new DefaultFlat();
  }
  public addUpdateFlats() { // all types are interface types //event: Flat -> parametrs needed ? - no
    if (this.newFlatForm.valid) {
      if (!this.newFlatForm.value.id) {
        this.addFlat(this.newFlatForm.value); // это нужно было по красивому, но оно не работает
      } else {
        this.updateFlat(this.newFlatForm.value); // это нужно было по красивому, но оно не работает
      }
      this.isValidFormSubmitted = true; // for message "Form submitted successfully."
      //this.clearHouses();
      this.newFlatForm.reset();
    }
  }

  private addFlat(flatToAdd: Flat) {
    flatToAdd.houseId = this.flat.houseId;
    console.log(flatToAdd);
    this.flatService.add(flatToAdd)
      .subscribe(newFlat => {
        console.log(newFlat);
      });
  }

  private updateFlat(flat: Flat) {
    this.flatService.update(flat)
      .subscribe(newFlat => {
        console.log(newFlat);
      });
  }

}
