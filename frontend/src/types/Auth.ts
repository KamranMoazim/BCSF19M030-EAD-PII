

export interface RegisterOrLoginOrCreate {
    email:string
    password:string
}

export interface User {
    id:number
    email:string
}

export interface LoginResponse {
    token:string
    user:User
}