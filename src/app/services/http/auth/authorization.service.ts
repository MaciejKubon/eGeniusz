import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { authRole } from '../../../interfaces/authInterfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private auth:AuthService) { }

  
    private apiUrl ='http://127.0.0.1:8000/api/auth';
    http= inject(HttpClient);
  
    
    authorization(){
      const role:authRole ={role: this.auth.getCurrentRole()}
      
      return this.http.post<any>(this.apiUrl,role);
    }
}
