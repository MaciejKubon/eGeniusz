import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { addLesson, lesson } from '../../../interfaces/lessonInterfaces';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor() { }

  
    private apiUrl ='http://127.0.0.1:8000/api/';

    http= inject(HttpClient);

    getLessonList(){
      return this.http.get<any>(this.apiUrl+'teacherLesson');
    }
    setLesson(lesson:addLesson){
      return this.http.post<any>(this.apiUrl+'lesson', lesson);
    }
    deleteLesson(id:number){
      return this.http.delete<any>(this.apiUrl+'lesson/'+id);
    }
}
