import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useStateContext } from '../ContextProvider';
import { ThreeDots } from 'react-loader-spinner';

const PerformancePieChart = (props) => {
  const [model_name, set_model_name] = useState(props.model_name);
  const [labels, setLabels] = useState([]);
  if (model_name !== props.model_name) {
    set_model_name(props.model_name);
  }
  // eslint-disable-next-line
  const [stats, setStats] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [series, setSeries] = useState([]);
  const { link } = useStateContext();
  useEffect(() => {
    try {
      fetch(link + '/get/live_strategies', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          var model_names = {};
          var temp_labels = [];
          var temp_stats = [];
          for (var i = 0; i < data['response'].length; i++) {
            model_names[data['response'][i].strategy_name] = {
              portfolio_allocation: data['response'][i].portfolio_allocation,
            };
            temp_stats.push(data['response'][i].portfolio_allocation);
            temp_labels.push(data['response'][i].strategy_name);
          }
          if (JSON.stringify(model_names) !== '{}') {
            setStats(model_names);
            setSeries(temp_stats);
            setLabels(temp_labels);
            setIsLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [model_name]);

  const options = {
    labels: labels,

    chart: {
      type: 'radialBar',
      width: 700,
    },

    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '10%',
          background: 'transparent',
          image: undefined,
        },
        track: {
          background: '#a6a6a6',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    stroke: {
      colors: ['#FF2E2E'],
    },
    legend: {
      show: true,
      floating: false,
      position: 'right',

      labels: {
        useSeriesColors: true,
      },
      formatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
        },
      },
    ],
  };

  return (
    <div id="chart" className="donut-chart">
      {isLoaded ? (
        <div>
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height={350}
          />
        </div>
      ) : (
        <div className="container loader-container">
          <ThreeDots
            className="backtest-loader"
            color="#fddd4e"
            height={80}
            width={80}
          />
        </div>
      )}
    </div>
  );
};

export default PerformancePieChart;
