export interface teacher {
  id: number;
  firstName: string | null;
  lastName: string | null;
}

export interface student {
  id: number;
  first_name: string;
  last_name: string;
}

export interface userDetail {
  firstName: string|null;
  lastName: string|null;
  birthday: string|null;
  description: string|null;
  avatar?: string|null;
}

export interface getUsetDetail{
  message:string;
  userDetails:userDetail;
}

export interface updateUserDetailSuccess{
  message:string
}
export interface setUserAvatarSucces{
  message:string;
}
export interface getUserAvatarSucces{
  message:string;
  avatar:string;
}
export interface deleteUserAvatarSucces{
  message:string;
  avatar:string;
}




