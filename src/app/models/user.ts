export interface IUser {
    username:string;
    displayName:string;
    token:string;
}

export interface IUserFormValues{
    email:string;
    password:string;
    displayName?:string;
    userneme?:string;
}