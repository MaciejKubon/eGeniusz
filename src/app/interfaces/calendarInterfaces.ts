export interface selectTimeTerm{
    dataTerm: string; 
    timeTerm: string;
}
export interface addTerm{
    start_date: string;
    end_date: string;
}


export interface newTermSuccess{
    message: string;
}
export interface newTermError{
    message:string;
    error:{
        start_date?:string[];
        end_date?:string[];
    }
}