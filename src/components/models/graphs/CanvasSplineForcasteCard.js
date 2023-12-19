import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from '../../../canvasjs.react';
import { useStateContext } from '../../../ContextProvider';
import { ThreeDots } from 'react-loader-spinner';
import { store } from '../../../store';

function CanvasSplineForcasteCard(props) {
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    negative_canvasjs_graph_cache,
    Set_negative_canvasjs_graph_cache,
    link,
  } = useStateContext();
  const [
    forecastSpline_canvasjs_graph_cache,
    Set_forecastSpline_canvasjs_graph_cache,
  ] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);
  const [options, setOptions] = useState({});
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  useEffect(() => {
    const storedItem = sessionStorage.getItem(props.model_name);
    // console.log("Here is testing local storage ", storedItem)
    if (storedItem) {
      // console.log("I am here to die", JSON.parse(storedItem))
      set_cum_pnl(JSON.parse(storedItem));
    } else {
      fetch(link + `/${props.model_name}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          sessionStorage.setItem(props.model_name, JSON.stringify(data));
          set_cum_pnl(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (cummulative_pnl.length != 0) {
      const fetchData = async () => {
        try {
          // console.log("Here is pnl after session ", cummulative_pnl)
          if (cummulative_pnl) {
            var main_series = [];
            var temp_positive_series = [];
            var temp_negative_series = [];
            var temp_last_data_positive = {};
            var temp_last_data_negative = {};
            var data = cummulative_pnl;
            for (var index = 0; index < data['response'].length; index++) {
              if (index + 1 == data['response'].length) {
                if (temp_positive_series.length != 0) {
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
                  if (temp_negative_series.length != 0) {
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
                  if (temp_positive_series.length != 0) {
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
            // console.log("Testing data -->", main_series);

            if (main_series.length != 0) {
              // localStorage.setItem(props.model_name, JSON.stringify(main_series));
              // sessionStorage.setItem(props.model_name, JSON.stringify(main_series))
              // set_cum_pnl(main_series);
              // console.log("Here is data before saving -->", main_series)
              // Set_negative_canvasjs_graph_cache({
              //   [props.model_name]: main_series,
              // });
              setOptions({
                backgroundColor: 'transparent',
                theme: 'light2',
                animationEnabled: false,
                data: main_series,
                toolTip: {
                  enabled: true,
                },
                axisY: {
                  gridColor: '#43577533',
                  gridThickness: 0,
                  // minimum: -20,
                  // maximum: 150,
                  labelFontColor: 'rgb(55, 61, 63)',
                  tickColor: '#43577533',
                  tickThickness: 0,
                  labelFormatter: function () {
                    return ' ';
                  },
                },
                axisX: {
                  labelFontColor: 'rgb(55, 61, 63)',
                  gridThickness: 0,
                  tickColor: '#43577533',
                  tickThickness: 0,
                  lineThickness: 0,
                  lineColor: '#43577577',
                  labelFormatter: function () {
                    return ' ';
                  },
                },
              });
              setIsLoaded(true);
            }
            // console.log("Datagrid canvas data -->", cummulative_pnl.length);
          }
        } catch (error) {
          console.error('Error occurred:', error);
        }
      };

      fetchData(); // Call the async function
    }
  }, [cummulative_pnl]);

  return (
    <div className="dataGrid-spline">
      {isLoaded ? (
        <CanvasJSChart options={options} />
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
}

export default CanvasSplineForcasteCard;
