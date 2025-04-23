import { teacher } from "./userInetrafces";

export interface subject{
    id: number;
    name:string;
}
export interface subject_level{
    id: number;
    name:string;
}
export interface lesson{
    id:number;
    subject:subject;
    subject_level:subject_level;
    teacher:teacher;
    price:number;
}


export interface lessonSucces{
    message:string;
    lessons:lesson[];
}
