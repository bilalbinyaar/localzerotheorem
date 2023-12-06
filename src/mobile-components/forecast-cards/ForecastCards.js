import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useStateContext } from "../../ContextProvider";
import ForecastsSpline from "../../components/models/graphs/ForecastsSpline";
import { useNavigate } from "react-router-dom";

const ForecastCards = () => {
  // TOTAL PNL COLORS
  const forColor = (total_pnl, id) => {
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
  // TOTAL PNL COLORS

  const {
    checked,
    stats_cache,
    strategies_cache,
    sorted_stats_cache,
    Set_strategies_cache,
    Set_sorted_stats_cache,
    Set_stats_cache,
  } = useStateContext();

  const [topPerformerModels, setTopPerformersModels] = useState([]);
  useEffect(() => {
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
              //console.log("Sortable -->", model_names);

              const sorted = Object.keys(model_names)
                .map((key) => {
                  return { ...model_names[key], key };
                })
                .sort((a, b) => b.total_pnl - a.total_pnl);
              setTopPerformersModels(sorted);
              Set_stats_cache({ stats: model_names });

              Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else {
        //   console.log(
        //     "I am using cached values of sorted stats -->",
        //     sorted_stats_cache
        //   );
        setTopPerformersModels(sorted_stats_cache["sorted_stats"]);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, []);

  const [strategies, setStrategies] = useState({});

  useEffect(() => {
    try {
      if (Object.keys(strategies_cache).length == 0) {
        fetch(process.env.REACT_APP_API + "/get_strategies", {
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
                label: data["response"][i].strategy_name,
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
              // console.log("DT", dt, dt_str);

              data_for_strategies[data["response"][i].strategy_name] = {
                current_position: data["response"][i].current_position,
                time_horizon: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
                date_started: data["response"][i].date_started,
                entry_price: data["response"][i].entry_price,
                forecast_time: dt_str,
                // .split(".")[0]
                // .slice(0, -3),
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
              set_model_search_selection(model_names);
              //  console.log("Strategies final -->", data_for_strategies);
              Set_strategies_cache({ strategies: data_for_strategies });
              Set_coin_search_selection_cache({
                coin_names: coin_names,
              });
              Set_model_search_selection_cache({
                model_names: model_names,
              });
              // console.log("Here are model names --->", model_names);
            }
          })
          .catch((err) => console.log(err));
      } else {
        //   console.log(
        //     "I am using cached value of strategies -->",
        //     strategies_cache
        //   );
        setStrategies(strategies_cache["strategies"]);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [topPerformerModels]);
  // To Link Grid Rows to Models Component
  const linkModels = useNavigate();
  // To Link Grid Rows to Models Component

  return (
    <div className="forecasts-cards-main">
      <div className="forecasts-cards">
        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>01</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[0].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[0]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[0]
                      ? Object.values(topPerformerModels)[0].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[0] &&
                          strategies[
                          Object.values(topPerformerModels)[0].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[0]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[0] &&
                          strategies[
                          Object.values(topPerformerModels)[0].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[0]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color"
                  onChange={
                    Object.values(topPerformerModels)[1] &&
                      strategies[
                      Object.values(topPerformerModels)[0].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[0].total_pnl
                        ),
                        "pnl-color"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[0] &&
                    strategies[Object.values(topPerformerModels)[0].strategy_name]
                    ? `${Object.values(topPerformerModels)[0].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[0] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[0].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>02</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[1].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[1]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[1]
                      ? Object.values(topPerformerModels)[1].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[1] &&
                          strategies[
                          Object.values(topPerformerModels)[1].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[1]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[1] &&
                          strategies[
                          Object.values(topPerformerModels)[1].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[1]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color2"
                  onChange={
                    Object.values(topPerformerModels)[1] &&
                      strategies[
                      Object.values(topPerformerModels)[1].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[1].total_pnl
                        ),
                        "pnl-color2"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[1] &&
                    strategies[Object.values(topPerformerModels)[1].strategy_name]
                    ? `${Object.values(topPerformerModels)[1].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[1] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[1].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>3</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[2].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[2]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[2]
                      ? Object.values(topPerformerModels)[2].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[2] &&
                          strategies[
                          Object.values(topPerformerModels)[2].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[2]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[2] &&
                          strategies[
                          Object.values(topPerformerModels)[2].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[2]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color3"
                  onChange={
                    Object.values(topPerformerModels)[2] &&
                      strategies[
                      Object.values(topPerformerModels)[2].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[2].total_pnl
                        ),
                        "pnl-color3"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[2] &&
                    strategies[Object.values(topPerformerModels)[2].strategy_name]
                    ? `${Object.values(topPerformerModels)[2].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[2] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[2].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>04</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[3].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[3]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[3]
                      ? Object.values(topPerformerModels)[3].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[3] &&
                          strategies[
                          Object.values(topPerformerModels)[3].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[3]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[3] &&
                          strategies[
                          Object.values(topPerformerModels)[3].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[3]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color4"
                  onChange={
                    Object.values(topPerformerModels)[3] &&
                      strategies[
                      Object.values(topPerformerModels)[3].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[3].total_pnl
                        ),
                        "pnl-color4"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[3] &&
                    strategies[Object.values(topPerformerModels)[3].strategy_name]
                    ? `${Object.values(topPerformerModels)[3].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[3] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[3].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>05</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[4].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[4]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[4]
                      ? Object.values(topPerformerModels)[4].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[4] &&
                          strategies[
                          Object.values(topPerformerModels)[4].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[4]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[4] &&
                          strategies[
                          Object.values(topPerformerModels)[4].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[4]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color5"
                  onChange={
                    Object.values(topPerformerModels)[4] &&
                      strategies[
                      Object.values(topPerformerModels)[4].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[4].total_pnl
                        ),
                        "pnl-color5"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[4] &&
                    strategies[Object.values(topPerformerModels)[4].strategy_name]
                    ? `${Object.values(topPerformerModels)[4].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[4] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[4].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>06</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[5].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[5]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[5]
                      ? Object.values(topPerformerModels)[5].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[5] &&
                          strategies[
                          Object.values(topPerformerModels)[5].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[5]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[5] &&
                          strategies[
                          Object.values(topPerformerModels)[5].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[5]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color6"
                  onChange={
                    Object.values(topPerformerModels)[5] &&
                      strategies[
                      Object.values(topPerformerModels)[5].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[4].total_pnl
                        ),
                        "pnl-color6"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[5] &&
                    strategies[Object.values(topPerformerModels)[5].strategy_name]
                    ? `${Object.values(topPerformerModels)[5].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[5] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[5].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>07</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[6].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[6]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[6]
                      ? Object.values(topPerformerModels)[6].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[6] &&
                          strategies[
                          Object.values(topPerformerModels)[6].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[6]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[6] &&
                          strategies[
                          Object.values(topPerformerModels)[6].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[6]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color7"
                  onChange={
                    Object.values(topPerformerModels)[6] &&
                      strategies[
                      Object.values(topPerformerModels)[6].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[4].total_pnl
                        ),
                        "pnl-color7"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[6] &&
                    strategies[Object.values(topPerformerModels)[6].strategy_name]
                    ? `${Object.values(topPerformerModels)[6].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[6] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[6].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>08</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[7].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[7]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[7]
                      ? Object.values(topPerformerModels)[7].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[7] &&
                          strategies[
                          Object.values(topPerformerModels)[7].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[7]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[7] &&
                          strategies[
                          Object.values(topPerformerModels)[7].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[7]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color8"
                  onChange={
                    Object.values(topPerformerModels)[7] &&
                      strategies[
                      Object.values(topPerformerModels)[7].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[4].total_pnl
                        ),
                        "pnl-color8"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[7] &&
                    strategies[Object.values(topPerformerModels)[7].strategy_name]
                    ? `${Object.values(topPerformerModels)[7].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[7] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[7].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>09</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[8].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[8]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[8]
                      ? Object.values(topPerformerModels)[8].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[8] &&
                          strategies[
                          Object.values(topPerformerModels)[8].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[8]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[8] &&
                          strategies[
                          Object.values(topPerformerModels)[8].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[8]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color9"
                  onChange={
                    Object.values(topPerformerModels)[8] &&
                      strategies[
                      Object.values(topPerformerModels)[8].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[4].total_pnl
                        ),
                        "pnl-color9"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[8] &&
                    strategies[Object.values(topPerformerModels)[8].strategy_name]
                    ? `${Object.values(topPerformerModels)[8].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[8] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[8].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="forecasts-card card-margin">
          <div className="announcement-card">
            <div className="announcement-row">
              <div className="title-div">
                <h2>10</h2>
                <div className="forecasts-model-name">
                  <h3
                    onClick={() => {
                      linkModels(
                        `/${Object.values(
                          topPerformerModels
                        )[9].strategy_name.replace(/_/g, "-")}`,
                        {
                          state: {
                            model_name:
                              Object.values(topPerformerModels)[9]
                                .strategy_name,
                          },
                        }
                      );
                    }}
                  >
                    {Object.values(topPerformerModels)[9]
                      ? Object.values(topPerformerModels)[9].strategy_name
                      : "Model Name"}
                  </h3>
                  <div className="model-details-left-body for-forecasts-card">
                    <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[9] &&
                          strategies[
                          Object.values(topPerformerModels)[9].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[9]
                              .strategy_name
                          ].time_horizon
                          }`
                          : null}
                      </p>
                    </div>
                    <div className="model-details-left-body-stats date for-forecast-card-details">
                      <p className="para-margin">
                        {Object.values(topPerformerModels)[9] &&
                          strategies[
                          Object.values(topPerformerModels)[9].strategy_name
                          ]
                          ? `${strategies[
                            Object.values(topPerformerModels)[9]
                              .strategy_name
                          ].currency
                          }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-more">
                <h3
                  id="pnl-color10"
                  onChange={
                    Object.values(topPerformerModels)[9] &&
                      strategies[
                      Object.values(topPerformerModels)[9].strategy_name
                      ]
                      ? forColor(
                        parseInt(
                          Object.values(topPerformerModels)[4].total_pnl
                        ),
                        "pnl-color10"
                      )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[9] &&
                    strategies[Object.values(topPerformerModels)[9].strategy_name]
                    ? `${Object.values(topPerformerModels)[9].total_pnl}`
                    : null}
                  {"%"}
                </h3>
              </div>
            </div>

            <div className="announcement-news">
              <div className="news-inner">
                {Object.values(topPerformerModels)[9] ? (
                  <ForecastsSpline
                    model_name={
                      Object.values(topPerformerModels)[9].strategy_name
                    }
                  />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCards;
