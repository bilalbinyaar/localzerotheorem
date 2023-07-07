import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
import IconButton from "@mui/material/IconButton";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";

const DrawDownTableBacktest = (props) => {
  // console.log("Model name received -->", props.model_name);

  // console.log("I received model name -->", props.model_name);
  // const [model_name, set_model_name] = useState(props.model_name);
  const [stats, setStats] = useState({});
  const { stats_cache, Set_stats_cache } = useStateContext();
  useEffect(() => {
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
              max_drawdown_duration: data["response"][i].max_drawdown_duration,
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

            // Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } else if (
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
          // console.log(data["response"][0]);
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
              Set_stats_cache({ stats: model_names });

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else {
        // console.log("I am using cached values of dd stats -->", stats_cache);
        setStats(stats_cache["stats"]);
      }
    }
  }, [props.model_name]);
  const forBgColor = (value, id) => {
    document
      .getElementById(`${id}`)
      .setAttribute("style", "color: #ff2e2e !important");
  };
  return (
    // TABLE NEW

    <div className="table-card">
      <div className="table-card-head">
        <h3>Drawdown (DD)</h3>
      </div>
      <div className="table-card-body">
        <table className="for-table">
          <tr className="for-table-row">
            <th className="for-table-head">
              Max DD
              <Tooltip title="Maximum Drawdown – Measurement of maximum negative yield experienced in the past">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="drawdown_color"
              onChange={
                stats[props.model_name]
                  ? forBgColor(
                      stats[props.model_name].max_drawdown,
                      "drawdown_color"
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].max_drawdown
                : "null"}
              {"%"}
            </td>
            <th className="for-table-head">
              Max DD Days
              <Tooltip title="Maximum Drawdown Days – Measurement of the maximum number of days the model was in a negative yield">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name]
                ? stats[props.model_name].max_drawdown_duration
                : "null"}
              {/* {"d"} */}
            </td>
          </tr>
          <tr className="for-table-row">
            <th className="for-table-head">
              Avg DD
              <Tooltip title="Average Drawdown – The average negative yield experienced by the model">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="drawdown_color2"
              onChange={
                stats[props.model_name]
                  ? forBgColor(
                      stats[props.model_name].max_drawdown,
                      "drawdown_color2"
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].average_drawdown
                : "null"}
              {"%"}
            </td>
            <th className="for-table-head">
              Average DD Days
              <Tooltip title="Average Drawdown Days – The average number of days in a negative yield experienced by the model">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name]
                ? stats[props.model_name].average_drawdown_duration
                : "null"}
              {/* {"d"} */}
            </td>
          </tr>
          <tr className="for-table-row">
            <th className="for-table-head">
              Current DD
              <Tooltip title="Current Drawdown – The actual negative yield (if in a negative) that is currently being experienced by the model">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="drawdown_color3"
              onChange={
                stats[props.model_name]
                  ? forBgColor(
                      stats[props.model_name].max_drawdown,
                      "drawdown_color3"
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].current_drawdown
                : "null"}
              {"%"}
            </td>
            <th className="for-table-head">
              Current DD Days
              <Tooltip title="Current Drawdown Days – The actual number of days in a negative yield (if in a negative) that is currently being experienced by the model">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name]
                ? stats[props.model_name].curr_drawdown_duration
                : "null"}
              {/* {"d"} */}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DrawDownTableBacktest;
