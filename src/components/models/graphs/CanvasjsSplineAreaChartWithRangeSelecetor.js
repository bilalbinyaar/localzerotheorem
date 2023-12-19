import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '../../../canvasjs.stock.react';
import { useStateContext } from '../../../ContextProvider';
import { ThreeDots } from 'react-loader-spinner';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CanvasjsSplineAreaChartWithRangeSelecetor = (props) => {
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
  const [end, setEnd] = useState(null);
  const {
    drawdown_negative_canvasjs_graph_cache,
    Set_drawdown_negative_canvasjs_graph_cache,
    link,
  } = useStateContext();
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    try {
      if (!drawdown_negative_canvasjs_graph_cache[props.model_name]) {
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
            var temp_positive_series = [];
            var temp_negative_series = [];
            var temp_last_data_positive = {};
            var temp_last_data_negative = {};
            for (var index = 0; index < data['response'].length; index++) {
              if (index + 1 === data['response'].length) {
                if (temp_positive_series.length !== 0) {
                  if (main_series.length > 0) {
                    if (JSON.stringify(temp_last_data_negative) !== '{}') {
                      temp_positive_series.unshift(temp_last_data_negative);
                      main_series.push({
                        type: 'splineArea',
                        color: '#16c784',
                        markerType: 'none',
                        fillOpacity: 0.4,
                        dataPoints: temp_positive_series,
                      });
                    }
                  } else {
                    main_series.push({
                      type: 'splineArea',
                      color: '#16c784',
                      markerType: 'none',
                      fillOpacity: 0.4,
                      dataPoints: temp_positive_series,
                    });
                  }
                } else {
                  if (main_series.length > 0) {
                    if (JSON.stringify(temp_last_data_positive) !== '{}') {
                      temp_negative_series.unshift(temp_last_data_positive);
                      main_series.push({
                        type: 'splineArea',
                        color: '#ff2e2e',
                        markerType: 'none',
                        fillOpacity: 0.4,
                        dataPoints: temp_negative_series,
                      });
                    }
                  } else {
                    main_series.push({
                      type: 'splineArea',
                      color: '#ff2e2e',
                      markerType: 'none',
                      fillOpacity: 0.4,
                      dataPoints: temp_negative_series,
                    });
                  }
                }
              } else {
                if (parseFloat(data['response'][index].pnl_sum) >= 0) {
                  if (temp_negative_series.length !== 0) {
                    if (main_series.length > 0) {
                      if (JSON.stringify(temp_last_data_positive) !== '{}') {
                        temp_negative_series.unshift(temp_last_data_positive);
                        main_series.push({
                          type: 'splineArea',
                          color: '#ff2e2e',
                          markerType: 'none',
                          fillOpacity: 0.4,
                          dataPoints: temp_negative_series,
                        });
                        temp_negative_series = [];
                        temp_last_data_positive = {
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        };
                        temp_positive_series.push({
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        });
                      } else {
                        main_series.push({
                          type: 'splineArea',
                          color: '#ff2e2e',
                          markerType: 'none',
                          fillOpacity: 0.4,
                          dataPoints: temp_negative_series,
                        });
                        temp_negative_series = [];
                        temp_last_data_positive = {
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        };
                        temp_positive_series.push({
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        });
                      }
                    } else {
                      main_series.push({
                        type: 'splineArea',
                        color: '#ff2e2e',
                        markerType: 'none',
                        fillOpacity: 0.4,
                        dataPoints: temp_negative_series,
                      });
                      temp_negative_series = [];
                      temp_last_data_positive = {
                        x: new Date(
                          parseInt(data['response'][index].ledger_timestamp) *
                            1000
                        ),
                        y: parseFloat(data['response'][index].pnl_sum),
                      };
                      temp_positive_series.push({
                        x: new Date(
                          parseInt(data['response'][index].ledger_timestamp) *
                            1000
                        ),
                        y: parseFloat(data['response'][index].pnl_sum),
                      });
                    }
                  } else {
                    temp_last_data_positive = {
                      x: new Date(
                        parseInt(data['response'][index].ledger_timestamp) *
                          1000
                      ),
                      y: parseFloat(data['response'][index].pnl_sum),
                    };
                    temp_positive_series.push({
                      x: new Date(
                        parseInt(data['response'][index].ledger_timestamp) *
                          1000
                      ),
                      y: parseFloat(data['response'][index].pnl_sum),
                    });
                  }
                } else {
                  if (temp_positive_series.length !== 0) {
                    if (main_series.length > 0) {
                      if (JSON.stringify(temp_last_data_positive) !== '{}') {
                        temp_positive_series.unshift(temp_last_data_negative);
                        main_series.push({
                          type: 'splineArea',
                          color: '#16c784',
                          markerType: 'none',
                          fillOpacity: 0.4,
                          dataPoints: temp_positive_series,
                        });
                        temp_positive_series = [];
                        temp_last_data_negative = {
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        };
                        temp_negative_series.push({
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        });
                      } else {
                        main_series.push({
                          type: 'splineArea',
                          color: '#16c784',
                          markerType: 'none',
                          fillOpacity: 0.4,
                          dataPoints: temp_positive_series,
                        });
                        temp_positive_series = [];
                        temp_last_data_negative = {
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        };
                        temp_negative_series.push({
                          x: new Date(
                            parseInt(data['response'][index].ledger_timestamp) *
                              1000
                          ),
                          y: parseFloat(data['response'][index].pnl_sum),
                        });
                      }
                    } else {
                      main_series.push({
                        type: 'splineArea',
                        color: '#16c784',
                        markerType: 'none',
                        fillOpacity: 0.4,
                        dataPoints: temp_positive_series,
                      });
                      temp_positive_series = [];
                      temp_last_data_negative = {
                        x: new Date(
                          parseInt(data['response'][index].ledger_timestamp) *
                            1000
                        ),
                        y: parseFloat(data['response'][index].pnl_sum),
                      };
                      temp_negative_series.push({
                        x: new Date(
                          parseInt(data['response'][index].ledger_timestamp) *
                            1000
                        ),
                        y: parseFloat(data['response'][index].pnl_sum),
                      });
                    }
                  } else {
                    temp_last_data_negative = {
                      x: new Date(
                        parseInt(data['response'][index].ledger_timestamp) *
                          1000
                      ),
                      y: parseFloat(data['response'][index].pnl_sum),
                    };
                    temp_negative_series.push({
                      x: new Date(
                        parseInt(data['response'][index].ledger_timestamp) *
                          1000
                      ),
                      y: parseFloat(data['response'][index].pnl_sum),
                    });
                  }
                }
              }
            }

            if (main_series.length !== 0) {
              let len = data['response'].length - 1;
              let start_time = parseInt(data['response'][0].ledger_timestamp);
              let end_time = parseInt(data['response'][len].ledger_timestamp);
              let avg = (end_time - start_time) / 2;
              let result = avg + start_time;
              setStart(new Date(result) * 1000);
              setEnd(
                new Date(parseInt(data['response'][len].ledger_timestamp)) *
                  1000
              );

              set_cum_pnl(main_series);
              Set_drawdown_negative_canvasjs_graph_cache({
                [props.model_name]: main_series,
              });
              setIsLoaded(true);
            }
          })
          .catch((err) => console.log(err));
      } else {
        set_cum_pnl(drawdown_negative_canvasjs_graph_cache[props.model_name]);
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
                  var counter = 0;
                  e.entries.forEach((entry) => {
                    if (counter === 0) {
                      content += `<span style="color: ${entry.dataPoint.color};">PNL: </span>${entry.dataPoint.y}<br/>`;
                      counter = 2;
                    }
                  });

                  return content;
                },
              },
              data: cummulative_pnl,
            },
          ],
          navigator: {
            axisX: {
              labelFontSize: 10,
            },
            data: cummulative_pnl,
            slider: {
              minimum: start,
              maximum: end,
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

export default CanvasjsSplineAreaChartWithRangeSelecetor;
