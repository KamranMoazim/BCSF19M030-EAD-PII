
import { AxiosInstance } from "axios";
import apiClient from "./api-client";
import {  AdminViewUser, LoginResponse, NewUser, RegisterOrLoginOrCreate, UpdateUserRole, User } from "../types/Auth";
import { QueryParams, QueryResult, Response, WithSearchQueryParams } from "../types/General";
import useAuthStore from "../state-management/auth/authStore";


// /Student?PageNumber=1&PageSize=10&OrderBy=fullName&OrderDirection=0





class AuthService {

    protected apiClient : AxiosInstance

    constructor(protected url = "/Auth") {
        this.url = url;
        this.apiClient = apiClient
    }

    getAllWithQuery({OrderBy, OrderDirection, PageNumber, PageSize, SearchString}:WithSearchQueryParams) {
        const controller = new AbortController();

        const queryParams: Record<string, any> = {};
        queryParams.OrderBy = OrderBy;
        queryParams.OrderDirection = OrderDirection;
        queryParams.PageNumber = PageNumber;
        queryParams.PageSize = PageSize;
        queryParams.SearchString = SearchString

        const request = this.apiClient.get<QueryResult<AdminViewUser>>(`${this.url}/users`, { params: queryParams, signal: controller.signal }).then(res => res.data);;

        // return { request, cancel: () => controller.abort() };
        return request
    }

    register(registerData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<Response>(`${this.url}/register`, registerData).then(res => res.data);
    }

    login(loginData:RegisterOrLoginOrCreate) {
        return this.apiClient.post<LoginResponse>(`${this.url}/login`, loginData).then(res => res.data);
    }

    // me() {
    //     return this.apiClient.get<User>(`${this.url}/me`);
    // }



    createNewUser(userData:NewUser) {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };

        return this.apiClient.post<Response>(`${this.url}/create-new-user`, userData,{
            headers: headers,
        }).then(res => res.data);
    }

    dismissUser(id:number) {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };
        return this.apiClient.put<Response>(`${this.url}/dismiss-user/${id}`, {}, {
            headers: headers,
        }).then(res => res.data);
    }

    updateUserRole(id:number, role:UpdateUserRole) {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };
        return this.apiClient.put<Response>(`${this.url}/update-user-role/${id}`, role ,{
            headers: headers,
        }).then(res => res.data);
    }






    updatePassword(id:number) {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };
        return this.apiClient.put<Response>(`${this.url}/update-user-password/${id}`, {}, {
            headers: headers,
        }).then(res => res.data);
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
