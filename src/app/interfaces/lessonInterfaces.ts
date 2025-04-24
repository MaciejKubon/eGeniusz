import { subject } from './subjectIntefeces';
import { subjectLevel } from './subjectLevelInterfaces';
import { teacher } from './userInetrafces';

export interface lesson {
  id: number;
  subject: subject;
  subject_level: subjectLevel;
  teacher: teacher;
  price: number;
}
export interface addLesson {
  subject_id: number|null;
  subject_level_id: number|null;
  price: number|null;
}

export interface lessonSucces {
  message: string;
  lessons: lesson[];
}
export interface addLessonSucces{
    message:string;
}
