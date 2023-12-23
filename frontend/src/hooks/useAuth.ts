import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_DASHBOARD } from "../constants/constants";
import ActivityServiceCreator from "../services/activity-service"
import { DailyActivityCounts } from "../types/Activity";




const useAuth = () => {

    const ActivityService = ActivityServiceCreator()

    const DailyActivityCountsQuery = useQuery<DailyActivityCounts[], Error>({
        // queryKey: ['todos'],
        queryKey: CACHE_KEY_DASHBOARD,
        queryFn: ActivityService.getDailyActivityCounts,
        staleTime: 1000 * 60, // 1 minute
    });

    return {
        // user:null
        user:{
            role:"Student"
        }
    }
}




export default useAuth;