import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyvalidationService} from '../../services/myvalidation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  info: string;
  success: boolean;
  constructor(private authService: AuthService, private router: Router, public myvalidationService: MyvalidationService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl(localStorage.getItem('name'), Validators.required),
      email: new FormControl(localStorage.getItem('email'), [Validators.required, Validators.email]),
      password: new FormControl(localStorage.getItem('password'), Validators.required),
    });
  }
  get getControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const name = this.loginForm.value.name;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.IsAuthenticated(name, email, password).subscribe(result => {
        if (result.status === true) {
          this.success = true;
          this.storeUserData(name, email, password);
          this.router.navigate(['']);
          this.info = 'Login Successful';
        } else {
          console.log('Email or password wrong');
        }
      }, error => {
        this.success = true; // it should be false when backend implemented.
        this.storeUserData(name, email, password);
        this.info = 'Error. Backend not implemented yet. But User Info stored in Local Storage.';
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      });
    } else {
      return false;
    }
  }

  storeUserData(name, email, password) {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }
}
