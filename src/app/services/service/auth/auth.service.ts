import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private roleSubject = new BehaviorSubject<string>('teacher'); 

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

  setRole(role: string) {
    sessionStorage.setItem('role',role);
  }

  getRole(): string {
    let roleValue:string = "";
    if(sessionStorage.getItem('role')!=null)
      roleValue = sessionStorage.getItem('role')!;
    return roleValue;
  }
}
