import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { addTerm, dateTerm} from '../../../interfaces/calendarInterfaces';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  constructor() {}

  private apiUrl = 'http://127.0.0.1:8000/api/';

  http = inject(HttpClient);

  setTerm(term:addTerm){
    return this.http.post<any>(this.apiUrl+'term',term);
  }
  getTermDetail(id:number){
    return this.http.get<any>(this.apiUrl+'term/'+id);
  }
  getTeacherTerm(day:dateTerm)
  {
    return this.http.post<any>(this.apiUrl+'dayTeacherTerm', day);
  }
  deleteTerm(id:number){
    return this.http.delete<any>(this.apiUrl+'term/'+id);

  }
}
