
import { AxiosInstance } from "axios";
import apiClient from "./api-client";
import {  AdminViewUser, LoginResponse, RegisterOrLoginOrCreate, User } from "../types/Auth";
import { QueryParams, QueryResult, Response } from "../types/General";


// /Student?PageNumber=1&PageSize=10&OrderBy=fullName&OrderDirection=0





class AuthService {

    protected apiClient : AxiosInstance

    constructor(protected url = "/Auth") {
        this.url = url;
        this.apiClient = apiClient
    }

    getAllWithQuery({OrderBy, OrderDirection, PageNumber, PageSize}:QueryParams) {
        const controller = new AbortController();

        const queryParams: Record<string, any> = {};
        if (OrderBy) queryParams.OrderBy = OrderBy;
        if (OrderDirection) queryParams.OrderDirection = OrderDirection;
        if (PageNumber) queryParams.PageNumber = PageNumber;
        if (PageSize) queryParams.PageSize = PageSize;

        const request = this.apiClient.get<QueryResult<AdminViewUser>>(this.url, { params: queryParams, signal: controller.signal }).then(res => res.data);;

        return { request, cancel: () => controller.abort() };
    }

    register(registerData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<Response>(`${this.url}/register`, registerData).then(res => res.data);
    }

    login(loginData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<LoginResponse>(`${this.url}/login`, loginData).then(res => res.data);
    }

    me() {
        return this.apiClient.get<User>(`${this.url}/me`);
    }



    createNewSubAdmin(userData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<Response>(`${this.url}/create-new-sub-admin`, userData).then(res => res.data);
    }

    dismissSubAdmin() {
        return this.apiClient.put<Response>(`${this.url}/dismiss-sub-admin/{id}`).then(res => res.data);
    }

    makeSubAdminAgain() {
        return this.apiClient.put<Response>(`${this.url}/make-sub-admin-again/{id}`).then(res => res.data);
    }



    dismissAdmin() {
        return this.apiClient.post<Response>(`${this.url}/dismiss-admin/{id}`).then(res => res.data);
    }

    makeAdminAgain() {
        return this.apiClient.put<Response>(`${this.url}/make-admin-again/{id}`).then(res => res.data);
    }




    updatePassword() {
        return this.apiClient.put<Response>(`${this.url}/update-password/{}`).then(res => res.data);
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
