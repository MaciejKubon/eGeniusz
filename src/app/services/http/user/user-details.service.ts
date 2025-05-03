import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { userDetail } from '../../../interfaces/userInetrafces';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor() {}

  private apiUrl = 'http://127.0.0.1:8000/api/';

  http = inject(HttpClient);

  getUserDetail(){
    return this.http.get<any>(this.apiUrl+'user');
  }
  getUserAvatar(){
    return this.http.get<any>(this.apiUrl+'user/avatar');
  }
  updateUserDetail(userDetail:userDetail){
    return this.http.post<any>(this.apiUrl+'user', userDetail);
  }
  updateUserAvatar(avatar:any){
    return this.http.post<any>(this.apiUrl+'user/avatar',avatar);
  }
  deleteUserAvatar(){
    return this.http.delete<any>(this.apiUrl+'user/avatar');
  }
}
