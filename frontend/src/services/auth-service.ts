
import { AxiosInstance } from "axios";
import apiClient from "./api-client";
import {  LoginResponse, RegisterOrLoginOrCreate, User } from "../types/Auth";
import { Response } from "../types/General";


// /Student?PageNumber=1&PageSize=10&OrderBy=fullName&OrderDirection=0

interface QueryParams {
    PageNumber : number
    PageSize : number
    OrderBy : string
    OrderDirection : 0 | 1
}



class AuthService {

    protected apiClient : AxiosInstance

    constructor(protected url = "/Auth") {
        this.url = url;
        this.apiClient = apiClient
    }

    register(registerData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<Response>(`${this.url}/register`, registerData);
    }

    login(loginData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<LoginResponse>(`${this.url}/login`, loginData);
    }

    me() {
        return this.apiClient.get<User>(`${this.url}/me`);
    }



    createNewSubAdmin(userData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<Response>(`${this.url}/create-new-sub-admin`, userData);
    }

    dismissSubAdmin() {
        return this.apiClient.put<Response>(`${this.url}/dismiss-sub-admin/{id}`);
    }

    makeSubAdminAgain() {
        return this.apiClient.put<Response>(`${this.url}/make-sub-admin-again/{id}`);
    }



    dismissAdmin() {
        return this.apiClient.post<Response>(`${this.url}/dismiss-admin/{id}`);
    }

    makeAdminAgain() {
        return this.apiClient.put<Response>(`${this.url}/make-admin-again/{id}`);
    }




    updatePassword() {
        return this.apiClient.put<Response>(`${this.url}/update-password/{}`);
    }

    // getAll() {
    //     const controller = new AbortController();

    //     const request = this.apiClient.get<T>(this.url, { signal: controller.signal });

    //     return { request, cancel: () => controller.abort() };
    // }

    // delete(id:number) {
    //     return this.apiClient.delete(`${this.url}/${id}`);
    // }

    // create(entity:T) {
    //     return this.apiClient.post(this.url, entity);
    // }

    // update(id:number, entity:T) {
    //     return this.apiClient.put(`${this.url}/${id}`, entity);
    // }
}

const create = () => new AuthService();

export default create;
