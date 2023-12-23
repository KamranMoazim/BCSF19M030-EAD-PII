
import { QueryParams, QueryResult } from "../types/General";
import { DailyStudentCreationData, Distributions, Student } from "../types/Student";
import { HttpService } from "./http-service";


// /Student?PageNumber=1&PageSize=10&OrderBy=fullName&OrderDirection=0




class StudentService extends HttpService<Student> {
    constructor(url = "/Student") {
        super(url);
    }

    getAllWithQuery({ OrderBy, OrderDirection, PageNumber, PageSize }: QueryParams) {
        const controller = new AbortController();

        const queryParams: Record<string, any> = {};
        if (OrderBy) queryParams.OrderBy = OrderBy;
        if (OrderDirection) queryParams.OrderDirection = OrderDirection;
        if (PageNumber) queryParams.PageNumber = PageNumber;
        if (PageSize) queryParams.PageSize = PageSize;

        const request = this.apiClient.get<QueryResult<Student>>(this.url, { params: queryParams, signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }

    // get-provincial-distribution  {}
    getProvincialDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-provincial-distribution`, { signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }

    // get-daily-student-creation-data  []
    getDailyStudentCreationData() {
        const controller = new AbortController();

        const request = this.apiClient.get<DailyStudentCreationData[]>(`${this.url}/get-daily-student-creation-data`, { signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }

    // get-age-distribution  {}
    getAgeDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-age-distribution`, { signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }

    // get-department-distribution   {}
    getDepartmentDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-department-distribution`, { signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }

    // get-degree-distribution   {}
    getDegreeDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-degree-distribution`, { signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }

    // get-gender-distribution   {}
    getGenderDistribution() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-gender-distribution`, { signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }


    // get-students-status-grid   {}
    getStudentsStatusGrid() {
        const controller = new AbortController();

        const request = this.apiClient.get<Distributions[]>(`${this.url}/get-students-status-grid`, { signal: controller.signal }).then(res => res.data);

        return { request, cancel: () => controller.abort() };
    }
}

const create = () => new StudentService();

export default create;
