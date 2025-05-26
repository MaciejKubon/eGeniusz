import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { calnedar } from '../../../interfaces/teacherDetails';

@Injectable({
  providedIn: 'root',
})
export class TeacherDetailsService {
  constructor() {}

  private apiUrl = 'http://127.0.0.1:8000/api/';

  http = inject(HttpClient);

  getTeacherDetails(id: string|null) {
    return this.http.get<any>(this.apiUrl + 'teacher/'+id);
  }
  getCalendar(data:calnedar){
    return this.http.post<any>(this.apiUrl+'teacher/calendar', data);
  }
}
