import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { login } from '../../../interfaces/authInterfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private apiUrl ='http://127.0.0.1:8000/api/login';
  http= inject(HttpClient);

  login(credential:login){
    return this.http.post<any>(this.apiUrl,credential);
  }
}
