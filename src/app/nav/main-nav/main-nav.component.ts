import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

enum MainPage {
  home = 1,
  contact = 2,
  login = 3
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit {
  userName: string;
  email: string;
  pageActive: MainPage;
  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'tr']);

    if (localStorage.getItem('language')) {
      translate.setDefaultLang(localStorage.getItem('language'));
      translate.use(localStorage.getItem('language'));
    } else {
      translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|tr/) ? browserLang : 'en');
      translate.use('en');
      localStorage.setItem('language', 'en');
    }

    this.router.events.subscribe(x => {
      if (x instanceof  NavigationEnd) {
        if (x.url.indexOf('home') > 0) {
          this.pageActive = MainPage.home;
        } else if (x.url.indexOf('contact') > 0) {
          this.pageActive = MainPage.contact;
        } else if (x.url.indexOf('login') > 0) {
          this.pageActive = MainPage.login;
        } else {
          this.pageActive = MainPage.home;
        }
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('name')) {
      this.userName = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
    }
  }

  changeLanguage(lang) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['']);
    window.location.reload();
  }

}
