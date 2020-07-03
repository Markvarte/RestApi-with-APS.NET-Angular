import { Component, Directive } from '@angular/core';
import { FormControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';


/* @Directive({
  selector: '[appNumberValidator]', // create own selector for number validation ?
  providers: [{
     provide: NG_VALIDATORS, useExisting: NumberValidator, multi: true}
  ]
}) */

@Component({
  selector: 'app-number-validator',
  templateUrl: './validation-functions.component.html',
  styleUrls: ['./validation-functions.component.css']
})

export class NumberValidator implements Validator {
  static validateNumbers(control: FormControl): ValidationErrors {
    if (control.value <= 0) {
      return {nums : 'Number must be a natural number'};
      }
    return null;
  }

  validate(c: FormControl): ValidationErrors | null {
   return NumberValidator.validateNumbers(c);
  }

}
