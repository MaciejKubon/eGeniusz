export interface teacherFilter {
  subjects_id: null | number[];
  levels_id: null | number[];
  minPrice: null | number;
  maxPrice: null | number;
}
export interface teacherList {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  subjects: string[];
  subjectLevels: string[];
  price: number[];
}


export interface teacherListSucces{
  message:string;
  teachers:teacherList[];
}
