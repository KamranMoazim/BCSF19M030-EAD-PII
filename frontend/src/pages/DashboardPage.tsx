import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';
import useDashboard from '../hooks/useDashboard';
import PieChartComponent from '../components/PieChartComponent';
import LineChartComponent from '../components/LineChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import ListComponent from '../components/ListComponent';
import StatusGridComponent from '../components/StatusGridComponent';
import { FaTachometerAlt } from 'react-icons/fa';
import "./Dashboard.css"


// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);





const DashboardPage = () => {



    const {dashboardData} = useDashboard()
    // console.log(dashboardData)

    // Use useEffect to simulate fetching data from the backend
    // useEffect(() => {
    // }, []);


    return (
        <Layout>
            <div className="container mt-4">
                <h1 className='text-center'>Dashboard<FaTachometerAlt className="ms-2" /></h1>

                <div className="row">

                    <div className="col-md-10">
                        {/* Top 5 Interests */}
                        <div className="row">
                            <div className="col-md-12">
                                <h4>Top 5 Interests</h4>
                            </div>
                            {dashboardData.top5Interests.map((interest, index) => (
                                <div key={index} className="col-md-2">
                                    <div className="card mbg-success text-white">
                                        <div className="card-body">{interest}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom 5 Interests */}
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <h4>Bottom 5 Interests</h4>
                            </div>
                            {dashboardData.bottom5Interests.map((interest, index) => (
                                <div key={index} className="col-md-2">
                                    <div className="card mbg-danger text-white">
                                        <div className="card-body">{interest}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Distinct Interests */}
                    <div className="col-md-2">
                        {/* <div className="row"> */}
                            <div className="col-md-12">
                                <div className="card mbg-primary text-white">
                                    <div className="card-body">
                                        Distinct Interests: {dashboardData.uniqueInterestsCount}
                                    </div>
                                </div>
                            {/* </div> */}
                        </div>
                    </div>

                </div>


                <div className="row">
                    <div className="col-md-4">
                        {/* Provincial Distribution */}
                        <div className="row mt-4">
                            {/* <Pie data={interestData.provincialDistribution} />; */}
                            <PieChartComponent
                                title='Provincial Distribution'
                                labels={dashboardData.provincialDistribution.keys}
                                data={dashboardData.provincialDistribution.values.map((value) => Number(value))}
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        {/* Submissions Chart */}
                        <div className="row mt-4">
                            <LineChartComponent
                                title='Submissions Chart'
                                rowlables={dashboardData.dailyStudentCreationData.map(d => new Date(d.date)).map(d => d.toDateString())}
                                datasets={[
                                    {
                                        label: 'Submissions',
                                        data: dashboardData.dailyStudentCreationData.map(d => d.studentCount)
                                    }
                                ]}
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        {/* Age Distribution Chart */}
                        <div className="row mt-4">
                            <BarChartComponent title='Age Distribution' 
                                datasets={
                                    [{
                                        label: 'Age Distribution',
                                        data: dashboardData.ageDistribution.values.map((value) => Number(value))
                                    }]
                                } 
                                rowlables={[...dashboardData.ageDistribution.keys]} />
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-4">
                        {/* Department Distribution */}
                        <div className="row mt-4">
                            {/* <Pie data={interestData.provincialDistribution} />; */}
                            <PieChartComponent
                                title='Department Distribution'
                                labels={dashboardData.departmentDistribution.keys}
                                data={dashboardData.departmentDistribution.values.map((value) => Number(value))}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* Degree Distribution */}
                        <div className="row mt-4">
                            <PieChartComponent
                                title='Degree Distribution'
                                labels={dashboardData.degreeDistribution.keys}
                                data={dashboardData.degreeDistribution.values.map((value) => Number(value))}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mt-4">
                            <StatusGridComponent keys={dashboardData.studentsStatusGrid.keys} labels={dashboardData.studentsStatusGrid.values} />
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-4">
                        {/* Provincial Distribution */}
                        <div className="row mt-4">
                                <PieChartComponent
                                    title='Gender Distribution'
                                    labels={dashboardData.genderDistribution.keys}
                                    data={dashboardData.genderDistribution.values.map((value) => Number(value))}
                                />
                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* Last 30 days Activity */}
                        <div className="row mt-4">
                                <LineChartComponent
                                    title='Last 30 days Activity'
                                    rowlables={dashboardData.dailyActivityCounts.map(d => new Date(d.date)).map(d => d.toDateString())}
                                    datasets={[
                                        {
                                            label: 'Last 30 days Activity',
                                            data: dashboardData.dailyActivityCounts.map(d => d.actionCount)
                                        }
                                    ]}
                                />
                        </div>
                    </div>
                    <div className="col-md-4">
                {/* Last 24 Hours Activity */}
                <div className="row mt-4">
                        <LineChartComponent
                            title='Last 24 Hours Activity'
                            rowlables={dashboardData.hourlyActivityCounts.map(d => new Date(d.date)).map(d => String(d.getHours()))}
                            // rowLabels={dashboardData.hourlyActivityCounts.map(d => new Date(d.date).getHours())}
                            datasets={[
                                {
                                    label: 'Last 24 Hours Activity',
                                    data: dashboardData.hourlyActivityCounts.map(d => d.actionCount)
                                }
                            ]}
                        />
                </div>
                    </div>
                </div>


                






                <div className="row">
                    {/* Most active hours in last 30 days */}
                    <div className="col-md-4">
                        <div className="row mt-4" style={{}}>
                            <ListComponent title='Most active hours in last 30 days' list={dashboardData.mostActiveHours} />
                        </div>
                    </div>

                    {/* Least active hours in last 30 days */}
                    <div className="col-md-4">
                        <div className="row mt-4">
                            <ListComponent title='Least active hours in last 30 days' list={dashboardData.leastActiveHours} />
                        </div>
                    </div>

                    {/* Dead Hours hours in last 30 days */}
                    <div className="col-md-4">
                        <div className="row mt-4">
                            <ListComponent title='Least active hours in last 30 days' list={dashboardData.leastActiveHours} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
