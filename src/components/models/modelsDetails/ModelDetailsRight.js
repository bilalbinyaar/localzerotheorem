import React from "react";
import "./ModelDetails.css";
import { BsFillInfoCircleFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
const ModelDetailsRight = (props) => {
  const [stats, setStats] = useState({});
  const { stats_cache, Set_stats_cache } = useStateContext();
  // All time Drop Down
  const [drop, setDrop] = useState(false);
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
              // var name = data["response"][i].strategy_name;
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

  // PNL COLORS ACCORDING TO DAYS

  const forDaysPnlColor = (pnl_sum_1, id) => {
    if (pnl_sum_1 < 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (pnl_sum_1 >= 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#16C784 !important");
    }
  };

  // PNL COLORS ACCORDING TO DAYS

  return (
    <div className="model-details-right-new">
      <div className="model-details-right-cards-new">
        <div className="row-for-details">
          <div className="for-tooltip details-right">
            <p>Historical performance</p>
            <Tooltip title="Performance of the model in the past">
              <IconButton>
                <BsFillInfoCircleFill />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {/* ROW 1 */}
        <div className="row-for-details for-margin-bottom">
          <div className="model-details-right-card-new">
            <div className="model-details-right-card-inner-new">
              <h3>1d PNL</h3>
            </div>
            <div className="model-details-right-card-inner-body-new">
              <div className="model-details-right-percentage">
                <h2
                  id="d-pnl"
                  onChange={
                    stats[props.model_name]
                      ? forDaysPnlColor(
                        stats[props.model_name].pnl_sum_1,
                        "d-pnl"
                      )
                      : null
                  }
                >
                  {stats[props.model_name]
                    ? stats[props.model_name].pnl_sum_1
                    : null}
                  {"%"}
                </h2>
              </div>
            </div>
          </div>

          <div className="model-details-right-card-new for-margin">
            <div className="model-details-right-card-inner-new">
              <h3>7d PNL</h3>
            </div>
            <div className="model-details-right-card-inner-body-new">
              <div className="model-details-right-percentage">
                <h2
                  id="d-pnl7"
                  onChange={
                    stats[props.model_name]
                      ? forDaysPnlColor(
                        stats[props.model_name].pnl_sum_7,
                        "d-pnl7"
                      )
                      : null
                  }
                >
                  {stats[props.model_name]
                    ? stats[props.model_name].pnl_sum_7
                    : null}
                  {"%"}
                </h2>
              </div>
            </div>
          </div>

          <div className="model-details-right-card-new">
            <div className="model-details-right-card-inner-new">
              <h3>15d PNL</h3>
            </div>
            <div className="model-details-right-card-inner-body-new">
              <div className="model-details-right-percentage">
                <h2
                  id="d-pnl15"
                  onChange={
                    stats[props.model_name]
                      ? forDaysPnlColor(
                        stats[props.model_name].pnl_sum_15,
                        "d-pnl15"
                      )
                      : null
                  }
                >
                  {stats[props.model_name]
                    ? stats[props.model_name].pnl_sum_15
                    : null}
                  {"%"}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="row-for-details">
          <div className="model-details-right-card-new">
            <div className="model-details-right-card-inner-new">
              <h3>30d PNL</h3>
            </div>
            <div className="model-details-right-card-inner-body-new">
              <div className="model-details-right-percentage">
                <h2
                  id="d-pnl30"
                  onChange={
                    stats[props.model_name]
                      ? forDaysPnlColor(
                        stats[props.model_name].pnl_sum_30,
                        "d-pnl30"
                      )
                      : null
                  }
                >
                  {stats[props.model_name]
                    ? stats[props.model_name].pnl_sum_30
                    : null}
                  {"%"}
                </h2>
              </div>
            </div>
          </div>

          <div className="model-details-right-card-new for-margin">
            <div className="model-details-right-card-inner-new">
              <h3>45d PNL</h3>
            </div>
            <div className="model-details-right-card-inner-body-new">
              <div className="model-details-right-percentage">
                <h2
                  id="d-pnl45"
                  onChange={
                    stats[props.model_name]
                      ? forDaysPnlColor(
                        stats[props.model_name].pnl_sum_45,
                        "d-pnl45"
                      )
                      : null
                  }
                >
                  {stats[props.model_name]
                    ? stats[props.model_name].pnl_sum_45
                    : null}
                  {"%"}
                </h2>
              </div>
            </div>
          </div>

          <div className="model-details-right-card-new">
            <div className="model-details-right-card-inner-new">
              <h3>60d PNL</h3>
            </div>
            <div className="model-details-right-card-inner-body-new">
              <div className="model-details-right-percentage">
                <h2
                  id="d-pnl60"
                  onChange={
                    stats[props.model_name]
                      ? forDaysPnlColor(
                        stats[props.model_name].pnl_sum_60,
                        "d-pnl60"
                      )
                      : null
                  }
                >
                  {stats[props.model_name]
                    ? stats[props.model_name].pnl_sum_60
                    : null}
                  {"%"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsRight;
