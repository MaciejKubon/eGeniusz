import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { addClass, confirmClass, dateClass } from '../../../interfaces/calendarInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor() {}

  private apiUrl = 'http://127.0.0.1:8000/api/';

  http = inject(HttpClient);

  getStudentClass(day: dateClass) {
    return this.http.post<any>(this.apiUrl + 'studentClasses', day);
  }
  deleteClass(id: number) {
    return this.http.delete<any>(this.apiUrl + 'classes/' + id);
  }
  confitrClass(confirm:confirmClass){
    return this.http.post<any>(this.apiUrl+'classes/confirm', confirm)
  }
  reservationClass(addClass:addClass){
    return this.http.post<any>(this.apiUrl+'classes', addClass);
  }
}
