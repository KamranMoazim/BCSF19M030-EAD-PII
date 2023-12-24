import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_DASHBOARD } from "../constants/constants";
import ActivityServiceCreator from "../services/activity-service"
import { DailyActivityCounts, HourlyActivityCounts } from "../types/Activity";
import { useState } from "react";



interface DashboardData {

    // using ActivityServiceCreator
    dailyActivityCounts: DailyActivityCounts[],
    hourlyActivityCounts: HourlyActivityCounts[],
    MostActiveHours: string[],
    leastActiveHours: string[],
    deadHours: string[],

    // using InterestServiceCreator
    getTop5Interests: string[],
    getBottom5Interests: string[]
    getUniqueInterestsCount: number,

}


const useDashboard = () => {


    const [dashboardData, setDashboardData] = useState<DashboardData>({
        dailyActivityCounts: [],
        hourlyActivityCounts: [],
        deadHours: [],
        leastActiveHours: [],
        MostActiveHours: []
    })

    const ActivityService = ActivityServiceCreator()

    // gettting daily activity counts
    ActivityService
    .getDailyActivityCounts()
    .then((data) => {
        console.log(data)
        setDashboardData({
            ...dashboardData,
            dailyActivityCounts: data,
        })
    })

    // gettting hourly activity counts
    ActivityService
    .getHourlyActivityCounts()
    .then((data) => {
        console.log(data)
        setDashboardData({
            ...dashboardData,
            hourlyActivityCounts: data
        })
    })

    // gettting Most Active Hours
    ActivityService
    .getMostActiveHours()
    .then((data) => {
        console.log(data)
        setDashboardData({
            ...dashboardData,
            MostActiveHours: data
        })
    })

    // gettting least Active Hours
    ActivityService
    .getLeastActiveHours()
    .then((data) => {
        console.log(data)
        setDashboardData({
            ...dashboardData,
            leastActiveHours: data
        })
    })

    // gettting dead Hours
    ActivityService
    .getDeadHours()
    .then((data) => {
        console.log(data)
        setDashboardData({
            ...dashboardData,
            deadHours: data
        })
    })



    return {
        dashboardData
    }
}




export default useDashboard;