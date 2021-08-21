import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../modules/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { MainNavComponent } from '../nav/main-nav/main-nav.component';
import { MatSelectModule, MatAutocompleteModule } from '@angular/material';
import {FooterComponent} from '../footer/footer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [MainLayoutComponent, MainNavComponent, HomeComponent, LoginComponent, ContactComponent, FooterComponent],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        ComponentsModule,
        MaterialModule,
        MatSelectModule,
        MatAutocompleteModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ]
})
export class MainModule { }
