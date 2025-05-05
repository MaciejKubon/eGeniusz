import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { teacherFilter } from '../../../interfaces/teacherListInterfaces';

@Injectable({
  providedIn: 'root'
})
export class TeacherListService {

  constructor() { }
  
    private apiUrl = 'http://127.0.0.1:8000/api/';
  
    http = inject(HttpClient);
  
    getTeacherList(filtr:teacherFilter){
      return this.http.post<any>(this.apiUrl+'teacherList', filtr);
    }
}
