
import { DailyActivityCounts, HourlyActivityCounts } from "../types/Activity";
import { Interest } from "../types/Interest";
import { HttpService } from "./http-service";






class ActivityService extends HttpService<Interest> {
    constructor(url = "/Activity") {
        super(url);
    }



    // get-daily-activity-counts  []
    getDailyActivityCounts(){
        return this.apiClient.get<DailyActivityCounts[]>("/get-daily-activity-counts").then(res => res.data);
    }
    
    // get-hourly-activity-counts  []
    getHourlyActivityCounts(){
        return this.apiClient.get<HourlyActivityCounts[]>("/get-hourly-activity-counts").then(res => res.data);
    }
    
    // get-most-active-hours   string[]
    getMostActiveHours(){
        return this.apiClient.get<string[]>("/get-most-active-hours").then(res => res.data);
    }
    
    // get-least-active-hours   string[]
    getLeastActiveHours(){
        return this.apiClient.get<string[]>("/get-least-active-hours").then(res => res.data);
    }
    
    // get-dead-hours   string[]
    getDeadHours(){
        return this.apiClient.get<string[]>("/get-dead-hours").then(res => res.data);
    }
}

const create = () => new ActivityService();

export default create;