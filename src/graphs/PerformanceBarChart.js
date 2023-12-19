import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '../canvasjs.stock.react';
import { useStateContext } from '../ContextProvider';
import { ThreeDots } from 'react-loader-spinner';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const PerformanceBarChart = (props) => {
  const windowWidth = useRef(window.innerWidth);

  var flag = true;
  if (windowWidth.current <= 480) {
    flag = false;
  }
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name !== props.model_name) {
    set_model_name(props.model_name);
  }
  const { link } = useStateContext();
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line
  const [start, setStart] = useState(null);
  // eslint-disable-next-line
  const [end, setEnd] = useState(null);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    try {
      fetch(link + `/get/live_pnls`, {
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
            if (
              parseFloat(data['response'][index].pnl) !== 0 ||
              parseFloat(data['response'][index].pnl) !== -0
            ) {
              cum_pnl.push({
                x: new Date(
                  parseInt(data['response'][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data['response'][index].pnl),
              });
            }
          }

          if (cum_pnl.length !== 0) {
            set_cum_pnl(cum_pnl);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [model_name]);

  useEffect(() => {
    try {
      if (cummulative_pnl.length !== 0) {
        setDataPoints(cummulative_pnl);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log('Error occured');
    }
  }, [cummulative_pnl]);

  const options = {
    theme: 'light2',
    backgroundColor: 'transparent',

    rangeSelector: {
      enabled: false, //change it to true
    },

    charts: [
      {
        zoomEnabled: false, // Enable zoom

        axisX: {
          labelFontSize: 10,
          crosshair: {
            enabled: false,
            snapToDataPoint: false,
            valueFormatString: 'MMM DD YYYY',
          },
        },
        axisY: {
          gridColor: '#43577533',
          tickColor: '#43577533',
          labelFontSize: 10,
          crosshair: {
            enabled: false,

            snapToDataPoint: false,
            valueFormatString: '$#,###.##',
          },
        },
        toolTip: {
          shared: true,
          fontSize: 10,

          contentFormatter: (e) => {
            const date = CanvasJSReact.CanvasJS.formatDate(
              e.entries[0].dataPoint.x,
              ''
            );
            let content = `<strong>${date}</strong><br/><br/>`;

            e.entries.forEach((entry) => {
              content += `<span style="color: ${entry.dataPoint.color};">PNL: </span>${entry.dataPoint.y}<br/>`;
            });

            return content;
          },
        },
        data: [
          {
            showInLegend: false,
            yValueFormatString: '#,##0',
            xValueType: 'dateTime',
            dataPoints: dataPoints.map((point) => ({
              ...point,
              color: point.y >= 0 ? 'green' : 'red',
            })),
          },
        ],
      },
    ],
    navigator: {
      enabled: flag,
      axisX: {
        labelFontSize: 10,
      },
      data: [
        {
          showInLegend: false,
          yValueFormatString: '#,##0',
          xValueType: 'dateTime',
          dataPoints: dataPoints.map((point) => ({
            ...point,
            color: point.y >= 0 ? 'green' : 'red',
          })),
        },
      ],

      slider: {
        minimum: new Date(start * 1000),
        maximum: new Date(end * 1000),
        handleColor: '#fddd4e',
        handleBorderThickness: 5,
        handleBorderColor: '#fddd4e',
      },
    },
  };

  const containerProps = {
    margin: 'auto',
  };

  return (
    <div>
      {isLoaded ? (
        <CanvasJSStockChart containerProps={containerProps} options={options} />
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

export default PerformanceBarChart;
