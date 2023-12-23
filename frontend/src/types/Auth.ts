

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

export interface AdminViewUser {
    // "email": "user@example.com",
    //   "password": "$2a$12$A3kwcSKU590ZUG6Nagoe7eW1StcjFYVxZF8K5e2fX/oKrZ0HUU94C",
    //   "role": "Student",
    //   "isDeleted": false,
    //   "createdBy": null,
    //   "createdOn": "2023-12-10T20:46:35.9031402",
    //   "modifiedBy": null,
    //   "modifiedOn": null,
    //   "id": 4
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