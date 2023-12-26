import { AxiosInstance } from "axios";
import { HttpService } from "./http-service";
import apiClient from "./api-client";
import useAuthStore from "../state-management/auth/authStore";

class UtilsService {

    protected apiClient : AxiosInstance

    constructor(protected url = "/Util") {
        this.url = url;
        this.apiClient = apiClient
    }

    getAllDegrees = () => {
        return this.apiClient.get<string[]>(`${this.url}/degrees`).then(res => res.data);
    }

    deleteDegree = (degree:string) => {

        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };

        return this.apiClient.delete<string[]>(`${this.url}/degrees`, {
            params: {
                value:degree
            },
            headers: headers,
        }).then(res => res.data);
    }

    createDegree = (degree:string) => {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };
        return this.apiClient.post<string[]>(`${this.url}/degrees?value=${degree}`, {
            // params: {
            //     value:degree
            // }
        }, {
            headers: headers,
        }).then(res => res.data);
    }





    getAllDepartments = () => {
        return this.apiClient.get<string[]>(`${this.url}/departments`).then(res => res.data);
    }

    deleteDepartment = (department:string) => {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };

        return this.apiClient.delete<string[]>(`${this.url}/departments`, {
            params: {
                value:department
            },
            headers: headers,
        }).then(res => res.data);
    }

    createDepartment = (department:string) => {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };

        return this.apiClient.post<string[]>(`${this.url}/departments?value=${department}`, {
            // params: {
            //     value:department
            // }
        }, {
            headers: headers,
        }).then(res => res.data);
    }





    getAllCities = () => {
        return this.apiClient.get<string[]>(`${this.url}/cities`).then(res => res.data);
    }

    deleteCity = (city:string) => {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };

        return this.apiClient.delete<string[]>(`${this.url}/cities`, {
            params: {
                value:city
            },
            headers: headers,
        }).then(res => res.data);
    }

    createCity = (city:string) => {
        const headers = {
            Authorization: `Bearer ${useAuthStore.getState().user?.token}`,
        };

        return this.apiClient.post<string[]>(`${this.url}/cities?value=${city}`, {
            // params: {
            //     value:city
            // }

        }, {
            headers: headers,
        }).then(res => res.data);
    }


}


const create = () => new UtilsService();

export default create;