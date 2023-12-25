

export interface RegisterOrLoginOrCreate {
    email:string
    password:string
}

export interface User {
    id:number
    email:string
    role:string
}

export interface UpdateUserRole {
    role:string
}


export interface NewUser {
    email:string
    password:string
    role:string
}

export interface LoginResponse {
    token:string
    user:User
}

export interface AdminViewUser {
    id:number
    email:string
    password:string
    role:string
    isDeleted:boolean
    createdBy:string
    createdOn:Date
    modifiedBy:string
    modifiedOn:Date
}