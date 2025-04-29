import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor() { }

  
    private apiUrl = 'http://127.0.0.1:8000/api/';
  
    http = inject(HttpClient);

    deleteClass(id:number){
      return this.http.delete<any>(this.apiUrl+'classes/'+id);
    }
}
