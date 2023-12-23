
import { HttpService } from "./http-service";
import { Interest } from "../types/Interest";




class InterestService extends HttpService<Interest> {
    constructor(url = "/Interest") {
        super(url);
    }



    // get-top-5-interests  []
    getTop5Interests(){
        return this.apiClient.get<string[]>("/get-top-5-interests").then(res => res.data);
    }
    
    // get-bottom-5-interests  []
    getBottom5Interests(){
        return this.apiClient.get<string[]>("/get-bottom-5-interests").then(res => res.data);
    }
    
    // get-unique-interests-count   number
    getIniqueInterestsCount(){
        return this.apiClient.get<number>("/get-unique-interests-count").then(res => res.data);
    }
}

const create = () => new InterestService();

export default create;
