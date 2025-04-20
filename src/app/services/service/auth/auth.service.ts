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
    this.roleSubject.next(role);
  }

  getRole(): Observable<string> {
    return this.roleSubject.asObservable();
  }

  getCurrentRole(): string {
    return this.roleSubject.value;
  }
}
