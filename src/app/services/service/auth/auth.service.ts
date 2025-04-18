import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  getToken() :string{
    let tokenValue:string = "";
    if(sessionStorage.getItem('token')!=null)
      tokenValue = sessionStorage.getItem('token')!;
    return tokenValue;
  }
  removeToken() {
    sessionStorage.removeItem('token');
  }
}
