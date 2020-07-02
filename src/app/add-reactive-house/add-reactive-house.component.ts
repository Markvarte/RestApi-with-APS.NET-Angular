import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-reactive-house',
  templateUrl: './add-reactive-house.component.html',
  styleUrls: ['./add-reactive-house.component.css']
})
export class AddReactiveHouseComponent implements OnInit {
  /**
   * New house form
   *
   * @type {FormGroup}
   * @memberof AddReactiveHouseComponent
   */
  newHouseForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createHouse() {
    if (this.newHouseForm.valid) {
      console.log(this.newHouseForm.value);
      this.newHouseForm.reset();
    }
    // this.myService.add(this.newHouseForm.value).subscribe(newHouse => this.houseAdded.emit(newHouse))
  }

  private createForm() {
    this.newHouseForm = this.formBuilder.group({
      num: [null, [Validators.required]],
      street: ['', Validators.required],
      sity: ['', Validators.required],
      country: ['', Validators.required],
      postCode: ['', Validators.required],
    });
  }
}
