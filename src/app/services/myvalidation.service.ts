import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MyvalidationService {
  constructor() { }

  getValidationMessage(f: AbstractControl, name: string) {
    if (f.errors) {
      for (const errorName in f.errors) {
        if (errorName === 'required') {
          return `${name} can not be empty`;
        } else if (errorName === 'email') {
          return `email format is wrong`;
        } else if (errorName === 'minlength') {
          return `${name} should be min 10 character`;
        }
      }
    }
  }
}
