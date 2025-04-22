export interface register{
    email: string|null;
    password: string|null;
    rePassword:string|null;
    role: string|null;
}
export interface login{
    email:string|null;
    password:string|null;
}
export interface authRole{
    role:string;
}
export interface registerError{
    email?: string[];
    password?: string[];
    rePassword?:string[];
    role?: string[];
}
export interface registerSucces{
    message:string;
}
export interface loginSucces{
    message:string;
    role:string;
    token:string;
}
export interface authSucces{
    message:string
}
