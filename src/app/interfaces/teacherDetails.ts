import { terms } from './calendarInterfaces';
import { subject } from './subjectIntefeces';
import { subjectLevel } from './subjectLevelInterfaces';

export interface teacherLesson {
  id: number;
  subject: subject;
  subjectLevel: subjectLevel;
  price: number;
}
export interface teacherDetails {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  description: string;
  lessons: teacherLesson[];
}
export interface calnedar {
  date: string;
  teacherId: string|null;
}
export interface calendarData{
  date: string;
  studentTerms: terms[];
  teacherTerms: terms[];
}
export interface claendarDataSucces{
  message:string;
  studentTerms: terms[];
  teacherTerms: terms[];
}
export interface teacherDetailsSucces {
  message: string;
  teacher: teacherDetails;
}
