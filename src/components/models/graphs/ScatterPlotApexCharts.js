import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useStateContext } from '../../../ContextProvider';

const ScatterPlotApexCharts = () => {
  // eslint-disable-next-line
  const [scatterPlotData, setScatterPlotData] = useState([]);
  // eslint-disable-next-line
  const [linePlotData, setLinePlotData] = useState([]);
  const { theme, link } = useStateContext();
  const [Flag, setFlag] = useState(null);
  const [color, setColor] = useState(theme === 'dark-theme' ? '#FFF' : '#000');
  const [curr_theme, set_curr_theme] = useState(theme);
  if (curr_theme !== theme) {
    set_curr_theme(theme);
    setFlag(Flag === true ? false : true);
    setColor(theme === 'dark-theme' ? '#FFF' : '#000');
  }
  const [options, setOptions] = useState({
    series: [
      {
        type: 'scatter',
        data: scatterPlotData,
      },
      {
        name: 'Line',
        type: 'line',
        data: linePlotData,
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
      },
    },

    yaxis: {
      title: {
        text: 'Market Returns',
        offsetX: -10,
      },

      opposite: false,
      forceNiceScale: false,
      floating: false,
      labels: {
        align: 'center',
        style: {
          colors: '#000000',
        },
        offsetX: 20,
      },
    },
    fill: {
      type: 'solid',
    },
    markers: {
      size: [6, 0],
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: 'numeric',
      title: {
        text: 'PNL Returns',
      },
    },
  });

  useEffect(() => {
    fetch(link + `/get/live_pnls`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        'ngrok-skip-browser-warning': 'true',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const temp_data = [];
        const temp_line_data = [];

        for (let i = 0; i < data['response'].length; i++) {
          temp_data.push({
            x: data['response'][i].pnl,

            y: data['response'][i].btc_return,
          });
          temp_line_data.push({
            x: data['response'][i].pnl,

            y: data['response'][i].best_fit,
          });
        }

        if (temp_data.length !== 0) {
          const sorted_scatter_data = temp_data.sort(function (a, b) {
            return a.x - b.x;
          });
          const sorted_line_data = temp_line_data.sort(function (a, b) {
            return a.x - b.x;
          });

          setOptions({
            series: [
              {
                name: 'PNL-Market Returns',
                type: 'scatter',
                data: sorted_scatter_data,
              },
              {
                name: 'Best fit',
                color: '#fddd4e',
                type: 'line',

                data: sorted_line_data,
              },
            ],
            chart: {
              height: 350,
              type: 'line',
              toolbar: {
                show: false, // Hide the chart toolbar
              },
            },
            annotations: {
              yaxis: [
                {
                  y: 0,
                  borderColor: color,
                  borderWidth: 2, // Adjust the stroke width here

                  label: {
                    borderColor: '#000000',
                    strokeColor: '#000000',
                    fillColor: '#000000',
                    style: {
                      color: '#000000',
                      background: '#000000',
                    },
                  },
                },
              ],
              xaxis: [
                {
                  x: 0,
                  borderColor: color,
                  borderWidth: 2, // Adjust the stroke width here

                  label: {
                    borderColor: '#000000',
                    style: {
                      color: '#000000',
                      background: '#000000',
                    },
                  },
                },
              ],
            },
            stroke: { width: 2 },
            xaxis: {
              title: {
                text: 'PNL Returns',
              },
              tickAmount: 10,
              labels: {
                align: 'center',

                formatter: function (val) {
                  return parseFloat(val).toFixed(1);
                },
              },
              type: 'numeric',
            },
            tooltip: {
              custom: function ({ seriesIndex, dataPointIndex, w }) {
                const point = w.config.series[seriesIndex].data[dataPointIndex];
                const x = point.x;
                const y = point.y;

                return `<div class="apexcharts-tooltip-custom" style="padding: 4px;">
                  <span>Portfolio Return: ${x}%</span><br>
                  <span>Market Return: ${y}%</span>
                </div>`;
              },
            },
            yaxis: {
              title: {
                text: 'Market Returns',
                offsetX: -10,
              },

              opposite: false,
              forceNiceScale: false,
              floating: false,
              labels: {
                align: 'center',
                style: {
                  colors: '#000000',
                },
                offsetX: 20,
              },
            },

            fill: {
              type: 'solid',
            },
            markers: {
              size: [6, 0],
            },

            legend: {
              show: false,
              position: 'top',
            },
            grid: {
              show: false,
            },
          });
        }
      });
    // eslint-disable-next-line
  }, [Flag]);
  return (
    <div className="scattered">
      <div className="containered">
        <ReactApexChart
          options={options}
          series={options.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default ScatterPlotApexCharts;
