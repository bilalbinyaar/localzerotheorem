// THIS COMPONENT IS BEING USED
import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '../../../canvasjs.stock.react';
import { useStateContext } from '../../../ContextProvider';
import { ThreeDots } from 'react-loader-spinner';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CanvasjsDrawdownWithSliderRange = (props) => {
  const windowWidth = useRef(window.innerWidth);

  var flag = true;
  if (windowWidth.current <= 480) {
    flag = false;
  }
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name !== props.model_name) {
    set_model_name(props.model_name);
  }
  // eslint-disable-next-line
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [options, setOptions] = useState({
    backgroundColor: 'transparent',
    theme: 'light2',
    animationEnabled: false,
    rangeSelector: {
      enabled: false, //change it to true
    },
    navigator: {
      enabled: flag,

      axisX: {
        labelFontSize: 10,
      },
      slider: {
        handleColor: '#fddd4e',
        handleBorderThickness: 1,
        handleBorderColor: '#fddd4e',
      },
    },
  });
  const [start, setStart] = useState(null);
  // eslint-disable-next-line
  const [end, setEnd] = useState(null);
  const {
    drawdown_canvasjs_graph_cache,
    Set_drawdown_canvasjs_graph_cache,
    link,
  } = useStateContext();
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    try {
      if (!drawdown_canvasjs_graph_cache[props.model_name]) {
        fetch(link + `/${props.model_name}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((response) => response.json())
          .then(async (data) => {
            var main_series = [];

            for (var index = 0; index < data['response'].length; index++) {
              main_series.push({
                x: new Date(
                  parseInt(data['response'][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data['response'][index].drawdown),
              });
            }

            if (main_series.length !== 0) {
              let start_time = parseInt(data['response'][0].timestamp);
              let end_time = parseInt(
                data['response'][data['response'].length - 1].timestamp
              );
              let avg = (end_time - start_time) / 2;
              let result = avg + start_time;

              setStart(result);
              setEnd(
                parseInt(
                  data['response'][data['response'].length - 1].timestamp
                )
              );
              set_cum_pnl([
                {
                  type: 'splineArea',
                  color: '#ff2e2e',
                  markerType: 'none',
                  fillOpacity: 0.4,
                  dataPoints: main_series,
                },
              ]);
              Set_drawdown_canvasjs_graph_cache({
                [props.model_name]: main_series,
              });
              setIsLoaded(true);
            }
          })
          .catch((err) => console.log(err));
      } else {
        set_cum_pnl([
          {
            type: 'splineArea',
            color: '#ff2e2e',
            markerType: 'none',
            fillOpacity: 0.4,
            dataPoints: drawdown_canvasjs_graph_cache[props.model_name],
          },
        ]);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [model_name]);

  useEffect(() => {
    try {
      if (cummulative_pnl.length !== 0) {
        setDataPoints(cummulative_pnl);
        setOptions({
          theme: 'light2',
          backgroundColor: 'transparent',

          charts: [
            {
              zoomEnabled: false, // Enable zoom

              axisX: {
                labelFontSize: 10,
                gridColor: '#43577533',
                tickColor: '#43577533',
                lineThickness: 1,
                tickLength: 0,
                crosshair: {
                  enabled: false,
                  snapToDataPoint: false,
                  valueFormatString: 'MMM DD YYYY',
                },
              },
              rangeSelector: {
                enabled: false, //change it to true
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
                    content += `<span style="color: ${entry.dataPoint.color};">Drawdown: </span>${entry.dataPoint.y}<br/>`;
                  });

                  return content;
                },
              },
              data: cummulative_pnl,
            },
          ],
          navigator: {
            enabled: flag,
            axisX: {
              labelFontSize: 10,
            },
            data: cummulative_pnl,
            slider: {
              minimum: new Date(start * 1000),
              maximum: new Date(start * 1000),
              handleColor: '#000000',
              handleBorderThickness: 1,
              handleBorderColor: '#fddd4e',
            },
          },
        });
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [cummulative_pnl]);

  const containerProps = {
    width: '100%',
    height: '450px',
    margin: 'auto',
  };

  return (
    <div className="canvas-main-div">
      {isLoaded ? (
        <div className="container">
          <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
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

export default CanvasjsDrawdownWithSliderRange;
