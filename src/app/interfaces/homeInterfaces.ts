export interface homeTerms {
  id: number;
  start_date: string;
  end_date: string;
  class_id: number | null;
  confirmed: number | null;
  first_name: string | null;
  last_name: string | null;
  subject_name: string|null;
  subject_level_name: string|null;
  lesson_price:string|null;
}

export interface termsList{
    terms?:homeTerms[];
    classes:homeTerms[];
    confirmClasses:homeTerms[];
}
export interface termsListSuccess{
    message:string;
    term:termsList;
}