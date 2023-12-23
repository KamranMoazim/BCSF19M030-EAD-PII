
import { Student } from "../types/Student";
import { HttpService } from "./http-service";


// /Student?PageNumber=1&PageSize=10&OrderBy=fullName&OrderDirection=0

interface QueryParams {
    PageNumber : number
    PageSize : number
    OrderBy : string
    OrderDirection : 0 | 1
}

interface ProvincialDistribution {
    City:string
}

class StudentService extends HttpService<Student> {
    constructor(url = "/Student") {
        super(url);
    }

    getAllWithQuery({OrderBy, OrderDirection, PageNumber, PageSize}:QueryParams) {
        const controller = new AbortController();

        const request = this.apiClient.get<Student>(this.url, { signal: controller.signal });

        return { request, cancel: () => controller.abort() };
    }

    getProvincialDistribution() {
    }

    // get-daily-student-creation-data  []

    // get-age-distribution  {}

    // get-department-distribution   {}

    // get-degree-distribution   {}

    // get-gender-distribution   {}

    // get-students-status-grid   {}
}

const create = () => new StudentService();

export default create;
