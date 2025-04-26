import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { addTerm } from '../../../interfaces/calendarInterfaces';

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
}
