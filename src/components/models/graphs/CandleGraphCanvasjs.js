import { last } from "@amcharts/amcharts5/.internal/core/util/Array";
import React, { useState, useEffect, memo, useRef } from "react";
import CanvasJSReact from "../../../canvasjs.stock.react";
import { useStateContext } from "../../../ContextProvider";
import { ThreeDots } from "react-loader-spinner";

// import dotenv from "dotenv";
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

function CandleGraphCanvasjs(props) {
  // dotenv.config();
  // console.log("Here is the secrect key -->", process.env.REACT_APP_SECRET_KEY);
  const api_key = process.env.REACT_APP_SECRET_KEY;
  const windowWidth = useRef(window.innerWidth);
  // const [flag_for_navigator, set_flag_for_navigator] = useState(true);
  // if (windowWidth.current <= 480) {
  //   set_flag_for_navigator(false);
  // }
  const [model_name, set_model_name] = useState(null);
  const [last_minute, set_last_minute] = useState(null);
  // console.log("I am here with values -->", props.model_name, model_name);

  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const chartRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [startX, setStartX] = useState(null);

  const handlePinchStart = (event) => {
    if (event.touches.length === 2) {
      setIsZooming(true);
      setStartX(event.touches[0].clientX);
    }
  };

  const handlePinchMove = (event) => {
    if (isZooming && event.touches.length === 2) {
      const currentX = event.touches[0].clientX;
      const delta = currentX - startX;

      if (delta > 0) {
        chartRef.current.zoomIn();
      } else if (delta < 0) {
        chartRef.current.zoomOut();
      }

      setStartX(currentX);
    }
  };

  const handlePinchEnd = () => {
    setIsZooming(false);
    setStartX(null);
  };

  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const [dataPoints3, setDataPoints3] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [start_date, set_start_date] = useState(null);
  const [entry_price, set_entry_price] = useState(null);
  const [current_price, set_current_price] = useState(null);

  const [strategies, setStrategies] = useState(null);
  const {
    strategies_cache,
    Set_strategies_cache,
    Set_coin_search_selection_cache,
    Set_model_search_selection_cache, link
  } = useStateContext();
  useEffect(() => {
    try {
      if (
        props.model_name.includes("strategy") ||
        props.model_name.split("_").length == 3
      ) {
        fetch(
          link + "/get/live_strategies",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["response"].length);
            var data_for_strategies = {};
            var model_names = [];
            var coin_names = [];
            var unique_coins = {};
            var index = 0;
            for (var i = 0; i < data["response"].length; i++) {
              model_names.push({
                label: data["response"][i].strategy_name.replace(/_/g, "-"),
                value: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
              });
              if (!unique_coins[data["response"][i].currency]) {
                unique_coins[data["response"][i].currency] = 1;
                coin_names.push({
                  label: data["response"][i].currency,
                  // value: i,
                });
              }
              var dt = new Date(
                parseInt(data["response"][i].forecast_time) * 1000
              ).toLocaleString();
              var year = dt.split("/")[2].split(",")[0];
              var month = dt.split("/")[0];
              if (month.length == 1) {
                month = "0" + month;
              }
              var day = dt.split("/")[1];
              if (day.length == 1) {
                day = "0" + day;
              }
              var hours = dt.split(", ")[1].split(":")[0];
              if (hours.length == 1) {
                hours = "0" + hours;
              }
              var minutes = dt.split(":")[1];
              if (minutes.length == 1) {
                minutes = "0" + minutes;
              }
              var curr_time_version = dt.split(" ")[2];
              if (curr_time_version == "PM") {
                hours = parseInt(hours) + 12;
              }
              var dt_str =
                year + "-" + month + "-" + day + " " + hours + ":" + minutes;
              // console.log(data["response"][i].strategy_name);
              data_for_strategies[data["response"][i].strategy_name] = {
                current_position: data["response"][i].current_position,
                time_horizon: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
                date_started: data["response"][i].date_started,
                entry_price: data["response"][i].entry_price,
                forecast_time: dt_str,
                next_forecast: data["response"][i].next_forecast,
                current_price: data["response"][i].current_price,
                strategy_name: data["response"][i].strategy_name,
                current_pnl: data["response"][i].current_pnl,
                position_start_time: data["response"][i].position_start_time,
                exchange: data["response"][i].exchange,
              };
              index++;
            }
            if (JSON.stringify(data_for_strategies) !== "{}") {
              setStrategies(data_for_strategies);
            }
          })
          .catch((err) => console.log(err));
      } else {
        if (Object.keys(strategies_cache).length == 0) {
          fetch(link + "/get_strategies", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data["response"].length);
              var data_for_strategies = {};
              var model_names = [];
              var coin_names = [];
              var unique_coins = {};
              var index = 0;
              for (var i = 0; i < data["response"].length; i++) {
                model_names.push({
                  label: data["response"][i].strategy_name.replace(/_/g, "-"),
                  value: data["response"][i].time_horizon,
                  currency: data["response"][i].currency,
                });
                if (!unique_coins[data["response"][i].currency]) {
                  unique_coins[data["response"][i].currency] = 1;
                  coin_names.push({
                    label: data["response"][i].currency,
                    // value: i,
                  });
                }
                var dt = new Date(
                  parseInt(data["response"][i].forecast_time) * 1000
                ).toLocaleString();
                var year = dt.split("/")[2].split(",")[0];
                var month = dt.split("/")[0];
                if (month.length == 1) {
                  month = "0" + month;
                }
                var day = dt.split("/")[1];
                if (day.length == 1) {
                  day = "0" + day;
                }
                var hours = dt.split(", ")[1].split(":")[0];
                if (hours.length == 1) {
                  hours = "0" + hours;
                }
                var minutes = dt.split(":")[1];
                if (minutes.length == 1) {
                  minutes = "0" + minutes;
                }
                var curr_time_version = dt.split(" ")[2];
                if (curr_time_version == "PM") {
                  hours = parseInt(hours) + 12;
                }
                var dt_str =
                  year + "-" + month + "-" + day + " " + hours + ":" + minutes;
                // console.log(data["response"][i].strategy_name);
                data_for_strategies[data["response"][i].strategy_name] = {
                  current_position: data["response"][i].current_position,
                  time_horizon: data["response"][i].time_horizon,
                  currency: data["response"][i].currency,
                  date_started: data["response"][i].date_started,
                  entry_price: data["response"][i].entry_price,
                  forecast_time: dt_str,
                  next_forecast: data["response"][i].next_forecast,
                  current_price: data["response"][i].current_price,
                  strategy_name: data["response"][i].strategy_name,
                  current_pnl: data["response"][i].current_pnl,
                  position_start_time: data["response"][i].position_start_time,
                };
                index++;
              }
              if (JSON.stringify(data_for_strategies) !== "{}") {
                setStrategies(data_for_strategies);
                //console.log("Strategies final -->", data_for_strategies);
                Set_strategies_cache({ strategies: data_for_strategies });
                Set_coin_search_selection_cache({
                  coin_names: coin_names,
                });
                Set_model_search_selection_cache({
                  model_names: model_names,
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          // console.log(
          //   "I am using cached value of strategies -->",
          //   strategies_cache
          // );
          setStrategies(strategies_cache["strategies"]);
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [model_name]);
  const [current_position, set_current_position] = useState({});
  useEffect(() => {
    try {
      if (
        props.model_name.includes("strategy") ||
        props.model_name.split("_").length == 3
      ) {
        // console.log("Here is it ", strategies[props.model_name]);
        fetch(
          link + `/get/live_strategies`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data[data["response"][i].strategy_name] = {
                current_pnl: data["response"][i].current_pnl,
                current_price: data["response"][i].current_price,
              };
            }

            if (temp_data.length != 0) {
              set_current_position(temp_data);
              // console.log("Debuggin current prices -->", temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          });
      } else {
        // console.log("Here is it ", strategies[props.model_name]);
        fetch(
          link + `/get/current_position`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data[data["response"][i].strategy_name] = {
                current_pnl: data["response"][i].current_pnl,
                current_price: data["response"][i].current_price,
              };
            }

            if (temp_data.length != 0) {
              set_current_position(temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          });
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [last_minute]);
  const containerProps = {
    width: "100%",
    height: "550px",
    margin: "auto",
  };
  useEffect(() => {
    try {
      if (strategies == null) {
        return;
      } else {
        // console.log("Here is it ", strategies[props.model_name]);
        if (props.model_name.split("_").length == 3) {
          if (strategies[props.model_name].exchange == "okx") {
            fetch(
              link + `/get_okx_minute_data/${parseInt(
                strategies[props.model_name].position_start_time
              )}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                  'ngrok-skip-browser-warning': 'true',
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                const dps1 = [];
                const dps2 = [];
                const dps3 = [];
                // console.log(
                //   "Finally btc data -->",
                //   new Date(parseInt(data["response"][0].timestamp) * 1000)
                // );

                for (let i = 0; i < data["response"].length; i++) {
                  dps1.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: [
                      Number(data["response"][i].open),
                      Number(data["response"][i].high),
                      Number(data["response"][i].low),
                      Number(data["response"][i].close),
                    ],
                    color:
                      data["response"][i].open < data["response"][i].close
                        ? "#16C784"
                        : "#FF2E2E",
                  });
                  dps2.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: Number(data["response"][i].volume),
                    color:
                      data["response"][i].open < data["response"][i].close
                        ? "#16C784"
                        : "#FF2E2E",
                  });
                  dps3.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: Number(data["response"][i].close),
                  });
                }
                setDataPoints1(dps1);
                setDataPoints2(dps2);
                setDataPoints3(dps3);
                // console.log(dps1);
                setIsLoaded(true);
                // console.log("Console values -->", dps1, dps2, dps3);
                let start_time = parseInt(
                  strategies[props.model_name].position_start_time
                );
                let end_time = parseInt(
                  data["response"][data["response"].length - 1].timestamp
                );
                let avg = (end_time - start_time) / 2;
                let result = avg + start_time;
                // console.log("Result -->", end_time, start_time, result, result2);
                set_start_date(result);
                setStart(
                  parseInt(strategies[props.model_name].position_start_time)
                );
                setEnd(
                  parseInt(
                    data["response"][data["response"].length - 1].timestamp
                  )
                );
                set_last_minute(
                  data["response"][data["response"].length - 1].timestamp
                );
                set_entry_price(
                  parseInt(strategies[props.model_name].entry_price)
                );
                set_current_price(
                  parseInt(strategies[props.model_name].current_price)
                );
              });
          } else {
            fetch(
              link + `/get_btc_minute_data/${parseInt(
                strategies[props.model_name].position_start_time
              )}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                  'ngrok-skip-browser-warning': 'true',
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                const dps1 = [];
                const dps2 = [];
                const dps3 = [];
                // console.log(
                //   "Finally btc data -->",
                //   new Date(parseInt(data["response"][0].timestamp) * 1000)
                // );

                for (let i = 0; i < data["response"].length; i++) {
                  dps1.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: [
                      Number(data["response"][i].open),
                      Number(data["response"][i].high),
                      Number(data["response"][i].low),
                      Number(data["response"][i].close),
                    ],
                    color:
                      data["response"][i].open < data["response"][i].close
                        ? "#16C784"
                        : "#FF2E2E",
                  });
                  dps2.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: Number(data["response"][i].volume),
                    color:
                      data["response"][i].open < data["response"][i].close
                        ? "#16C784"
                        : "#FF2E2E",
                  });
                  dps3.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: Number(data["response"][i].close),
                  });
                }
                setDataPoints1(dps1);
                setDataPoints2(dps2);
                setDataPoints3(dps3);
                // console.log(dps1);
                setIsLoaded(true);
                // console.log("Console values -->", dps1, dps2, dps3);
                let start_time = parseInt(
                  strategies[props.model_name].position_start_time
                );
                let end_time = parseInt(
                  data["response"][data["response"].length - 1].timestamp
                );
                let avg = (end_time - start_time) / 2;
                let result = avg + start_time;
                // console.log("Result -->", end_time, start_time, result, result2);
                set_start_date(result);
                setStart(
                  parseInt(strategies[props.model_name].position_start_time)
                );
                setEnd(
                  parseInt(
                    data["response"][data["response"].length - 1].timestamp
                  )
                );
                set_last_minute(
                  data["response"][data["response"].length - 1].timestamp
                );
                set_entry_price(
                  parseInt(strategies[props.model_name].entry_price)
                );
                set_current_price(
                  parseInt(strategies[props.model_name].current_price)
                );
              });
          }
        } else {
          fetch(
            link + `/get_btc_minute_data/${parseInt(
              strategies[props.model_name].position_start_time
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                'ngrok-skip-browser-warning': 'true',
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              const dps1 = [];
              const dps2 = [];
              const dps3 = [];
              // console.log(
              //   "Finally btc data -->",
              //   new Date(parseInt(data["response"][0].timestamp) * 1000)
              // );

              for (let i = 0; i < data["response"].length; i++) {
                dps1.push({
                  x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                  y: [
                    Number(data["response"][i].open),
                    Number(data["response"][i].high),
                    Number(data["response"][i].low),
                    Number(data["response"][i].close),
                  ],
                  color:
                    data["response"][i].open < data["response"][i].close
                      ? "#16C784"
                      : "#FF2E2E",
                });
                dps2.push({
                  x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                  y: Number(data["response"][i].volume),
                  color:
                    data["response"][i].open < data["response"][i].close
                      ? "#16C784"
                      : "#FF2E2E",
                });
                dps3.push({
                  x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                  y: Number(data["response"][i].close),
                });
              }
              setDataPoints1(dps1);
              setDataPoints2(dps2);
              setDataPoints3(dps3);
              // console.log(dps1);
              setIsLoaded(true);
              // console.log("Console values -->", dps1, dps2, dps3);
              let start_time = parseInt(
                strategies[props.model_name].position_start_time
              );
              let end_time = parseInt(
                data["response"][data["response"].length - 1].timestamp
              );
              let avg = (end_time - start_time) / 2;
              let result = avg + start_time;
              // console.log("Result -->", end_time, start_time, result, result2);
              set_start_date(result);
              setStart(
                parseInt(strategies[props.model_name].position_start_time)
              );
              setEnd(
                parseInt(
                  data["response"][data["response"].length - 1].timestamp
                )
              );
              set_last_minute(
                data["response"][data["response"].length - 1].timestamp
              );
              set_entry_price(
                parseInt(strategies[props.model_name].entry_price)
              );
              set_current_price(
                parseInt(strategies[props.model_name].current_price)
              );
            });
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [strategies]);
  var flag = true;
  if (windowWidth.current <= 480) {
    flag = false;
  }
  const options = {
    theme: "light2",
    backgroundColor: "transparent",
    rangeSelector: {
      enabled: false, //change it to true
    },

    charts: [
      {
        rangeSelector: {
          enabled: false, //change it to true
        },
        height: null,
        width: null,
        responsive: true,
        zoomEnabled: false, // Enable zoom

        axisX: {
          gridColor: "#43577533",
          tickColor: "#43577533",
          labelFontSize: 10,
          lineThickness: 1,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            },
          },
        },
        axisY: {
          // title: "Litecoin Price",
          prefix: "$",
          tickLength: 0,
          labelFontSize: 10,
          gridColor: "#43577533",
          tickColor: "#43577533",
          // labelFormatter: function (e) {
          //   return "";
          // },
        },
        toolTip: {
          shared: true,
          fontSize: 10,
          contentFormatter: (e) => {
            const date = CanvasJSReact.CanvasJS.formatDate(
              e.entries[0].dataPoint.x,
              "DD/MM/YYYY HH:mm:ss"
            );
            let content = `<strong>${date}</strong><br/><br/>`;

            e.entries.forEach((entry) => {
              // console.log("Datapoint tooltip -->", entry.dataPoint.y[0]);
              if (entry.dataPoint.y[0]) {
                const close = entry.dataPoint.y[3];
                let color = "#ff2e2e";
                if (close > entry.dataPoint.y[0]) {
                  color = "#16c784"; // green for long position
                } else if (close < entry.dataPoint.y[0]) {
                  color = "#ff2e2e"; // red for short position
                }
                content += `<span style="color: ${color};">Open</span> :  $${entry.dataPoint.y[0]}<br/>`;
                content += `<span style="color: ${color};">High</span> :  $${entry.dataPoint.y[1]}<br/>`;
                content += `<span style="color: ${color};">Low</span> :  $${entry.dataPoint.y[2]}<br/>`;
                content += `<span style="color: ${color};">Close</span> :   $${entry.dataPoint.y[3]}</span><br/>`;
              }
            });

            return content;
          },
        },

        data: [
          {
            name: "Price (in USD)",
            yValueFormatString: "$#,###.##",
            // axisYType: "secondary",
            type: "candlestick",
            risingColor: "#16C784",
            fallingColor: "#FF2E2E",
            dataPoints: dataPoints1,
          },

          {
            type: "line",
            color: "purple",
            lineThickness: 1.5,

            lineDashType: "dash",

            dataPoints: [
              {
                x: new Date(start * 1000),
                y: entry_price,
              },
              {
                x: new Date(end * 1000),
                y: entry_price,
              },
            ],
          },
          {
            type: "line",
            color: "#FFAD72",
            lineThickness: 1.5,
            lineDashType: "dash",

            label: "Current price",

            dataPoints: [
              {
                x: new Date(start * 1000),
                y: current_position[props.model_name]
                  ? current_position[props.model_name].current_price
                  : null,
              },
              {
                x: new Date(end * 1000),
                y: current_position[props.model_name]
                  ? current_position[props.model_name].current_price
                  : null,
              },
            ],
          },
        ],
      },
      {
        height: 100,
        axisX: {
          gridColor: "#43577533",
          tickColor: "#43577533",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          gridColor: "#43577533",
          tickColor: "#43577533",
          // title: "Volume",
          // prefix: "$",
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
        },
        toolTip: {
          fontSize: 10,
          shared: true,
          contentFormatter: (e) => {
            const date = CanvasJSReact.CanvasJS.formatDate(
              e.entries[0].dataPoint.x,
              "DD/MM/YYYY HH:mm:ss"
            );
            let content = `<strong>${date}</strong><br/><br/>`;

            e.entries.forEach((entry) => {
              content += `<span style="color: ${entry.dataPoint.color};">Volume</span> :  $${entry.dataPoint.y}<br/>`;
            });

            return content;
          },
        },
        data: [
          {
            name: "Volume",
            yValueFormatString: "$#,###.##",
            type: "column",
            dataPoints: dataPoints2,
          },
        ],
      },
    ],
    navigator: {
      enabled: flag, //Change it to true

      axisX: {
        labelFontSize: 10,
      },

      data: [
        {
          color: "#16c784",
          type: "splineArea",
          dataPoints: dataPoints3,
        },
      ],
      slider: {
        minimum: new Date(start_date * 1000),
        // maximum: new Date(end * 1000 + 10000),
        handleColor: "#fddd4e",
        handleBorderThickness: 1,
        handleBorderColor: "#fddd4e",
      },
    },
  };
  useEffect(() => {
    // console.log("I am called again bro");
    try {
      if (last_minute == null) {
        return;
      } else {
        setTimeout(() => {
          // console.log("Here is it ", strategies[props.model_name]);
          if (props.model_name.split("_").length == 3) {
            if (strategies[props.model_name].exchange == "okx") {
              fetch(
                link + `/get_okx_minute_data/${parseInt(
                  strategies[props.model_name].position_start_time
                )}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  const dps1 = [];
                  const dps2 = [];
                  const dps3 = [];
                  // console.log(
                  //   "Finally btc data -->",
                  //   new Date(parseInt(data["response"][0].timestamp) * 1000)
                  // );

                  for (let i = 0; i < data["response"].length; i++) {
                    dps1.push({
                      x: new Date(
                        parseInt(data["response"][i].timestamp) * 1000
                      ),
                      y: [
                        Number(data["response"][i].open),
                        Number(data["response"][i].high),
                        Number(data["response"][i].low),
                        Number(data["response"][i].close),
                      ],
                      color:
                        data["response"][i].open < data["response"][i].close
                          ? "#16C784"
                          : "#FF2E2E",
                    });
                    dps2.push({
                      x: new Date(
                        parseInt(data["response"][i].timestamp) * 1000
                      ),
                      y: Number(data["response"][i].volume),
                      color:
                        data["response"][i].open < data["response"][i].close
                          ? "#16C784"
                          : "#FF2E2E",
                    });
                    dps3.push({
                      x: new Date(
                        parseInt(data["response"][i].timestamp) * 1000
                      ),
                      y: Number(data["response"][i].close),
                    });
                  }
                  setDataPoints1(dps1);
                  setDataPoints2(dps2);
                  setDataPoints3(dps3);
                  // console.log(dps1);
                  setIsLoaded(true);
                  // console.log("Console values -->", dps1, dps2, dps3);
                  let start_time = parseInt(
                    strategies[props.model_name].position_start_time
                  );
                  let end_time = parseInt(
                    data["response"][data["response"].length - 1].timestamp
                  );
                  let avg = (end_time - start_time) / 2;
                  let result = avg + start_time;
                  // console.log("Result -->", end_time, start_time, result, result2);
                  set_start_date(result);
                  setStart(
                    parseInt(strategies[props.model_name].position_start_time)
                  );
                  setEnd(
                    parseInt(
                      data["response"][data["response"].length - 1].timestamp
                    )
                  );
                  set_last_minute(
                    data["response"][data["response"].length - 1].timestamp
                  );
                  set_entry_price(
                    parseInt(strategies[props.model_name].entry_price)
                  );
                  set_current_price(
                    parseInt(strategies[props.model_name].current_price)
                  );
                });
            } else {
              fetch(
                link + `/get_btc_minute_data/${parseInt(
                  strategies[props.model_name].position_start_time
                )}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  const dps1 = [];
                  const dps2 = [];
                  const dps3 = [];
                  // console.log(
                  //   "Finally btc data -->",
                  //   new Date(parseInt(data["response"][0].timestamp) * 1000)
                  // );

                  for (let i = 0; i < data["response"].length; i++) {
                    dps1.push({
                      x: new Date(
                        parseInt(data["response"][i].timestamp) * 1000
                      ),
                      y: [
                        Number(data["response"][i].open),
                        Number(data["response"][i].high),
                        Number(data["response"][i].low),
                        Number(data["response"][i].close),
                      ],
                      color:
                        data["response"][i].open < data["response"][i].close
                          ? "#16C784"
                          : "#FF2E2E",
                    });
                    dps2.push({
                      x: new Date(
                        parseInt(data["response"][i].timestamp) * 1000
                      ),
                      y: Number(data["response"][i].volume),
                      color:
                        data["response"][i].open < data["response"][i].close
                          ? "#16C784"
                          : "#FF2E2E",
                    });
                    dps3.push({
                      x: new Date(
                        parseInt(data["response"][i].timestamp) * 1000
                      ),
                      y: Number(data["response"][i].close),
                    });
                  }
                  setDataPoints1(dps1);
                  setDataPoints2(dps2);
                  setDataPoints3(dps3);
                  // console.log(dps1);
                  setIsLoaded(true);
                  // console.log("Console values -->", dps1, dps2, dps3);
                  let start_time = parseInt(
                    strategies[props.model_name].position_start_time
                  );
                  let end_time = parseInt(
                    data["response"][data["response"].length - 1].timestamp
                  );
                  let avg = (end_time - start_time) / 2;
                  let result = avg + start_time;
                  // console.log("Result -->", end_time, start_time, result, result2);
                  set_start_date(result);
                  setStart(
                    parseInt(strategies[props.model_name].position_start_time)
                  );
                  setEnd(
                    parseInt(
                      data["response"][data["response"].length - 1].timestamp
                    )
                  );
                  set_last_minute(
                    data["response"][data["response"].length - 1].timestamp
                  );
                  set_entry_price(
                    parseInt(strategies[props.model_name].entry_price)
                  );
                  set_current_price(
                    parseInt(strategies[props.model_name].current_price)
                  );
                });
            }
          } else {
            fetch(
              link + `/get_btc_minute_data/${parseInt(
                strategies[props.model_name].position_start_time
              )}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                  'ngrok-skip-browser-warning': 'true',
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                const dps1 = [];
                const dps2 = [];
                const dps3 = [];
                // console.log(
                //   "Finally btc data -->",
                //   new Date(parseInt(data["response"][0].timestamp) * 1000)
                // );

                for (let i = 0; i < data["response"].length; i++) {
                  dps1.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: [
                      Number(data["response"][i].open),
                      Number(data["response"][i].high),
                      Number(data["response"][i].low),
                      Number(data["response"][i].close),
                    ],
                    color:
                      data["response"][i].open < data["response"][i].close
                        ? "#16C784"
                        : "#FF2E2E",
                  });
                  dps2.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: Number(data["response"][i].volume),
                    color:
                      data["response"][i].open < data["response"][i].close
                        ? "#16C784"
                        : "#FF2E2E",
                  });
                  dps3.push({
                    x: new Date(parseInt(data["response"][i].timestamp) * 1000),
                    y: Number(data["response"][i].close),
                  });
                }
                setDataPoints1(dps1);
                setDataPoints2(dps2);
                setDataPoints3(dps3);
                // console.log(dps1);
                setIsLoaded(true);
                // console.log("Console values -->", dps1, dps2, dps3);
                let start_time = parseInt(
                  strategies[props.model_name].position_start_time
                );
                let end_time = parseInt(
                  data["response"][data["response"].length - 1].timestamp
                );
                let avg = (end_time - start_time) / 2;
                let result = avg + start_time;
                // console.log("Result -->", end_time, start_time, result, result2);
                set_start_date(result);
                setStart(
                  parseInt(strategies[props.model_name].position_start_time)
                );
                setEnd(
                  parseInt(
                    data["response"][data["response"].length - 1].timestamp
                  )
                );
                set_last_minute(
                  data["response"][data["response"].length - 1].timestamp
                );
                set_entry_price(
                  parseInt(strategies[props.model_name].entry_price)
                );
                set_current_price(
                  parseInt(strategies[props.model_name].current_price)
                );
              });
          }
          // set_last_minute(new Date());
        }, 60000);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [last_minute]);

  return (
    <div>
      {isLoaded ? (
        <div className="current-position">
          <div className="container">
            <h2 className="current-position-heading">Current Position</h2>

            <div className="current-position-body">
              <div className="current-position-body-spans">
                <div className="current-position-spans no-padding">
                  <span>Open : </span>
                  <span className="">
                    {Object.values(dataPoints1).length > 0 ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[0]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>
                <div className="current-position-spans">
                  <span>High : </span>
                  <span className="">
                    {Object.values(dataPoints1).length > 0 ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[1]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>
                <div className="current-position-spans">
                  <span>Low : </span>
                  <span className="">
                    {Object.values(dataPoints1).length > 0 ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[2]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>
                <div className="current-position-spans">
                  <span>Close : </span>
                  <span className="">
                    {Object.values(dataPoints1).length > 0 ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[3]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>

                {/* <div className="current-position-spans">
                  <span>Volume : </span>
                  <span className="">
                    {Object.values(dataPoints2) ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints2)[
                              Object.keys(dataPoints2).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints2)[
                            Object.keys(dataPoints2).length - 1
                          ].y
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div> */}
              </div>

              {/* <div className='horizon-left'>
                    <div className='hours-list'>
                        <ul>
                            <li className='active'>1m</li>
                            <li>1h</li>
                            <li>2h</li>
                            <li>4h</li>
                            <li>6h</li>
                            <li>24h</li>
                            <li><AiOutlineCalendar /></li>
                        </ul>
                    </div>
                </div> */}

              <div className="ep-cp">
                <div className="ep">
                  <p className="for-ep-color">- - - -</p>
                  <p>Entry Price</p>
                </div>
                <div className="cp">
                  <p className="for-cp-color">- - - -</p>
                  <p>Current Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="current-position">
          <div className="container">
            <h2 className="current-position-heading">Current Position</h2>
          </div>
        </div>
      )}

      <div className="container candle-canvas">
        {isLoaded ? (
          <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
            className="hidden canvas"
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
    </div>
  );
}

export default memo(CandleGraphCanvasjs);
