import React from 'react'
import { Line } from 'react-chartjs-2';


const generateRandomColors = (length:number) => {
    const randomColor = () => Math.floor(Math.random() * 256);
    const backgroundColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.2)`);
    const borderColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`);
    return { backgroundColor, borderColor };
};

interface Dataset {
    label:string
    data:number[]
    // borderColor:string
    // backgroundColor:string

}

interface LineChartProps {
    title:string
    rowlables:string[],
    datasets:Dataset[]
}

// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top' as const,
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Line Chart',
//         },
//     },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const line3data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: [1, 2, 3, 4, 5, 5, 6],
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//             label: 'Dataset 2',
//             data: [1, 2, 5, 4, 15, 5, 6],
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };


const LineChartComponent = ({datasets, rowlables, title}:LineChartProps) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const linedata = {
        labels:rowlables,
        datasets: datasets.map((dataset) => {
            const {backgroundColor, borderColor} = generateRandomColors(1)
            return {
                label: dataset.label,
                data: dataset.data,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
            }
        })
    };

    return (
        <div className='center-text justify'>
            <h4>
                {title}
            </h4>
            <Line options={options} data={linedata} />;
        </div>
    )
}

export default LineChartComponent