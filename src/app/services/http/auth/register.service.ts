import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { register } from '../../../interfaces/authInterfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

    private apiUrl ='http://127.0.0.1:8000/api/register';
    http= inject(HttpClient);
  
    register(credential:register){
      return this.http.post<any>(this.apiUrl,credential);
    }
}
