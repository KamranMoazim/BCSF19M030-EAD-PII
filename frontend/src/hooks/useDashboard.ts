import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_DASHBOARD } from "../constants/constants";
import ActivityServiceCreator from "../services/activity-service"
import { DailyActivityCounts } from "../types/Activity";




const useDashboard = () => {

    const ActivityService = ActivityServiceCreator()

    // const {data } = useQuery<DailyActivityCounts[], Error>({
    //     // queryKey: ['todos'],
    //     queryKey: CACHE_KEY_DASHBOARD,
    //     queryFn: ActivityService.getDailyActivityCounts,
    //     staleTime: 1000 * 60, // 1 minute
    // });

    // console.log(data)

    return {
        
    }
}




export default useDashboard;