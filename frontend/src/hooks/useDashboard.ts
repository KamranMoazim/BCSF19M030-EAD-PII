
import { useEffect, useState } from 'react';
import ActivityServiceCreator from '../services/activity-service';
import InterestServiceCreator from '../services/interest-service';
import StudentServiceCreator from '../services/students-service';
import { DailyActivityCounts, HourlyActivityCounts } from '../types/Activity';
import { DailyStudentCreationData, Distributions } from '../types/Student';

interface DashboardData {
    dailyActivityCounts: DailyActivityCounts[];
    hourlyActivityCounts: HourlyActivityCounts[];
    mostActiveHours: string[];
    leastActiveHours: string[];
    deadHours: string[];
    top5Interests: string[];
    bottom5Interests: string[];
    uniqueInterestsCount: number;
    provincialDistribution: Distributions[];
    dailyStudentCreationData: DailyStudentCreationData[];
    ageDistribution: Distributions[];
    departmentDistribution: Distributions[];
    degreeDistribution: Distributions[];
    genderDistribution: Distributions[];
    studentsStatusGrid: Distributions[];
}


function extractKeysAndValues(data: Distributions[]) {
    const keys = data.map(item => item.key);
    const values = data.map(item => item.value);

    return { keys, values };
}

const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        dailyActivityCounts: [],
        hourlyActivityCounts: [],
        deadHours: [],
        leastActiveHours: [],
        mostActiveHours: [],
        top5Interests: [],
        bottom5Interests: [],
        uniqueInterestsCount: 0,
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

            try {
                const [
                    dailyActivityCount,
                    hourlyActivityCount,
                    mostActiveHours,
                    leastActiveHours,
                    deadHours,
                    top5Interests,
                    bottom5Interests,
                    uniqueInterestsCount,
                    provincialDistribution,
                    dailyStudentCreationData,
                    ageDistribution,
                    departmentDistribution,
                    degreeDistribution,
                    genderDistribution,
                    studentsStatusGrid,
                ] = await Promise.all([
                    ActivityService.getDailyActivityCounts(),
                    ActivityService.getHourlyActivityCounts(),
                    ActivityService.getMostActiveHours(),
                    ActivityService.getLeastActiveHours(),
                    ActivityService.getDeadHours(),
                    InterestService.getTop5Interests(),
                    InterestService.getBottom5Interests(),
                    InterestService.getUniqueInterestsCount(),
                    StudentService.getProvincialDistribution(),
                    StudentService.getDailyStudentCreationData(),
                    StudentService.getAgeDistribution(),
                    StudentService.getDepartmentDistribution(),
                    StudentService.getDegreeDistribution(),
                    StudentService.getGenderDistribution(),
                    StudentService.getStudentsStatusGrid(),
                ].map(async (fetchFunction) => {
                    const data = await fetchFunction;
                    return data;
                }));
    
                setDashboardData({
                    dailyActivityCounts:dailyActivityCount as DailyActivityCounts[],
                    hourlyActivityCounts:hourlyActivityCount as HourlyActivityCounts[],
                    mostActiveHours: mostActiveHours as string[],
                    leastActiveHours: leastActiveHours as string[],
                    deadHours: deadHours as string[],
                    top5Interests: top5Interests as string[],
                    bottom5Interests: bottom5Interests as string[],
                    uniqueInterestsCount: uniqueInterestsCount as number,
                    provincialDistribution: provincialDistribution as Distributions[],
                    dailyStudentCreationData: dailyStudentCreationData as DailyStudentCreationData[],
                    ageDistribution: ageDistribution as Distributions[],
                    departmentDistribution: departmentDistribution as Distributions[],
                    degreeDistribution: degreeDistribution as Distributions[],
                    genderDistribution: genderDistribution as Distributions[],
                    studentsStatusGrid: studentsStatusGrid as Distributions[],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        
    }, []);

    return {
        dashboardData : {
            ...dashboardData,
            provincialDistribution : {...extractKeysAndValues(dashboardData.provincialDistribution)},
            ageDistribution: {...extractKeysAndValues(dashboardData.ageDistribution)},
            departmentDistribution: {...extractKeysAndValues(dashboardData.departmentDistribution)},
            degreeDistribution: {...extractKeysAndValues(dashboardData.degreeDistribution)},
            genderDistribution: {...extractKeysAndValues(dashboardData.genderDistribution)},
            studentsStatusGrid: {...extractKeysAndValues(dashboardData.studentsStatusGrid)},
        }
    };
};

export default useDashboard;
