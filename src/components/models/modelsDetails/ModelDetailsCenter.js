import { Tooltip } from "@mui/material";
import React, { useRef } from "react";
import "./ModelDetails.css";
import { BsFillInfoCircleFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import TimerModelPage from "../../timer/TimerModelPage";
import { useStateContext } from "../../../ContextProvider";
import { time } from "@amcharts/amcharts5";

const ModelDetailsCenter = (props) => {
  const {
    stats_cache,
    strategies_cache,
    Set_strategies_cache,
    Set_stats_cache,
    Set_coin_search_selection_cache,
    Set_model_search_selection_cache,
  } = useStateContext();
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  // All time Drop Down
  const [drop, setDrop] = useState(false);
  const dropDown = () => setDrop(!drop);
  // All time Drop Down End
  const [stats, setStats] = useState([]);
  const [strategies, setStrategies] = useState({});

  const api_key = process.env.REACT_APP_SECRET_KEY;

  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(
          process.env.REACT_APP_API + `/get/current_position`,
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
      setTimeout(() => {
        if (
          props.model_name.includes("strategy") ||
          props.model_name.split("_").length == 3
        ) {
          fetch(process.env.REACT_APP_API + "/get/live_stats", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data["response"].length);
              var model_names = {};
              for (var i = 0; i < data["response"].length; i++) {
                // console.log(data["response"][i].strategy_name);
                var name = data["response"][i].strategy_name;
                if (props.model_name == name) {
                  model_names[props.model_name] = {
                    strategy_name: data["response"][i].strategy_name,
                    current_drawdown: data["response"][i].current_drawdown,
                    curr_drawdown_duration:
                      data["response"][i].curr_drawdown_duration,
                    average_drawdown: data["response"][i].average_drawdown,
                    average_drawdown_duration:
                      data["response"][i].average_drawdown_duration,
                    max_drawdown: data["response"][i].max_drawdown,
                    max_drawdown_duration:
                      data["response"][i].max_drawdown_duration,
                    r2_score: data["response"][i].r2_score,
                    sharpe: data["response"][i].sharpe,
                    sortino: data["response"][i].sortino,
                    total_pnl: data["response"][i].total_pnl,
                    total_positive_pnl: data["response"][i].total_positive_pnl,
                    total_negative_pnl: data["response"][i].total_negative_pnl,
                    total_wins: data["response"][i].total_wins,
                    total_losses: data["response"][i].total_losses,
                    consective_wins: data["response"][i].consective_wins,
                    consective_losses: data["response"][i].consective_losses,
                    win_percentage: data["response"][i].win_percentage,
                    loss_percentage: data["response"][i].loss_percentage,
                    pnl_sum_1: data["response"][i].pnl_sum_1,
                    pnl_sum_7: data["response"][i].pnl_sum_7,
                    pnl_sum_15: data["response"][i].pnl_sum_15,
                    pnl_sum_30: data["response"][i].pnl_sum_30,
                    pnl_sum_45: data["response"][i].pnl_sum_45,
                    pnl_sum_60: data["response"][i].pnl_sum_60,
                    average_daily_pnl: data["response"][i].average_daily_pnl,
                    win_loss_ratio: data["response"][i].win_loss_ratio,

                    rank: data["response"][i].rank,
                  };
                }
              }
              if (JSON.stringify(model_names) !== "{}") {
                // console.log("Sortable -->", model_names);

                // const sorted = Object.keys(model_names)
                //   .map((key) => {
                //     return { ...model_names[key], key };
                //   })
                //   .sort((a, b) => b.total_pnl - a.total_pnl);
                setStats(model_names);

                // Set_sorted_stats_cache({ sorted_stats: sorted });
              }
            })
            .catch((err) => console.log(err));
        } else {
          fetch(
            process.env.REACT_APP_API + `/get/current_position`,
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
                if (data["response"].length != 0) {
                  set_current_position(temp_data);
                }
                // console.log("Here is the data for current position", temp_data);
              }
            });
        }

        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);
  useEffect(() => {
    try {
      if (
        props.model_name.includes("strategy") ||
        props.model_name.split("_").length == 3
      ) {
        fetch(process.env.REACT_APP_API + "/get/live_stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["response"].length);
            var model_names = {};
            for (var i = 0; i < data["response"].length; i++) {
              // console.log(data["response"][i].strategy_name);
              var name = data["response"][i].strategy_name;
              if (props.model_name == name) {
                model_names[props.model_name] = {
                  strategy_name: data["response"][i].strategy_name,
                  current_drawdown: data["response"][i].current_drawdown,
                  curr_drawdown_duration:
                    data["response"][i].curr_drawdown_duration,
                  average_drawdown: data["response"][i].average_drawdown,
                  average_drawdown_duration:
                    data["response"][i].average_drawdown_duration,
                  max_drawdown: data["response"][i].max_drawdown,
                  max_drawdown_duration:
                    data["response"][i].max_drawdown_duration,
                  r2_score: data["response"][i].r2_score,
                  sharpe: data["response"][i].sharpe,
                  sortino: data["response"][i].sortino,
                  total_pnl: data["response"][i].total_pnl,
                  total_positive_pnl: data["response"][i].total_positive_pnl,
                  total_negative_pnl: data["response"][i].total_negative_pnl,
                  total_wins: data["response"][i].total_wins,
                  total_losses: data["response"][i].total_losses,
                  consective_wins: data["response"][i].consective_wins,
                  consective_losses: data["response"][i].consective_losses,
                  win_percentage: data["response"][i].win_percentage,
                  loss_percentage: data["response"][i].loss_percentage,
                  pnl_sum_1: data["response"][i].pnl_sum_1,
                  pnl_sum_7: data["response"][i].pnl_sum_7,
                  pnl_sum_15: data["response"][i].pnl_sum_15,
                  pnl_sum_30: data["response"][i].pnl_sum_30,
                  pnl_sum_45: data["response"][i].pnl_sum_45,
                  pnl_sum_60: data["response"][i].pnl_sum_60,
                  average_daily_pnl: data["response"][i].average_daily_pnl,
                  win_loss_ratio: data["response"][i].win_loss_ratio,

                  rank: data["response"][i].rank,
                };
              }
            }
            if (JSON.stringify(model_names) !== "{}") {
              // console.log("Sortable -->", model_names);

              // const sorted = Object.keys(model_names)
              //   .map((key) => {
              //     return { ...model_names[key], key };
              //   })
              //   .sort((a, b) => b.total_pnl - a.total_pnl);
              setStats(model_names);

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else {
        try {
          if (Object.keys(stats_cache).length == 0) {
            fetch(process.env.REACT_APP_API + "/get_stats", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                'ngrok-skip-browser-warning': 'true',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                // console.log(data["response"].length);
                var model_names = {};
                for (var i = 0; i < data["response"].length; i++) {
                  // console.log(data["response"][i].strategy_name);
                  var name = data["response"][i].strategy_name;
                  if (props.model_name == name) {
                    model_names[props.model_name] = {
                      strategy_name: data["response"][i].strategy_name,
                      current_drawdown: data["response"][i].current_drawdown,
                      curr_drawdown_duration:
                        data["response"][i].curr_drawdown_duration,
                      average_drawdown: data["response"][i].average_drawdown,
                      average_drawdown_duration:
                        data["response"][i].average_drawdown_duration,
                      max_drawdown: data["response"][i].max_drawdown,
                      max_drawdown_duration:
                        data["response"][i].max_drawdown_duration,
                      r2_score: data["response"][i].r2_score,
                      sharpe: data["response"][i].sharpe,
                      sortino: data["response"][i].sortino,
                      total_pnl: data["response"][i].total_pnl,
                      total_positive_pnl:
                        data["response"][i].total_positive_pnl,
                      total_negative_pnl:
                        data["response"][i].total_negative_pnl,
                      total_wins: data["response"][i].total_wins,
                      total_losses: data["response"][i].total_losses,
                      consective_wins: data["response"][i].consective_wins,
                      consective_losses: data["response"][i].consective_losses,
                      win_percentage: data["response"][i].win_percentage,
                      loss_percentage: data["response"][i].loss_percentage,
                      pnl_sum_1: data["response"][i].pnl_sum_1,
                      pnl_sum_7: data["response"][i].pnl_sum_7,
                      pnl_sum_15: data["response"][i].pnl_sum_15,
                      pnl_sum_30: data["response"][i].pnl_sum_30,
                      pnl_sum_45: data["response"][i].pnl_sum_45,
                      pnl_sum_60: data["response"][i].pnl_sum_60,
                      average_daily_pnl: data["response"][i].average_daily_pnl,
                      win_loss_ratio: data["response"][i].win_loss_ratio,

                      rank: data["response"][i].rank,
                      alpha: data["response"][i].alpha,
                      beta: data["response"][i].beta,
                    };
                  }
                }
                if (JSON.stringify(model_names) !== "{}") {
                  // console.log("Sortable -->", model_names);
                  // const sorted = Object.keys(model_names)
                  //   .map((key) => {
                  //     return { ...model_names[key], key };
                  //   })
                  //   .sort((a, b) => b.total_pnl - a.total_pnl);
                  // setStats(model_names);
                  // Set_stats_cache({ stats: model_names });
                  // Set_sorted_stats_cache({ sorted_stats: sorted });
                }
              })
              .catch((err) => console.log(err));
          } else {
            // console.log("I am using cached values of sorted stats -->", stats_cache);
            setStats(stats_cache["stats"]);
          }
        } catch (error) {
          console.log("Error occured");
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, []);
  const [current_position, set_current_position] = useState({});
  // useEffect(() => {
  //   // console.log("Here is it ", strategies[props.model_name]);
  //   fetch(process.env.REACT_APP_API+ `/get/current_position`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const temp_data = {};
  //       // console.log(
  //       //   "Finally btc data -->",
  //       //   new Date(parseInt(data["response"][0].timestamp) * 1000)
  //       // );

  //       for (let i = 0; i < data["response"].length; i++) {
  //         temp_data[data["response"][i].strategy_name] = {
  //           current_pnl: data["response"][i].current_pnl,
  //           current_price: data["response"][i].current_price,
  //         };
  //       }

  //       if (temp_data.length != 0) {
  //         set_current_position(temp_data);
  //         // console.log("Here is the data for current position", temp_data);
  //       }
  //     });
  // }, []);
  useEffect(() => {
    try {
      if (!stats) {
        return;
      } else {
        if (
          props.model_name.includes("strategy") ||
          props.model_name.split("_").length == 3
        ) {
          fetch(
            process.env.REACT_APP_API + "/get/live_strategies",
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
              }
              if (JSON.stringify(data_for_strategies) !== "{}") {
                setStrategies(data_for_strategies);
                //  console.log("Strategies final -->", data_for_strategies);
                // console.log("Here are model names --->", model_names);
              }
            })
            .catch((err) => console.log(err));
        } else {
          if (Object.keys(strategies_cache).length == 0) {
            fetch(
              process.env.REACT_APP_API + "/get_strategies",
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
                    year +
                    "-" +
                    month +
                    "-" +
                    day +
                    " " +
                    hours +
                    ":" +
                    minutes;
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
                    position_start_time:
                      data["response"][i].position_start_time,
                  };
                }
                if (JSON.stringify(data_for_strategies) !== "{}") {
                  setStrategies(data_for_strategies);
                  //  console.log("Strategies final -->", data_for_strategies);
                  // Set_strategies_cache({ strategies: data_for_strategies });
                  // Set_coin_search_selection_cache({
                  //   coin_names: coin_names,
                  // });
                  // Set_model_search_selection_cache({
                  //   model_names: model_names,
                  // });
                  // console.log("Here are model names --->", model_names);
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
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [stats]);

  // FOR LONG SHORT COLORS
  const forLSColor = (current_position) => {
    if (current_position == "Short") {
      document
        .getElementById("for-long-short")
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short")
        .setAttribute("style", "color:#16C784 !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short")
        .setAttribute("style", "color:#16C784 !important");
    }
  };

  const forLSMColor = (current_position) => {
    if (current_position == "Short") {
      document
        .getElementById("for-long-short-mob")
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short-mob")
        .setAttribute("style", "color:#16C784 !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short-mob")
        .setAttribute("style", "color:#16C784 !important");
    }
  };
  // FOR LONG SHORT COLORS

  // CURRENT PNL COLORS
  const forPnlColor = (total_pnl, id) => {
    if (total_pnl < 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (total_pnl >= 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#16C784 !important");
    }
  };

  const forPnlMColor = (total_pnl, id) => {
    if (total_pnl < 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (total_pnl >= 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#16C784 !important");
    }
  };
  // CURRENT PNL COLORS

  return (
    <div className="mod-dets-main">
      {/* MODEL DETAILS CENTER FOR WEB */}
      <div className="mod-det-web">
        <div className="model-details-center">
          <div className="model-details-center-top">
            <div className="model-details-center-top-forecasts current">
              <div className="for-tooltip">
                <p>Forecast</p>
                <Tooltip title="Price/Directional prediction for current time">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3
                id="for-long-short"
                onChange={
                  strategies[props.model_name]
                    ? forLSColor(strategies[props.model_name].current_position)
                    : null
                }
              >
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_position
                  : null}
              </h3>
            </div>

            <div className="model-details-center-top-forecasts normal for-border">
              <div className="for-tooltip">
                <p>Forecast Time</p>
                <Tooltip title="Time when the forecast is created">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].forecast_time
                  : null}
              </h3>
            </div>

            <div className="model-details-center-top-forecasts next">
              <div className="for-tooltip">
                <p>Next Forecast</p>
                <Tooltip title="Countdown clock till time of next forecast">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {strategies[props.model_name] ? (
                  <TimerModelPage
                    time_horizon={[
                      "24h",
                      strategies[props.model_name].next_forecast,
                    ]}
                  />
                ) : null}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="model-details-center-body">
            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Entry Price</p>
                <Tooltip title="The price at which the model predicted the current position. Please note that this price might be different from the price at current forecast time because the model might have been in the same position from previous intervals. It does not close and re-opens the position if the forecast is the same.">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].entry_price
                  : null}
              </h3>
            </div>

            <div className="model-details-center-body-content for-border">
              <div className="for-tooltip">
                <p>Current Price</p>
                <Tooltip title="Price at the current time of review">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {current_position[props.model_name] ||
                  strategies[props.model_name]
                  ? current_position[props.model_name]
                    ? current_position[props.model_name].current_price
                    : strategies[props.model_name].current_price
                  : null}
              </h3>
            </div>

            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Current PNL</p>
                <Tooltip title="Current profit or loss (calculated as the difference between entry and current position) at the time of review">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3
                id="curr-pnl"
                onChange={
                  current_position[props.model_name] ||
                    strategies[props.model_name]
                    ? current_position[props.model_name]
                      ? forPnlColor(
                        current_position[props.model_name].current_pnl,
                        "curr-pnl"
                      )
                      : forPnlColor(
                        strategies[props.model_name].current_pnl,
                        "curr-pnl"
                      )
                    : null
                }
              >
                {current_position[props.model_name] ||
                  strategies[props.model_name]
                  ? strategies[props.model_name]
                    ? strategies[props.model_name].current_pnl
                    : current_position[props.model_name].current_pnl
                  : null}
                {"%"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* MODEL DETAILS CENTER FOR MOBILE */}
      <div className="mod-det-mob">
        <div className="model-details-center">
          <div className="model-details-center-top">
            <div className="model-details-center-top-forecasts current">
              <div className="for-tooltip">
                <p>Forecast :</p>
                {/* <Tooltip title="Current Forecast">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3
                id="for-long-short-mob"
                onChange={
                  strategies[props.model_name]
                    ? forLSMColor(strategies[props.model_name].current_position)
                    : null
                }
              >
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_position
                  : null}
              </h3>
            </div>

            <div className="model-details-center-top-forecasts normals for-border">
              <div className="for-tooltip">
                <p>Forecast Time : </p>
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].forecast_time
                  : null}
              </h3>
            </div>
          </div>

          <div className="model-details-center-top">
            <div className="model-details-center-top-forecasts">
              <div className="for-tooltip">
                <p>Next Forecast :</p>
                {/* <Tooltip title="Next Forecast">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip> */}
              </div>
              <h3>
                {strategies[props.model_name] ? (
                  <TimerModelPage
                    time_horizon={[
                      "24h",
                      strategies[props.model_name].next_forecast,
                    ]}
                  />
                ) : null}
              </h3>
            </div>

            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Entry Price :</p>
                {/* <Tooltip title="Entry Price">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].entry_price
                  : null}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="model-details-center-body">
            <div className="model-details-center-top-forecasts">
              <div className="for-tooltip">
                <p>Current Price :</p>
                {/* <Tooltip title="Current Price">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3>
                {current_position[props.model_name] ||
                  strategies[props.model_name]
                  ? current_position[props.model_name]
                    ? current_position[props.model_name].current_price
                    : strategies[props.model_name].current_price
                  : null}
              </h3>
            </div>

            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Current PNL :</p>
                {/* <Tooltip title="Current PNL">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3
                id="curr-pnl"
                onChange={
                  current_position[props.model_name] ||
                    strategies[props.model_name]
                    ? current_position[props.model_name]
                      ? forPnlColor(
                        current_position[props.model_name].current_pnl,
                        "curr-pnl"
                      )
                      : forPnlColor(
                        strategies[props.model_name].current_pnl,
                        "curr-pnl"
                      )
                    : null
                }
              >
                {current_position[props.model_name] ||
                  strategies[props.model_name]
                  ? strategies[props.model_name]
                    ? strategies[props.model_name].current_pnl
                    : current_position[props.model_name].current_pnl
                  : null}
                {"%"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsCenter;
