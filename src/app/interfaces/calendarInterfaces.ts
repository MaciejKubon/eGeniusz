import { lesson } from './lessonInterfaces';
import { student, teacher } from './userInetrafces';

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
  class: null | classInTerms;
  diffTime?: number;
  posTop?: number;
}

export interface dateClass {
  date: string;
}
export interface classInTerms {
  id: number;
  student: student;
  lesson: lesson;
  confirmed: number
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
export interface deleteClassSucces {
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
export interface deleteClassError {
  message: string;
  error: string;
}
