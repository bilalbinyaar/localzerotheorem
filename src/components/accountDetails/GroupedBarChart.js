import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GroupedBarChart = () => {
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['BitMEX', 'OKX'],
            labels: {
                show: true,
            },
        },
        yaxis: {
            title: {
                text: 'BTC Price',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return `${val} BTC`;
                },
            },
        },
        legend: {
            position: 'top',
        },
    };

    const bitmexData = [0.5, 0.7, 0.9, 1.1, 1.3];
    const okxData = [0.6, 0.8, 1.0, 1.2, 1.4];

    return (
        <div className='container'>
            <ReactApexChart
                options={options}
                series={[
                    { name: 'BitMEX', data: [bitmexData[0], null] },
                    { name: 'OKX', data: [null, okxData[0]] },
                    { name: 'BitMEX', data: [bitmexData[1], null] },
                    { name: 'OKX', data: [null, okxData[1]] },
                    { name: 'BitMEX', data: [bitmexData[2], null] },
                    { name: 'OKX', data: [null, okxData[2]] },
                    { name: 'BitMEX', data: [bitmexData[3], null] },
                    { name: 'OKX', data: [null, okxData[3]] },
                    { name: 'BitMEX', data: [bitmexData[4], null] },
                    { name: 'OKX', data: [null, okxData[4]] },
                ]}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default GroupedBarChart;
