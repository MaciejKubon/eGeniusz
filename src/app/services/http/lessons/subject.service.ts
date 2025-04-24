import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor() {}

  private apiUrl = 'http://127.0.0.1:8000/api/subject';
  http = inject(HttpClient);

  getSubjectList(){
    return this.http.get<any>(this.apiUrl);
  }
}
