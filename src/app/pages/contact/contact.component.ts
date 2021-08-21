import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HelperService} from '../../services/helper.service';
import {MyvalidationService} from '../../services/myvalidation.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Country {
  id: string;
  name: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading: boolean;
  success: boolean;
  info: string;
  myControl = new FormControl();
  options: Country[] = [
    { id: 'TR', name: 'Turkey' },
    { id: 'US', name: 'United States of America' },
    { id: 'GB', name: 'United Kingdom' },
    { id: 'DE', name: 'Germany' },
    { id: 'SE', name: 'Sweden' },
    { id: 'KE', name: 'Kenya' },
    { id: 'BR', name: 'Brazil' },
    { id: 'ZW', name: 'Zimbabwe' }
  ];
  filteredOptions: Observable<Country[]>;
  constructor(private helperService: HelperService, public myvalidationService: MyvalidationService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      title: new FormControl('', Validators.required),
      name: new FormControl(localStorage.getItem('name'), Validators.required),
      email: new FormControl(localStorage.getItem('email'), [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)]),
      country: new FormControl('', [Validators.required])
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  get getControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading = true;
      this.helperService.sendContactEmail(this.contactForm.value).subscribe(data => {
        this.loading = false;
        this.success = true;
        this.contactForm.reset();
        this.info = 'Message is sent';
      }, error => {
        this.loading = false;
        this.success = false;
        this.info = 'Error. Backend not implemented yet. Json: ' + JSON.stringify(this.contactForm.value);
      });
    } else {
      return false;
    }
  }
}
