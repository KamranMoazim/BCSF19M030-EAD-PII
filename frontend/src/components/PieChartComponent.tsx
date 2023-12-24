import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


const generateRandomColors = (length:number) => {
    const randomColor = () => Math.floor(Math.random() * 256);
    const backgroundColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.2)`);
    const borderColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`);
    return { backgroundColor, borderColor };
};

// {
//     data: [12, 19, 3],
//     backgroundColor, 
//     borderColor,
//     borderWidth: 1,
// }

// interface SinglePieChartProp {
//     data:number[],
//     backgroundColor:string[]
//     borderColor:string[],
//     borderWidth: 1
// }

interface PieChartProps {
    title:string
    labels:string[],
    data:number[]
}

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Pie Chart',
        },
    },
};

const PieChartComponent = ({data, labels, title}:PieChartProps) => {

    const { backgroundColor, borderColor } = generateRandomColors(3);

    const chartData = {
        labels,
        datasets:[{
            data,
            backgroundColor,
            borderColor,
            borderWidth:1
        }]
    }

    return (
        <div className='center-text justify'>
            <h4>
                {title}
            </h4>
            <Pie options={options} data={chartData} />;
        </div>
    )
}

export default PieChartComponent