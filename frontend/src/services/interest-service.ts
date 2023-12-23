
import { AxiosResponse } from "axios";
import { Interest } from "../types/Student";
import { HttpService } from "./http-service";




class InterestService extends HttpService<Interest> {
    constructor(url = "/Interest") {
        super(url);
    }



    // get-top-5-interests  []
    getTop5Interests(){
        return this.apiClient.get<string[]>("/get-top-5-interests")
    }
    
    // get-bottom-5-interests  []
    getBottom5Interests(){
        return this.apiClient.get<string[]>("/get-bottom-5-interests")
    }
    
    // get-unique-interests-count   number
    getIniqueInterestsCount(){
        return this.apiClient.get<number>("/get-unique-interests-count")
    }
}

const create = () => new InterestService();

export default create;
