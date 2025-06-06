import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TermsListService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  http = inject(HttpClient);
  constructor() {}

  getTeacherTermsList() {
    return this.http.get<any>(this.apiUrl + 'teacherHome');
  }
  getStudentTermsList() {
    return this.http.get<any>(this.apiUrl + 'studentHome');
  }
}
