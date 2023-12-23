import apiClient from "./api-client";

class DashboardService {
    constructor(url = "") {
        this.url = url;
    }

    getAll() {
        const controller = new AbortController();

        const request = apiClient.get(this.url, { signal: controller.signal });

        return { request, cancel: () => controller.abort() };
    }

    delete(id) {
        return apiClient.delete(`${this.url}/${id}`);
    }

    create(entity) {
        return apiClient.post(this.url, entity);
    }

    update(id, entity) {
        return apiClient.put(`${this.url}/${id}`, entity);
    }
}

const create = (endpoint) => new DashboardService(endpoint);

export default create;
