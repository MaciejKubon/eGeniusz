import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectLevelService {
  constructor() {}

  private apiUrl = 'http://127.0.0.1:8000/api/subjectLevel';
  http = inject(HttpClient);

  getSubjectLevelList() {
    return this.http.get<any>(this.apiUrl);
  }
}
