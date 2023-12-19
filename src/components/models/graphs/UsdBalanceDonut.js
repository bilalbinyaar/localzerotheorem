import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ThreeDots } from 'react-loader-spinner';

const UsdBalanceDonut = (props) => {
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name !== props.model_name) {
    set_model_name(props.model_name);
  }
  const [isLoaded, setIsLoaded] = useState(false);

  const [labels, setLabels] = useState([]);

  const [usdBalance, setUsdBalance] = useState([]);
  // eslint-disable-next-line
  const [btcBalance, setBtcBalance] = useState([]);
  useEffect(() => {
    try {
      if (props.model_name.includes('collection')) {
        fetch('https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_accounts', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            var model_names = [];
            var usd_balance = [];
            var btc_balance = [];
            console.log('Here is data -->', data);
            for (var i = 0; i < data['response'].length; i++) {
              model_names.push(data['response'][i].name);
              usd_balance.push(data['response'][i].usd_balances);
            }
            if (model_name.length > 0) {
              setBtcBalance(btc_balance);
              setUsdBalance(usd_balance);
              setLabels(model_names);
              setIsLoaded(true);
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log('Error occured ', error);
    }
    // eslint-disable-next-line
  }, [model_name]);

  const options = {
    labels: labels,
    colors: props.model_name.includes('collection')
      ? [
          '#16C784',
          '#FF2E2E',
          '#F9A52B',
          '#4287f5',
          '#9B59B6',
          '#FFD700',
          '#00FFFF',
          '#FF1493',
          '#008080',
          '#DA6B85',
        ]
      : ['#16C784', '#FF2E2E'],
    chart: {
      width: 380,
      height: 260,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -70,
        endAngle: 290,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function (val, opts) {
        return (
          val.replace(/_/g, '-') +
          '       ' +
          opts.w.globals.series[opts.seriesIndex]
        );
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 370,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div id="chart" className="donut-chart">
      {isLoaded ? (
        <ReactApexChart
          options={options}
          series={usdBalance}
          type="donut"
          height={300}
          width={450}
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

export default UsdBalanceDonut;
