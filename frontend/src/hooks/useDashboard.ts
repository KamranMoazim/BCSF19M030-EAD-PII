// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ActivityServiceCreator from "../services/activity-service"
// import InterestServiceCreator from "../services/interest-service"
// import StudentServiceCreator from "../services/students-service"
// import { DailyActivityCounts, HourlyActivityCounts } from "../types/Activity";
// import { useState } from "react";
// import { DailyStudentCreationData, Distributions } from "../types/Student";



// interface DashboardData {

//     // using ActivityServiceCreator
//     dailyActivityCounts: DailyActivityCounts[],
//     hourlyActivityCounts: HourlyActivityCounts[],
//     MostActiveHours: string[],
//     leastActiveHours: string[],
//     deadHours: string[],

//     // using InterestServiceCreator
//     getTop5Interests: string[],
//     getBottom5Interests: string[]
//     getUniqueInterestsCount: number,

//     // using StudentServiceCreator
//     provincialDistribution: Distributions[],
//     dailyStudentCreationData: DailyStudentCreationData[],
//     ageDistribution: Distributions[],
//     departmentDistribution: Distributions[],
//     degreeDistribution: Distributions[],
//     genderDistribution: Distributions[],
//     studentsStatusGrid: Distributions[],


// }


// const useDashboard = () => {


//     const [dashboardData, setDashboardData] = useState<DashboardData>({
//         dailyActivityCounts: [],
//         hourlyActivityCounts: [],
//         deadHours: [],
//         leastActiveHours: [],
//         MostActiveHours: [],

//         getTop5Interests: [],
//         getBottom5Interests: [],
//         getUniqueInterestsCount: 0,

//         provincialDistribution: [],
//         dailyStudentCreationData: [],
//         ageDistribution: [],
//         departmentDistribution: [],
//         degreeDistribution: [],
//         genderDistribution: [],
//         studentsStatusGrid: [],
//     })

//     const ActivityService = ActivityServiceCreator()

//     // gettting daily activity counts
//     ActivityService
//     .getDailyActivityCounts()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             dailyActivityCounts: data,
//         })
//     })

//     // gettting hourly activity counts
//     ActivityService
//     .getHourlyActivityCounts()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             hourlyActivityCounts: data
//         })
//     })

//     // gettting Most Active Hours
//     ActivityService
//     .getMostActiveHours()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             MostActiveHours: data
//         })
//     })

//     // gettting least Active Hours
//     ActivityService
//     .getLeastActiveHours()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             leastActiveHours: data
//         })
//     })

//     // gettting dead Hours
//     ActivityService
//     .getDeadHours()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             deadHours: data
//         })
//     })







//     const InterestService = InterestServiceCreator()

//     // gettting top 5 interests
//     InterestService
//     .getTop5Interests()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             getTop5Interests: data
//         })
//     })

//     // gettting bottom 5 interests
//     InterestService
//     .getBottom5Interests()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             getBottom5Interests: data
//         })
//     })

//     // gettting unique interests count
//     InterestService
//     .getUniqueInterestsCount()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             getUniqueInterestsCount: data
//         })
//     })


//     const StudentService = StudentServiceCreator()

//     // gettting provincial distribution
//     StudentService
//     .getProvincialDistribution()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             provincialDistribution: data
//         })
//     })

//     // gettting daily student creation data
//     StudentService
//     .getDailyStudentCreationData()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             dailyStudentCreationData: data
//         })
//     })

//     // gettting age distribution
//     StudentService
//     .getAgeDistribution()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             ageDistribution: data
//         })
//     })

//     // gettting department distribution
//     StudentService
//     .getDepartmentDistribution()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             departmentDistribution: data
//         })
//     })

//     // gettting degree distribution
//     StudentService
//     .getDegreeDistribution()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             degreeDistribution: data
//         })
//     })

//     // gender distribution
//     StudentService
//     .getGenderDistribution()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             genderDistribution: data
//         })
//     })

//     // students status grid
//     StudentService
//     .getStudentsStatusGrid()
//     .then((data) => {
//         console.log(data)
//         setDashboardData({
//             ...dashboardData,
//             studentsStatusGrid: data
//         })
//     })

//     return {
//         dashboardData
//     }
// }




// export default useDashboard;





import { useEffect, useState } from 'react';
import ActivityServiceCreator from '../services/activity-service';
import InterestServiceCreator from '../services/interest-service';
import StudentServiceCreator from '../services/students-service';
import { DailyActivityCounts, HourlyActivityCounts } from '../types/Activity';
import { DailyStudentCreationData, Distributions } from '../types/Student';

interface DashboardData {
    dailyActivityCounts: DailyActivityCounts[];
    hourlyActivityCounts: HourlyActivityCounts[];
    MostActiveHours: string[];
    leastActiveHours: string[];
    deadHours: string[];
    getTop5Interests: string[];
    getBottom5Interests: string[];
    getUniqueInterestsCount: number;
    provincialDistribution: Distributions[];
    dailyStudentCreationData: DailyStudentCreationData[];
    ageDistribution: Distributions[];
    departmentDistribution: Distributions[];
    degreeDistribution: Distributions[];
    genderDistribution: Distributions[];
    studentsStatusGrid: Distributions[];
}

const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        dailyActivityCounts: [],
        hourlyActivityCounts: [],
        deadHours: [],
        leastActiveHours: [],
        MostActiveHours: [],
        getTop5Interests: [],
        getBottom5Interests: [],
        getUniqueInterestsCount: 0,
        provincialDistribution: [],
        dailyStudentCreationData: [],
        ageDistribution: [],
        departmentDistribution: [],
        degreeDistribution: [],
        genderDistribution: [],
        studentsStatusGrid: [],
    });

    const ActivityService = ActivityServiceCreator();
    const InterestService = InterestServiceCreator();
    const StudentService = StudentServiceCreator();

    useEffect(() => {

        const fetchData = async () => {

            const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

            // Fetch daily activity counts
            ActivityService.getDailyActivityCounts().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, dailyActivityCounts: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch hourly activity counts
            ActivityService.getHourlyActivityCounts().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, hourlyActivityCounts: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch Most Active Hours
            ActivityService.getMostActiveHours().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, MostActiveHours: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch least Active Hours
            ActivityService.getLeastActiveHours().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, leastActiveHours: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch dead Hours
            ActivityService.getDeadHours().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, deadHours: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch top 5 interests
            InterestService.getTop5Interests().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, getTop5Interests: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch bottom 5 interests
            InterestService.getBottom5Interests().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, getBottom5Interests: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch unique interests count
            InterestService.getUniqueInterestsCount().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, getUniqueInterestsCount: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch provincial distribution
            StudentService.getProvincialDistribution().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, provincialDistribution: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch daily student creation data
            StudentService.getDailyStudentCreationData().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, dailyStudentCreationData: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch age distribution
            StudentService.getAgeDistribution().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, ageDistribution: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch department distribution
            StudentService.getDepartmentDistribution().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, departmentDistribution: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch degree distribution
            StudentService.getDegreeDistribution().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, degreeDistribution: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch gender distribution
            StudentService.getGenderDistribution().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, genderDistribution: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

            // Fetch students status grid
            StudentService.getStudentsStatusGrid().then((data) => {
                setDashboardData((prevData) => ({ ...prevData, studentsStatusGrid: data }));
                return sleep(1000); // Sleep for one second (1000 milliseconds)
            });

        };

        fetchData();
        
    }, []);

    return {
        dashboardData,
    };
};

export default useDashboard;
