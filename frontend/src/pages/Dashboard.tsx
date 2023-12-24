import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import useDashboard from '../hooks/useDashboard';
import PieChartComponent from '../components/PieChartComponent';
import LineChartComponent from '../components/LineChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import ListComponent from '../components/ListComponent';
import StatusGridComponent from '../components/StatusGridComponent';





const generateRandomColors = (length: number) => {
    const randomColor = () => Math.floor(Math.random() * 256);
    const backgroundColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.2)`);
    const borderColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`);
    return { backgroundColor, borderColor };
};





// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);





const Dashboard = () => {



    const {dashboardData} = useDashboard()
    // console.log(dashboardData)


    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


    const [interestData, setInterestData] = useState({
        topInterests: ['Interest1', 'Interest2', 'Interest3', 'Interest4', 'Interest5'],
        bottomInterests: ['InterestX', 'InterestY', 'InterestZ', 'InterestW', 'InterestV'],
        distinctInterests: 10,
        provincialDistribution: {
            labels: ['Province1', 'Province2', 'Province3'],
            data: [12, 19, 3],
        },
        submissionChart: {
            labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'],
            data: [5, 8, 12, 6, 10],
        },
        ageDistribution: {
            labels: ['18-21', '22-25', '26-30', '31-35'],
            data: [15, 25, 20, 10],
        },
        departmentDistribution: {
            labels: ['DeptA', 'DeptB', 'DeptC'],
            data: [40, 30, 30],
        },
        degreeDistribution: {
            labels: ['Degree1', 'Degree2', 'Degree3'],
            data: [25, 35, 40],
        },
        genderDistribution: {
            labels: ['Male', 'Female', 'Other'],
            data: [45, 35, 20],
        },
        last30DaysActivity: {
            labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'],
            data: [20, 30, 25, 15, 18],
        },
        last24HoursActivity: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            data: [5, 8, 10, 12, 15, 20, 18, 22],
        },
        studentsStatus: {
            studying: 150,
            recentlyEnrolled: 30,
            aboutToGraduate: 20,
            graduated: 100,
        },
        mostActiveHours: ['12:00 PM', '03:00 PM', '06:00 PM'],
        leastActiveHours: ['02:00 AM', '04:00 AM', '05:00 AM'],
        deadHours: ['01:00 AM', '03:00 AM', '04:00 AM'],
    });

    // Use useEffect to simulate fetching data from the backend
    useEffect(() => {
    }, []);


    return (
        <Layout>
            <div className="container mt-4">
                <h1>Dashboard</h1>

                {/* Top 5 Interests */}
                <div className="row">
                    {dashboardData.top5Interests.map((interest, index) => (
                        <div key={index} className="col-md-2">
                            <div className="card bg-success text-white">
                                <div className="card-body">{interest}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom 5 Interests */}
                <div className="row mt-3">
                    {dashboardData.bottom5Interests.map((interest, index) => (
                        <div key={index} className="col-md-2">
                            <div className="card bg-danger text-white">
                                <div className="card-body">{interest}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Distinct Interests */}
                <div className="mt-4">
                    <h4>Distinct Interests: {dashboardData.uniqueInterestsCount}</h4>
                </div>










                {/* Provincial Distribution */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        {/* <Pie data={interestData.provincialDistribution} />; */}
                        <PieChartComponent
                            title='Provincial Distribution'
                            labels={dashboardData.provincialDistribution.keys}
                            data={dashboardData.provincialDistribution.values.map((value) => Number(value))}
                        />
                    </div>
                </div>


                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Age Distribution Chart !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <BarChartComponent title='Age Distribution' datasets={[
                            {
                                label: '20',
                                data: dashboardData.ageDistribution.values.map((value, index) => index == 1 ? Number(value) : 0),
                            }
                        ]} rowlables={[...dashboardData.ageDistribution.keys]} />
                    </div>
                </div>

                {/* Department Distribution */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        {/* <Pie data={interestData.provincialDistribution} />; */}
                        <PieChartComponent
                            title='Department Distribution'
                            labels={dashboardData.departmentDistribution.keys}
                            data={dashboardData.departmentDistribution.values.map((value) => Number(value))}
                        />
                    </div>
                </div>


                {/* Degree Distribution */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <PieChartComponent
                            title='Degree Distribution'
                            labels={dashboardData.degreeDistribution.keys}
                            data={dashboardData.degreeDistribution.values.map((value) => Number(value))}
                        />
                    </div>
                </div>

                {/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! StatusGridComponent !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <StatusGridComponent keys={dashboardData.studentsStatusGrid.keys} labels={dashboardData.studentsStatusGrid.values} />
                    </div>
                </div>



                {/* Provincial Distribution */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <PieChartComponent
                            title='Gender Distribution'
                            labels={dashboardData.genderDistribution.keys}
                            data={dashboardData.genderDistribution.values.map((value) => Number(value))}
                        />
                    </div>
                </div>
                


                {/* Last 30 days Activity */}
                {/* <LineChartComponent 
                    rowlables={dashboardData.dailyActivityCounts.map(d => d.date.toDateString())}
                    datasets={dashboardData.dailyActivityCounts.map(d => ({
                        label: "Last 30 days Activity",
                        data: dashboardData.dailyActivityCounts.map(d => d.actionCount)
                    }))}
                    title='Last 30 days Activity'
                /> */}


                {/* Last 24 Hours Activity */}
                {/* <LineChartComponent 
                    rowlables={dashboardData.hourlyActivityCounts.map(d => d.date.toDateString())}
                    datasets={dashboardData.dailyActivityCounts.map(d => ({
                        label: "Last 24 Hours Activity",
                        data: dashboardData.dailyActivityCounts.map(d => d.actionCount)
                    }))}
                    title='Last 24 Hours Activity'
                /> */}


                {/* Most active hours in last 30 days */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <ListComponent title='Most active hours in last 30 days' list={dashboardData.mostActiveHours} />
                    </div>
                </div>

                {/* Least active hours in last 30 days */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <ListComponent title='Least active hours in last 30 days' list={dashboardData.leastActiveHours} />
                    </div>
                </div>

                {/* Dead Hours hours in last 30 days */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <ListComponent title='Dead Hours in last 30 days' list={dashboardData.deadHours} />
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Dashboard;
