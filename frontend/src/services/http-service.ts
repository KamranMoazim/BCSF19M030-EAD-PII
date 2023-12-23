import { AxiosInstance } from "axios";
import apiClient from "./api-client";

interface Entity {
    id: number;
}

export class HttpService<T extends Entity> {

    protected apiClient : AxiosInstance

    constructor(protected url = "") {
        this.url = url;
        this.apiClient = apiClient
    }

    getAll() {
        const controller = new AbortController();

        const request = this.apiClient.get<T>(this.url, { signal: controller.signal });

        return { request, cancel: () => controller.abort() };
    }

    delete(id:number) {
        return this.apiClient.delete(`${this.url}/${id}`);
    }

    create(entity:T) {
        return this.apiClient.post(this.url, entity);
    }

    update(id:number, entity:T) {
        return this.apiClient.put(`${this.url}/${id}`, entity);
    }
}

const create = (endpoint:string) => new HttpService(endpoint);

export default create;
