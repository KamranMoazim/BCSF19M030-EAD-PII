import { AxiosInstance } from "axios";
import { HttpService } from "./http-service";
import apiClient from "./api-client";

class UtilsService {

    protected apiClient : AxiosInstance

    constructor(protected url = "/Util") {
        this.url = url;
        this.apiClient = apiClient
    }

    getAllDegrees() {
        return this.apiClient.get<string[]>(`${this.url}/degrees`).then(res => res.data);
    }

    deleteDegree(degree:string) {
        return this.apiClient.delete<string[]>(`${this.url}/degrees`, {
            params: {
                value:degree
            }
        }).then(res => res.data);
    }

    createDegree(degree:string) {
        return this.apiClient.post<string[]>(`${this.url}/degrees`, {
            params: {
                value:degree
            }
        }).then(res => res.data);
    }





    getAllDepartments() {
        return this.apiClient.get<string[]>(`${this.url}/departments`).then(res => res.data);
    }

    deleteDepartment(department:string) {
        return this.apiClient.delete<string[]>(`${this.url}/departments`, {
            params: {
                value:department
            }
        }).then(res => res.data);
    }

    createDepartment(department:string) {
        return this.apiClient.post<string[]>(`${this.url}/departments`, {
            params: {
                value:department
            }
        }).then(res => res.data);
    }





    getAllCities() {
        return this.apiClient.get<string[]>(`${this.url}/cities`).then(res => res.data);
    }

    deleteCity(city:string) {
        return this.apiClient.delete<string[]>(`${this.url}/cities`, {
            params: {
                value:city
            }
        }).then(res => res.data);
    }

    createCity(city:string) {
        return this.apiClient.post<string[]>(`${this.url}/cities`, {
            params: {
                value:city
            }
        }).then(res => res.data);
    }


}


const create = () => new UtilsService();

export default create;