import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor() { }

  
    private apiUrl ='http://127.0.0.1:8000/api/teacherLesson';
    http= inject(HttpClient);

    getLessonList(){
      return this.http.get<any>(this.apiUrl);
    }
}
