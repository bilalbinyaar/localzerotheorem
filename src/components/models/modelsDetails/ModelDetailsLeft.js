import React from "react";
import "./ModelDetails.css";
import {
  AiFillDollarCircle,
  AiFillCaretUp,
  AiOutlineFieldTime,
  AiOutlineCalendar,
  AiOutlineDollarCircle,
  AiFillCaretDown,
} from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const ModelDetailsLeft = (props) => {
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [totalpnl, setTotalPnl] = useState([]);
  const { theme } = useStateContext();

  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_returns`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data["live_pnls"] = {
                pnl_all: data["response"][i].pnl_all,
                pnl_1: data["response"][i].pnl_1,
                pnl_7: data["response"][i].pnl_7,
                pnl_30: data["response"][i].pnl_30,
                pnl_60: data["response"][i].pnl_60,
              };
            }

            if (temp_data.length != 0) {
              setTotalPnl(temp_data);
              // console.log("Here is stats -->", temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          })
          .catch((err) => {
            // alert("Error occured");
          });
      }
      setTimeout(() => {
        fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_returns`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data["live_pnls"] = {
                pnl_all: data["response"][i].pnl_all,
                pnl_1: data["response"][i].pnl_1,
                pnl_7: data["response"][i].pnl_7,
                pnl_30: data["response"][i].pnl_30,
                pnl_60: data["response"][i].pnl_60,
              };
            }

            if (temp_data.length != 0) {
              setTotalPnl(temp_data);
              // console.log(temp_data);
              // console.log("Here is stats -->", temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          })
          .catch((err) => {
            // alert("Error occured");
          });
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);
  // const [strategy, setStrategy] = useState({});
  // const [stats, setStats] = useState({});
  // useEffect(() => {
  //   fetch(
  //     `https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_strategy/${props.model_name}`,
  //     {
  //         method: "GET",
  // headers: {
  //   Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  // },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data["response"].length);
  //       var data_for_strategy = {};
  //       for (var i = 0; i < data["response"].length; i++) {
  //         console.log("Strategy -->", data["response"][i].strategy_name);
  //         data_for_strategy[data["response"][i].strategy_name] = {
  //           current_position: data["response"][i].current_position,
  //           time_horizon: data["response"][i].time_horizon,
  //           currency: data["response"][i].currency,
  //           date_started: data["response"][i].date_started,
  //           entry_price: data["response"][i].entry_price,
  //           size: data["response"][i].size,
  //         };
  //       }
  //       if (JSON.stringify(data_for_strategy) !== "{}") {
  //         setStrategy(data_for_strategy);
  //         console.log("Data for setting strategy -->", data_for_strategy);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   fetch(
  //     `https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_stat/${props.model_name}`,
  //     {
  //         method: "GET",
  // headers: {
  //   Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  // },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data["response"]);
  //       var data_for_stat = {};
  //       for (var i = 0; i < data["response"].length; i++) {
  //         console.log("Strategy -->", data["response"][i].strategy_name);
  //         data_for_stat[data["response"][i].strategy_name] = {
  //           total_pnl: data["response"][i].total_pnl,
  //         };
  //       }
  //       if (JSON.stringify(data_for_stat) !== "{}") {
  //         setStats(data_for_stat);
  //         console.log("Data for setting stat -->", data_for_stat);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const {
    stats_cache,
    strategies_cache,
    Set_strategies_cache,
    Set_stats_cache,
    Set_coin_search_selection_cache,
    Set_model_search_selection_cache,
  } = useStateContext();
  // All time Drop Down
  const [drop, setDrop] = useState(false);
  const dropDown = () => setDrop(!drop);
  // All time Drop Down End
  const [stats, setStats] = useState([]);
  const [strategies, setStrategies] = useState({});
  useEffect(() => {
    try {
      // console.log("Here is name for strategy -->", props.model_name);
      if (
        props.model_name.includes("strategy") ||
        props.model_name.split("_").length == 3
      ) {
        fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["response"].length);
            var model_names = {};
            for (var i = 0; i < data["response"].length; i++) {
              // console.log(data["response"][i].strategy_name);
              var name = data["response"][i].strategy_name;
              model_names[name] = {
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
            fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_stats", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                // console.log(data["response"].length);
                var model_names = {};
                for (var i = 0; i < data["response"].length; i++) {
                  // console.log(data["response"][i].strategy_name);
                  var name = data["response"][i].strategy_name;
                  model_names[data["response"][i].strategy_name] = {
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
                    alpha: data["response"][i].alpha,
                    beta: data["response"][i].beta,
                  };
                }
                if (JSON.stringify(model_names) !== "{}") {
                  // console.log("Sortable -->", model_names);
                  // const sorted = Object.keys(model_names)
                  //   .map((key) => {
                  //     return { ...model_names[key], key };
                  //   })
                  //   .sort((a, b) => b.total_pnl - a.total_pnl);
                  setStats(model_names);
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
            "https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_strategies",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
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
                  fee: data["response"][i].fee,
                  stop_loss: data["response"][i].stop_loss,
                  take_profit: data["response"][i].take_profit,
                  backtest_start_date: data["response"][i].backtest_start_date,
                  time_stop: data["response"][i].time_stop,
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
              "https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_strategies",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
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

  // TOTAL PNL COLORS
  const forBgColor = (total_pnl, id) => {
    if (total_pnl < 0) {
      document
        .getElementById(`${id}`)
        .setAttribute(
          "style",
          "background: linear-gradient( 180.98deg, #FF2E2E 0.84%, rgba(255, 255, 255, 0) 289.41%) !important"
        );
    } else if (total_pnl >= 0) {
      document
        .getElementById(`${id}`)
        .setAttribute(
          "style",
          "background: linear-gradient( 180.98deg, #16c784 0.84%, rgba(255, 255, 255, 0) 289.41%) !important"
        );
    }
  };
  // TOTAL PNL COLORS
  console.log("Model name -->", props.model_name, stats);
  return (
    <div className="model-details-left">
      <div className="model-details-left-top">
        <AiFillDollarCircle className="model-details-left-top-icon" />
        <h2>{props.model_name.replace(/_/g, "-")}</h2>
        <div className="model-details-left-top-percentage " id="pnl-bg">
          {stats[props.model_name] ? (
            stats[props.model_name].total_pnl > 0 ? (
              <AiFillCaretUp className="model-details-left-top-percentage-icon " />
            ) : (
              <AiFillCaretDown className="model-details-left-top-percentage-icon " />
            )
          ) : null}
          <p
            onChange={
              stats[props.model_name]
                ? forBgColor(stats[props.model_name].total_pnl, "pnl-bg")
                : null
            }
          >
            {stats[props.model_name] ? stats[props.model_name].total_pnl : null}
            {"%"}
          </p>
        </div>
      </div>

      <div className="model-details-left-body-main">
        {/* Body # 1 */}

        <div className="model-details-left-body">
          <Tooltip title="The total profit (or loss) generated by all strategies">
            <div className="model-details-left-body-stats-total-pnl t-pnl for-font-size">
              <p>Total PNL : &nbsp;</p>
              <p className="color-pnl-body-stat">
                {totalpnl["live_pnls"] ? totalpnl["live_pnls"].pnl_all : null}%
              </p>
            </div>
          </Tooltip>
          {/* <div className="model-details-left-body-stats visited">
            <p className="para-margin for-font-size">Visited by</p>
            <p className="for-font-size">3,655,820</p>
          </div> */}
        </div>

        {/* Body # 2 */}
        <div className="model-details-left-body">
          <div className="model-details-left-body">
            <Tooltip title="Model rank based on its cumulative PNL">
              <div className="model-details-left-body-stats rank for-font-size">
                <p>
                  Rank #
                  {stats[props.model_name]
                    ? stats[props.model_name].rank
                    : null}
                </p>
              </div>
            </Tooltip>
            {/* <div className="model-details-left-body-stats visited">
            <p className="para-margin for-font-size">Visited by</p>
            <p className="for-font-size">3,655,820</p>
          </div> */}
          </div>

          <Tooltip title="Time Horizon">
            <div className="model-details-left-body-stats hours">
              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
              <p className="for-font-size">
                {strategies[props.model_name]
                  ? strategies[props.model_name].time_horizon
                  : null}
              </p>
            </div>
          </Tooltip>

          <Tooltip title="Start date of the model's forecasts">
            <div className="model-details-left-body-stats date">
              <AiOutlineCalendar className="model-details-left-body-stats-icon para-margin" />
              <p className="para-margin for-font-size">
                {strategies[props.model_name]
                  ? strategies[props.model_name].date_started
                  : null}
              </p>
            </div>
          </Tooltip>
        </div>

        {/* Body # 3 */}
        <div className="model-details-left-body">
          <Tooltip title="Currency">
            <div className="model-details-left-body-stats hours">
              <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
              <p className="for-font-size">
                {strategies[props.model_name]
                  ? strategies[props.model_name].currency
                  : null}
              </p>
            </div>
          </Tooltip>
        </div>

        {/* Body # 4 */}

        <div className="model-details-body-left-four">
          {strategies[props.model_name] ? (
            props.model_name.includes("strategy") ||
              props.model_name.split("_").length == 3 ? (
              <div className="model-details-left-body">
                {props.Flag !== "True" ? props.model_name.split("_").length == 3 ? (
                  <div className="model-details-left-body-stats compare-btn-div">

                    <Link
                      to="/compare-strategies"
                      state={{
                        model_name: `${props.model_name}`,
                        currency: `${strategies[props.model_name].currency}`,
                        time_horizon: `${strategies[props.model_name].time_horizon
                          }`,
                      }}
                    >
                      <p className="compare-btn">Compare</p>
                    </Link>
                  </div>
                ) : (
                  <div className="model-details-left-body-stats compare-btn-div">

                    <Link
                      to="/compare-models"
                      state={{
                        model_name: `${props.model_name}`,
                        currency: `${strategies[props.model_name].currency}`,
                        time_horizon: `${strategies[props.model_name].time_horizon
                          }`,
                      }}
                    >
                      <p className="compare-btn">Compare</p>
                    </Link>
                  </div>
                ) : null}

              </div>
            ) : (
              <div className="model-details-left-body">
                <div className="model-details-left-body-stats compare-btn-div">
                  {
                    props.Flag !== "True" ? props.model_name.split("_").length == 3 ? (
                      <Link
                        to="/compare-strategies"
                        state={{
                          model_name: `${props.model_name}`,
                          currency: `${strategies[props.model_name].currency}`,
                          time_horizon: `${strategies[props.model_name].time_horizon
                            }`,
                        }}
                      >
                        <p className="compare-btn">Compare</p>
                      </Link>
                    ) : (
                      <Link
                        to="/compare-models"
                        state={{
                          model_name: `${props.model_name}`,
                          currency: `${strategies[props.model_name].currency}`,
                          time_horizon: `${strategies[props.model_name].time_horizon
                            }`,
                        }}
                      >
                        <p className="compare-btn">Compare</p>
                      </Link>
                    ) : null
                  }
                </div>
              </div>
            )
          ) : null}

          <div className="model-details-left-body">
            {strategies[props.model_name] ? (
              props.model_name.includes("strategy") ||
                props.model_name.split("_").length == 3 ? (
                <div className="model-details-left-body-stats compare-btn-div">
                  {props.model_name.split("_").length == 3 ? (
                    <Link
                      to="/backtest-strategies"
                      state={{
                        model_name: `${props.model_name}`,
                        currency: `${strategies[props.model_name].currency}`,
                        time_horizon: `${strategies[props.model_name].time_horizon
                          }`,
                      }}
                    >
                      <p className="compare-btn">Backtest</p>
                    </Link>
                  ) : (
                    <Link
                      to="/backtest-models"
                      state={{
                        model_name: `${props.model_name}`,
                        currency: `${strategies[props.model_name].currency}`,
                        time_horizon: `${strategies[props.model_name].time_horizon
                          }`,
                      }}
                    >
                      <p className="compare-btn">Backtest</p>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="model-details-left-body-stats compare-btn-div">
                  {props.model_name.split("_").length == 3 ? (
                    <Link
                      to="/backtest-strategies"
                      state={{
                        model_name: `${props.model_name}`,
                        currency: `${strategies[props.model_name].currency}`,
                        time_horizon: `${strategies[props.model_name].time_horizon
                          }`,
                      }}
                    >
                      <p className="compare-btn">Backtest</p>
                    </Link>
                  ) : (
                    <Link
                      to="/backtest-models"
                      state={{
                        model_name: `${props.model_name}`,
                        currency: `${strategies[props.model_name].currency}`,
                        time_horizon: `${strategies[props.model_name].time_horizon
                          }`,
                      }}
                    >
                      <p className="compare-btn">Backtest</p>
                    </Link>
                  )}
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsLeft;
