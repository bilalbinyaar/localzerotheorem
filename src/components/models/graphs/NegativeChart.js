import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useStateContext } from '../../../ContextProvider';

const NegativeChart = (props) => {
  const { negative_graph_cache, Set_negative_graph_cache, link } =
    useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!negative_graph_cache[props.model_name]) {
      fetch(link + `/${props.model_name}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          var cum_pnl = [];
          for (var index = 0; index < data['response'].length; index++) {
            cum_pnl.push({
              x: new Date(
                parseInt(data['response'][index].ledger_timestamp) * 1000
              ).toLocaleString(),
              y: data['response'][index].pnl_sum,
            });
          }

          if (cum_pnl.length !== 0) {
            set_cum_pnl(cum_pnl);
            Set_negative_graph_cache({ [props.model_name]: cum_pnl });
          }
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(negative_graph_cache[props.model_name]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (cummulative_pnl.length !== 0) {
      set_data_for_pnl_graph([
        {
          data: cummulative_pnl,
          name: 'pnl',
        },
      ]);
    }
  }, [cummulative_pnl]);

  const options = {
    chart: {
      height: 350,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },

    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 10,
      floating: false,
      y: 0,

      labels: {
        style: {
          colors: '#8e8da4',
        },
        offsetY: -7,
        offsetX: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 0.5,
      type: 'gradient',
      colors: ['#16C784', '#B32824'],
    },

    colors: ['#16C784', '#16C784', '#16C784'],

    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm:ss',
      },
      fixed: {
        enabled: false,
        position: 'topRight',
      },
    },

    grid: {
      show: true,
      borderColor: '#43577533',
      yaxis: {
        labels: {
          padding: {
            left: -40,
          },
          offsetX: -60,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        left: -28,
      },
    },
  };

  return (
    <div className="negative-chart">
      <div className="container">
        <div id="chart">
          <ReactApexChart
            options={options}
            series={data_for_pnl_graph}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};
export default NegativeChart;
