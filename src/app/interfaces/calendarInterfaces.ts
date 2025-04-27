import { teacher } from './userInetrafces';

export interface selectTimeTerm {
  dataTerm: string;
  timeTerm: string;
}
export interface addTerm {
  start_date: string;
  end_date: string;
}
export interface dayTerm {
  date: string;
  terms: terms[];
}
export interface dateTerm {
  date: string;
}
export interface terms {
  id: number;
  start_date: string;
  end_date: string;
  teacher: teacher;
  class: null;
  diffTime?: number;
  posTop?: number;
}
export interface newTermSuccess {
  message: string;
}
export interface dayTermSucces {
  message: string;
  terms: terms[];
}
export interface termDetailSucces {
  message: string;
  terms: terms;
}
export interface deleteTermSucces {
  message: string;
}
export interface newTermError {
  message: string;
  error: {
    start_date?: string[];
    end_date?: string[];
  };
}
export interface deleteTermError {
  message: string;
  error: string;
}
