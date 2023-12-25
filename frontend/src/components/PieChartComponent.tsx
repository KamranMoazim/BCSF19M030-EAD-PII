import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


const generateRandomColors = (length:number) => {
    const randomColor = () => Math.floor(Math.random() * 256);
    // const randomColor2 = () => Math.floor(Math.random() * 512);
    // const randomColor3 = () => Math.floor(Math.random() * 768);
    // const randomColor4 = () => Math.floor(Math.random() * 1024);
    // const randomColor5 = () => Math.floor(Math.random() * 1280);
    // const randomColor6 = () => Math.floor(Math.random() * 1536);
    // const r1 = (() => Math.floor(Math.random() * 256))();
    // const r2 = (() => Math.floor(Math.random() * 256))();
    // const r3 = (() => Math.floor(Math.random() * 256))();
    // const r4 = (() => Math.floor(Math.random() * 256))();
    // const r5 = (() => Math.floor(Math.random() * 256))();
    // const r6 = (() => Math.floor(Math.random() * 256))();
    
    // const backgroundColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor2()}, ${randomColor3()}, 0.2)`);
    // const borderColor = Array.from({ length }, () => `rgba(${randomColor4()}, ${randomColor5()}, ${randomColor6()}, 1)`);

    const backgroundColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.2)`);
    const borderColor = Array.from({ length }, () => `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`);


    // const backgroundColor = Array.from({ length }, () => `rgba(${r1}, ${r2}, ${r3}, 0.2)`);
    // const borderColor = Array.from({ length }, () => `rgba(${r4}, ${r5}, ${r6}, 1)`);
    

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

// export 

const PieChartComponent = ({data, labels, title}:PieChartProps) => {

    const { backgroundColor, borderColor } = generateRandomColors(labels.length);

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