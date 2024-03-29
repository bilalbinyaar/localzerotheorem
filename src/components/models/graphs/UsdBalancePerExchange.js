import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useStateContext } from '../../../ContextProvider';
import { ThreeDots } from 'react-loader-spinner';

const UsdBalancePerExchange = (props) => {
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name !== props.model_name) {
    set_model_name(props.model_name);
  }
  const [isLoaded, setIsLoaded] = useState(false);

  const [labels, setLabels] = useState([]);
  // eslint-disable-next-line
  const [usdBalance, setUsdBalance] = useState([]);
  const [btcBalance, setBtcBalance] = useState([]);
  const { link } = useStateContext();
  useEffect(() => {
    try {
      if (props.model_name.includes('collection')) {
        fetch(link + '/get/live_exchange', {
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

            var balance = [];

            model_names.push('Bitmex');
            model_names.push('Okx');
            balance.push(data['response'][0].bitmex_usd_balance);
            balance.push(data['response'][0].okx_usd_balance);

            if (model_name.length > 0) {
              setBtcBalance(balance);
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
    colors: ['#666699', '#e600e6'],
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
          '     ' +
          opts.w.globals.series[opts.seriesIndex]
        );
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
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
          series={btcBalance}
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

export default UsdBalancePerExchange;
