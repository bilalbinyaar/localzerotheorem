import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '../canvasjs.stock.react';
import { useStateContext } from '../ContextProvider';
import { ThreeDots } from 'react-loader-spinner';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const PerformanceMultiLine = (props) => {
  const windowWidth = useRef(window.innerWidth);

  var flag = true;
  if (windowWidth.current <= 480) {
    flag = false;
  }
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name !== props.model_name) {
    set_model_name(props.model_name);
  }
  const [dataPoints, setDataPoints] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line
  const [start, setStart] = useState(null);
  // eslint-disable-next-line
  const [end, setEnd] = useState(null);
  const { Set_individual_pnl_graph_cache, link } = useStateContext();
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (
      props.model_name.includes('strategy') ||
      props.model_name.split('_').length === 3
    ) {
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
            if (
              (parseFloat(data['response'][index].pnl) !== 0 ||
                parseFloat(data['response'][index].pnl) !== -0) &&
              parseInt(data['response'][index].in_position) === 0
            ) {
              console.log(
                'Here is PNL -->',
                parseInt(data['response'][index].in_position) === 0
              );
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
            Set_individual_pnl_graph_cache({ [props.model_name]: cum_pnl });
          }
        })
        .catch((err) => console.log(err));
    } else {
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
          var cum_pnl_2 = [];
          for (var index = 0; index < data['response'].length; index++) {
            if (
              parseFloat(data['response'][index].pnl_sum) !== 0 ||
              parseFloat(data['response'][index].pnl_sum) !== -0
            ) {
              cum_pnl.push({
                x: new Date(
                  parseInt(data['response'][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data['response'][index].pnl_sum),
                smooth: false,
              });
              cum_pnl_2.push({
                x: new Date(
                  parseInt(data['response'][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data['response'][index].smooth_pnl_sum),
                smooth: true,
              });
            }
          }

          if (cum_pnl.length !== 0) {
            set_cum_pnl(cum_pnl);
            setDataPoints2(cum_pnl_2);
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [model_name]);

  useEffect(() => {
    if (cummulative_pnl.length !== 0) {
      setDataPoints(cummulative_pnl);
      setIsLoaded(true);
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
              'DD/MM/YYYY HH:mm:ss'
            );
            let content = `<strong>${date}</strong><br/><br/>`;
            e.entries.forEach((entry) => {
              if (entry.dataPoint.smooth === false) {
                content += `<span style="color: black;">PNL Sum: </span>${entry.dataPoint.y}<br/>`;
              } else {
                content += `<span style="color: black;">Smooth PNL Sum: </span>${entry.dataPoint.y}<br/>`;
              }
            });

            return content;
          },
        },
        legend: {
          fontSize: 15,
          verticalAlign: 'top',
          horizontalAlign: 'left',
          markerMargin: 4,
        },
        data: [
          {
            showInLegend: true,
            legendText: 'PNL Sum',
            color: '#16c784',
            fontSize: 40,
            margin: 20, // Adjust the value as per your requirements

            type: 'spline',
            yValueFormatString: '#,##0',
            legendMarkerBorderColor: '#008000',

            xValueType: 'dateTime',
            dataPoints: dataPoints.map((point) => ({
              ...point,
              color: point.y >= 0 ? '#16c784' : '#ff2e2e',
              lineColor: point.y >= 0 ? '#16c784' : '#ff2e2e',
              legendMarkerColor: '#ff2e2e',
            })),
          },
          {
            showInLegend: true,
            type: 'spline',
            legendText: '30d PNL Sum',
            color: '#fddd4e',

            yValueFormatString: '#,##0',

            xValueType: 'dateTime',
            dataPoints: dataPoints2.map((point) => ({
              ...point,
              color: '#fddd4e',
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
          type: 'spline',
          yValueFormatString: '#,##0',
          xValueType: 'dateTime',
          dataPoints: dataPoints.map((point) => ({
            ...point,
            color: point.y >= 0 ? '#16c784' : '#ff2e2e',
            lineColor: point.y >= 0 ? '#16c784' : '#ff2e2e',
          })),
        },
        {
          showInLegend: false,
          type: 'spline',
          yValueFormatString: '#,##0',
          xValueType: 'dateTime',
          dataPoints: dataPoints2.map((point) => ({
            ...point,
            color: '#fddd4e',
            lineColor: '#fddd4e',
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
            className="backtest-loader loader-responsiveness"
            color="#fddd4e"
            height={80}
            width={80}
          />
        </div>
      )}
    </div>
  );
};

export default PerformanceMultiLine;
