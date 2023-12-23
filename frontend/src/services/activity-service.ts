
import { Interest } from "../types/Interest";
import { HttpService } from "./http-service";




interface DailyActivityCounts {
    date:Date,
    actionCount:number
    // {
    //     "date": "2023-12-10T00:00:00",
    //     "actionCount": 2
    //   },
}


interface HourlyActivityCounts {
    hour:number
    minute:number
    actionCount:number
    // {
    //     "hour": 6,
    //     "minute": 30,
    //     "actionCount": 1
    //   },
}

class ActivityService extends HttpService<Interest> {
    constructor(url = "/Activity") {
        super(url);
    }



    // get-daily-activity-counts  []
    getDailyActivityCounts(){
        return this.apiClient.get<DailyActivityCounts[]>("/get-daily-activity-counts")
    }
    
    // get-hourly-activity-counts  []
    getHourlyActivityCounts(){
        return this.apiClient.get<HourlyActivityCounts[]>("/get-hourly-activity-counts")
    }
    
    // get-most-active-hours   string[]
    getMostActiveHours(){
        return this.apiClient.get<string[]>("/get-most-active-hours")
    }
    
    // get-least-active-hours   string[]
    getLeastActiveHours(){
        return this.apiClient.get<string[]>("/get-least-active-hours")
    }
    
    // get-dead-hours   string[]
    getDeadHours(){
        return this.apiClient.get<string[]>("/get-dead-hours")
    }
}

const create = () => new ActivityService();

export default create;
