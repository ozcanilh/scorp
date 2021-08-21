import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  IsAuthenticated(name: string, email: string, password: string) {
    const user = { name: name, email: email, password: password };
    return this.httpClient.post<any>('https://example.com/api/Auth', user);
  }
}
