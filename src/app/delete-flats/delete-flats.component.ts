import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Flat, DefaultFlat } from '../flats/flat';
import { FlatsService } from '../flats.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delete-flats',
  templateUrl: './delete-flats.component.html',
  styleUrls: ['./delete-flats.component.css']
})
export class DeleteFlatsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flatService: FlatsService,
    private route: ActivatedRoute,
  ) {
    this.createForm();
    this.clearFlat();
  }

  @Input() flat: Flat;
  newFlatForm: FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.flat.houseId = parseInt(param.houseId, 10); // parse to int decimal string value (10 - regix - decimal string)
      this.flat.id = parseInt(param.id, 10);
      if (this.flat.id) {
        this.getFlatInfo(this.flat.id);
      }
    });

  }

  private getFlatInfo(flatId: number) {
    this.flatService.getById(flatId)
      .subscribe(flat => {
        this.editFlatForm(flat);
        // TODO: Update values on form -->
      });
  }
  private clearFlat() {
    this.flat = new DefaultFlat();
  }
  editFlatForm(flat: Flat) {
    this.newFlatForm.patchValue(flat);
  }
  private createForm() {
    this.newFlatForm = this.formBuilder.group({
      id: [null], // hidden
      num: [{value: null, disabled: true}],
      floor: [{value: null, disabled: true}],
      roomsCount: [{value: null, disabled: true}],
      tenantsCount: [{value: null, disabled: true}],
      totalArea: [{value: null, disabled: true}],
      livingArea: [{value: null, disabled: true}],
      houseId: [null] // hidden
    });
  }

  deleteFlat() {

    this.flatService.remove(this.flat).subscribe(
      () => {
        this.newFlatForm.reset();
        this.router.navigate(['/flats', this.flat.houseId]);
      });
  }
  backToFlats() {
    this.router.navigate(['/flats', this.flat.houseId]);
  }
}
