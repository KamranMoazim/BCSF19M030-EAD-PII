import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    

const Dashboard = () => {

    const [interestData, setInterestData] = useState({
        topInterests: ['Interest1', 'Interest2', 'Interest3', 'Interest4', 'Interest5'],
        bottomInterests: ['InterestX', 'InterestY', 'InterestZ', 'InterestW', 'InterestV'],
        distinctInterests: 10,
        provincialDistribution: {
            labels: ['Province1', 'Province2', 'Province3'],
            data: [30, 40, 30],
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
        // Fetch data from the backend and update state
        // For now, we're using static data
    }, []);


    return (
        <div className="container mt-4">
            <h1>Dashboard</h1>

            {/* Top 5 Interests */}
            <div className="row">
                {interestData.topInterests.map((interest, index) => (
                    <div key={index} className="col-md-2">
                        <div className="card bg-success text-white">
                            <div className="card-body">{interest}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom 5 Interests */}
            <div className="row mt-3">
                {interestData.bottomInterests.map((interest, index) => (
                    <div key={index} className="col-md-2">
                        <div className="card bg-danger text-white">
                            <div className="card-body">{interest}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Distinct Interests */}
            <div className="mt-4">
                <h4>Distinct Interests: {interestData.distinctInterests}</h4>
            </div>

            {/* Provincial Distribution */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <h4>Provincial Distribution</h4>
                    <PieChart width={400} height={400}>
                        <Pie dataKey="value" data={interestData.provincialDistribution.data} cx={200} cy={200} outerRadius={80} fill="#8884d8">
                            {interestData.provincialDistribution.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>

            {/* Submission Chart */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <h4>Submission Chart</h4>
                    <BarChart width={500} height={300} data={interestData.submissionChart.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>

            {/* ... (other Recharts charts) */}
        </div>
    );
};

export default Dashboard;
