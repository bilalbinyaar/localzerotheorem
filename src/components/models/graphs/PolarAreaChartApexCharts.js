import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ThreeDots } from 'react-loader-spinner';
import { useStateContext } from '../../../ContextProvider';

const PolarAreaChartApexCharts = () => {
  const [series, setSeries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Labels, setLabels] = useState([]);
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
            temp_stats.push(parseInt(data['response'][i].portfolio_allocation));
            temp_labels.push(data['response'][i].strategy_name);
          }
          if (JSON.stringify(model_names) !== '{}') {
            setLabels(temp_labels);
            setSeries(temp_stats);
            setIsLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('Error occurred');
    }
    // eslint-disable-next-line
  }, []);

  const options = {
    chart: {
      type: 'polarArea',
    },
    labels: Labels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'right',
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: false,
        shadeTo: 'dark',
        shadeIntensity: 0.9,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: 'right',
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      {isLoaded ? (
        <ReactApexChart
          options={options}
          series={series}
          type="polarArea"
          width="100%"
        />
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

export default PolarAreaChartApexCharts;
