import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
import IconButton from "@mui/material/IconButton";

const PerformanceTableBacktest = (props) => {
  const [stats, setStats] = useState({});
  const { stats_cache, Set_stats_cache } = useStateContext();
  useEffect(() => {
    try {
      if (props.model_name.includes("stats")) {
        fetch(
          "https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_stats_backtest/" +
            props.model_name,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data["response"][0]);
            var model_names = {};
            for (var i = 0; i < data["response"].length; i++) {
              // console.log(data["response"][i].strategy_name);
              var name = data["response"][i].strategy_name;
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
      } else if (props.model_name.includes("strategy")) {
        fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data["response"][0]);
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
        if (Object.keys(stats_cache).length == 0) {
          try {
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
                if (JSON.stringify(model_names) !== "{}") {
                  // console.log("Sortable -->", model_names);

                  // const sorted = Object.keys(model_names)
                  //   .map((key) => {
                  //     return { ...model_names[key], key };
                  //   })
                  //   .sort((a, b) => b.total_pnl - a.total_pnl);
                  setStats(model_names);
                  Set_stats_cache({ stats: model_names });

                  // Set_sorted_stats_cache({ sorted_stats: sorted });
                }
              })
              .catch((err) => console.log(err));
          } catch (error) {
            console.log("Error occured");
          }
        } else {
          // console.log("I am using cached values of dd stats -->", stats_cache);
          setStats(stats_cache["stats"]);
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [props.model_name]);
  const forBgColor = (value, id) => {
    if (id === "agg_profit") {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #16c784 !important");
    } else {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #ff2e2e !important");
    }
  };
  return (
    <div className="table-card">
      <div className="table-card-head">
        <h3>General</h3>
      </div>
      <div className="table-card-body">
        <table className="for-table">
          <tr className="for-table-row">
            <th className="for-table-head">
              Aggregate Profit
              <Tooltip
                className="performance-table-tooltip"
                title="The total amount of positive yield generated by the model"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="agg_profit"
              onChange={
                stats[props.model_name]
                  ? forBgColor(
                      stats[props.model_name].total_positive_pnl,
                      "agg_profit"
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].total_positive_pnl
                : null}
              {"%"}
            </td>
            <th className="for-table-head">
              Aggregate Loss
              <Tooltip
                className="performance-table-tooltip"
                title="The total amount of negative yield generated by the model"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="agg_loss"
              onChange={
                stats[props.model_name]
                  ? forBgColor(
                      stats[props.model_name].total_positive_pnl,
                      "agg_loss"
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].total_negative_pnl
                : null}
              {"%"}
            </td>
          </tr>
          <tr className="for-table-row">
            <th className="for-table-head">
              Avg Daily PNL
              <Tooltip
                className="performance-table-tooltip"
                title="Average daily PNL"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name]
                ? stats[props.model_name].average_daily_pnl
                : null}
              {"%"}
            </td>
            <th className="for-table-head">
              R2 Score
              <Tooltip
                className="performance-table-tooltip"
                title="A measurement representing the descriptive power of the model. The closer the R2 score is to 1 the better the model is"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name]
                ? stats[props.model_name].r2_score
                : null}
            </td>
          </tr>
          <tr className="for-table-row">
            <th className="for-table-head">
              Sharpe
              <Tooltip
                className="performance-table-tooltip"
                title="The ratio of annualized yield over standard deviation of yield that the model has experienced. The higher the Sharpe ratio the more consistent a model performance is"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name] ? stats[props.model_name].sharpe : null}
            </td>
            <th className="for-table-head">
              Sortino
              <Tooltip
                className="performance-table-tooltip"
                title="The ratio of annualized yield over the negative standard deviation of yield that the model has experienced. The higher the Sortino ratio the less risky the model performance is"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name] ? stats[props.model_name].sortino : null}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTableBacktest;
