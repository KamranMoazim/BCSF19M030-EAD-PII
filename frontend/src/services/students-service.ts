
import { QueryParams, QueryResult } from "../types/General";
import { AddUpdateStudent, DailyStudentCreationData, Distributions, Student } from "../types/Student";
import { HttpService } from "./http-service";


// /Student?PageNumber=1&PageSize=10&OrderBy=fullName&OrderDirection=0




class StudentService extends HttpService<Student> {
    constructor(url = "/Student") {
        super(url);
    }

    new_create(entity: AddUpdateStudent): Promise<any> {
        console.log(entity)
        return this.apiClient.post(this.url, entity);
    }

    new_update(id:number, entity: AddUpdateStudent): Promise<any> {
        return this.apiClient.put(`${this.url}/${id}`, entity);
    }


    getSingleStudent(id: number) {
        const controller = new AbortController();

        const request = this.apiClient.get<Student>(`${this.url}/${id}`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    getAllStudents() {
        const controller = new AbortController();

        const request = this.apiClient.get<Student[]>(`${this.url}/all`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    getAllWithQuery({ OrderBy, OrderDirection, PageNumber, PageSize }: QueryParams) {
        const controller = new AbortController();

        const queryParams: Record<string, any> = {};
        // if (OrderBy) queryParams.OrderBy = OrderBy;
        // if (OrderDirection) queryParams.OrderDirection = OrderDirection;
        // if (PageNumber) queryParams.PageNumber = PageNumber;
        // if (PageSize) queryParams.PageSize = PageSize;
        queryParams.OrderBy = OrderBy;
        queryParams.OrderDirection = OrderDirection;
        queryParams.PageNumber = PageNumber;
        queryParams.PageSize = PageSize;

        const request = this.apiClient.get<QueryResult<Student>>(this.url, { params: queryParams, signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    // get-provincial-distribution  {}
    getProvincialDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-provincial-distribution`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    // get-daily-student-creation-data  []
    getDailyStudentCreationData() {
        const controller = new AbortController();

        const request = this.apiClient.get<DailyStudentCreationData[]>(`${this.url}/get-daily-student-creation-data`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    // get-age-distribution  {}
    getAgeDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-age-distribution`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    // get-department-distribution   {}
    getDepartmentDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-department-distribution`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    // get-degree-distribution   {}
    getDegreeDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-degree-distribution`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }

    // get-gender-distribution   {}
    getGenderDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-gender-distribution`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }


    // get-students-status-grid   {}
    getStudentsStatusGrid() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-students-status-grid`, { signal: controller.signal }).then(res => res.data);

        // return { request, cancel: () => controller.abort() };
        return request
    }
}

const create = () => new StudentService();

export default create;
