// THIS COMPONENT IS BEING USED
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const GroupedBarChart = () => {
  const [strategies, setStrategies] = useState(null);
  const [btcBalance, setBtcBalance] = useState(null);
  const [max_btc, set_max_btc] = useState(null);
  const [series, setSeries] = useState([]);
  useEffect(() => {
    if (strategies == null) {
      fetch('https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_strategies', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          var data_for_strategies = {};

          for (var i = 0; i < data['response'].length; i++) {
            data_for_strategies[data['response'][i].strategy_name] = {
              exchange: data['response'][i].exchange,
            };
          }
          if (JSON.stringify(data_for_strategies) !== '{}') {
            setStrategies(data_for_strategies);
          }
        });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (strategies == null) {
      return;
    } else {
      fetch('https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_accounts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          var data_for_strategies = {};
          var max_btc_balance = 0;
          for (var i = 0; i < data['response'].length; i++) {
            if (data['response'][i].btc_balances > max_btc_balance) {
              max_btc_balance = data['response'][i].btc_balances;
            }
            data_for_strategies[data['response'][i].name] = {
              btc_balance: data['response'][i].btc_balances,
            };
          }
          if (JSON.stringify(data_for_strategies) !== '{}') {
            setBtcBalance(data_for_strategies);
            set_max_btc(max_btc_balance);
          }
        });
    }
  }, [strategies]);

  useEffect(() => {
    if (btcBalance == null) {
      return;
    } else {
      var okx_strategy_btc_balance = [];
      var okx_stratey_name = [];
      var bitmex_strategy_btc_balance = [];
      var bitmex_stratey_name = [];
      var strategies_names = Object.keys(strategies);
      var flag = false;
      for (let i = 0; i < strategies_names.length; i++) {
        if (i + 1 === strategies_names.length) {
          flag = true;
        }
        if (strategies[strategies_names[i]].exchange === 'okx') {
          okx_strategy_btc_balance.push(
            btcBalance[strategies_names[i]].btc_balance
          );
          okx_stratey_name.push(strategies_names[i]);
        } else {
          bitmex_strategy_btc_balance.push(
            btcBalance[strategies_names[i]].btc_balance
          );
          bitmex_stratey_name.push(strategies_names[i]);
        }
      }
      if (flag === true) {
        setSeries([
          {
            name: bitmex_stratey_name[0].replace(/_/g, '-'),
            color: '#16C784',
            data: [bitmex_strategy_btc_balance[0], null],
          },
          {
            name: okx_stratey_name[0].replace(/_/g, '-'),
            color: '#FF2E2E',
            data: [null, okx_strategy_btc_balance[0]],
          },
          {
            name: bitmex_stratey_name[1].replace(/_/g, '-'),
            color: '#00FFFF',
            data: [bitmex_strategy_btc_balance[1], null],
          },
          {
            name: okx_stratey_name[1].replace(/_/g, '-'),
            color: '#F9A52B',
            data: [null, okx_strategy_btc_balance[1]],
          },
          {
            name: bitmex_stratey_name[2].replace(/_/g, '-'),
            color: '#FF1493',
            data: [bitmex_strategy_btc_balance[2], null],
          },
          {
            name: okx_stratey_name[2].replace(/_/g, '-'),
            color: '#4287f5',
            data: [null, okx_strategy_btc_balance[2]],
          },
          {
            name: bitmex_stratey_name[3].replace(/_/g, '-'),
            color: '#008080',
            data: [bitmex_strategy_btc_balance[3], null],
          },
          {
            name: okx_stratey_name[3].replace(/_/g, '-'),
            color: '#9B59B6',
            data: [null, okx_strategy_btc_balance[3]],
          },
          {
            name: bitmex_stratey_name[4].replace(/_/g, '-'),
            color: '#DA6B85',
            data: [bitmex_strategy_btc_balance[4], null],
          },
          {
            name: okx_stratey_name[4].replace(/_/g, '-'),
            color: '#FFD700',
            data: [null, okx_strategy_btc_balance[4]],
          },
        ]);
      }
    }
    // eslint-disable-next-line
  }, [btcBalance]);

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
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
        text: 'BTC Balance',
      },
      labels: {
        show: true,
        align: 'left',
      },
      max: max_btc + 0.01,
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

  return (
    <div className="balance-details balance-details-strategies">
      <div className="container">
        <h2 className="balance-details-strategies-heading">
          Strategies on Different Exchanges
        </h2>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default GroupedBarChart;
