import React, { useEffect, useState, useRef } from "react";
import "./LivePNL.css";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";

const LivePNL = () => {
  const [stats, setStats] = useState([]);
  const [timer_for_current, set_timer_for_current_position] = useState(null);

  const forColor = (total_pnl, id) => {
    try {
      if (total_pnl < 0) {
        document
          .getElementById(`${id}`)
          .setAttribute("style", "color:#FF2E2E !important");
      } else if (total_pnl >= 0) {
        document
          .getElementById(`${id}`)
          .setAttribute("style", "color:#16C784 !important");
      }
    } catch { }
  };

  //   useEffect(() => {
  //     fetch(process.env.REACT_APP_API+ "/get/live_strategies", {
  //       method: "GET",
  //       headers: {
  //                     Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // console.log(data["response"].length);
  //         var data_for_strategies = {};
  //         var model_names = [];
  //         var coin_names = [];
  //         var unique_coins = {};
  //         var index = 0;
  //         for (var i = 0; i < data["response"].length; i++) {
  //           model_names.push({
  //             label: data["response"][i].strategy_name.replace(/_/g, "-"),
  //             value: data["response"][i].time_horizon,
  //             currency: data["response"][i].currency,
  //           });
  //           if (!unique_coins[data["response"][i].currency]) {
  //             unique_coins[data["response"][i].currency] = 1;
  //             coin_names.push({
  //               label: data["response"][i].currency,
  //               // value: i,
  //             });
  //           }
  //           var dt = new Date(
  //             parseInt(data["response"][i].forecast_time) * 1000
  //           ).toLocaleString();
  //           var year = dt.split("/")[2].split(",")[0];
  //           var month = dt.split("/")[0];
  //           if (month.length == 1) {
  //             month = "0" + month;
  //           }
  //           var day = dt.split("/")[1];
  //           if (day.length == 1) {
  //             day = "0" + day;
  //           }
  //           var hours = dt.split(", ")[1].split(":")[0];
  //           if (hours.length == 1) {
  //             hours = "0" + hours;
  //           }
  //           var minutes = dt.split(":")[1];
  //           if (minutes.length == 1) {
  //             minutes = "0" + minutes;
  //           }
  //           var curr_time_version = dt.split(" ")[2];
  //           if (curr_time_version == "PM") {
  //             hours = parseInt(hours) + 12;
  //           }
  //           var dt_str =
  //             year + "-" + month + "-" + day + " " + hours + ":" + minutes;
  //           data_for_strategies["" + i] = {
  //             current_position: data["response"][i].current_position,
  //             time_horizon: data["response"][i].time_horizon,
  //             currency: data["response"][i].currency,
  //             date_started: data["response"][i].date_started,
  //             entry_price: data["response"][i].entry_price,
  //             forecast_time: dt_str,
  //             next_forecast: data["response"][i].next_forecast,
  //             current_price: data["response"][i].current_price,
  //             strategy_name: data["response"][i].strategy_name,
  //             current_pnl: data["response"][i].current_pnl,
  //             position_start_time: data["response"][i].position_start_time,
  //           };
  //         }
  //         if (JSON.stringify(data_for_strategies) !== "{}") {
  //           setStats(data_for_strategies);
  //           //  console.log("Strategies final -->", data_for_strategies);
  //           // console.log("Here are model names --->", model_names);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  useEffect(() => {
    try {
      if (timer_for_current == null) {
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
              data_for_strategies["" + i] = {
                current_position: data["response"][i].current_position,
                time_horizon: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
                date_started: data["response"][i].date_started,
                entry_price: data["response"][i].entry_price,
                forecast_time: dt_str,
                next_forecast: data["response"][i].next_forecast,
                current_price: data["response"][i].current_price,
                strategy_name: data["response"][i].strategy_name.replace(
                  /_/g,
                  "-"
                ),
                current_pnl: data["response"][i].current_pnl,
                portfolio_live_pnl_percent:
                  data["response"][i].portfolio_live_pnl_percent,

                position_start_time: data["response"][i].position_start_time,
              };
            }
            if (JSON.stringify(data_for_strategies) !== "{}") {
              setStats(data_for_strategies);
              //  console.log("Strategies final -->", data_for_strategies);
              // console.log("Here are model names --->", model_names);
            }
          })
          .catch((err) => console.log(err));
      }
      setTimeout(() => {
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
              data_for_strategies["" + i] = {
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
                portfolio_live_pnl_percent:
                  data["response"][i].portfolio_live_pnl_percent,
                position_start_time: data["response"][i].position_start_time,
              };
            }
            if (JSON.stringify(data_for_strategies) !== "{}") {
              setStats(data_for_strategies);
              //  console.log("Strategies final -->", data_for_strategies);
              // console.log("Here are model names --->", model_names);
            }
          })
          .catch((err) => console.log(err));
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);


  const windowWidth = useRef(window.innerWidth);
  return (

    <div>
      {windowWidth.current <= 768 ? (
        // FOR MOBILE
        <div className="live-pnl">
          <div className="container">
            <h2>Live PNLs</h2>

            <table className="live-pnl-table">
              <tr>
                <th className="live-pnl-table-head">
                  <h3>Name</h3>
                </th>
                <th className="live-pnl-table-head">
                  <h3>Individual PNL</h3>
                </th>
                <th className="live-pnl-table-head">
                  <h3>Portfolio PNL</h3>
                </th>


              </tr>


              <tr>
                <td className="live-pnl-table-data">
                  <p>Overall</p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    //   className="live-stats"
                    id="pnl-color53"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${(
                            (parseFloat(stats["0"].current_pnl) +
                              parseFloat(stats["1"].current_pnl) +
                              parseFloat(stats["2"].current_pnl) +
                              parseFloat(stats["3"].current_pnl) +
                              parseFloat(stats["4"].current_pnl) +
                              parseFloat(stats["5"].current_pnl) +
                              parseFloat(stats["6"].current_pnl) +
                              parseFloat(stats["7"].current_pnl) +
                              parseFloat(stats["8"].current_pnl) +
                              parseFloat(stats["9"].current_pnl)) /
                            9
                          ).toFixed(2)}`,
                          "pnl-color53"
                        )
                        : null
                    }
                  >
                    {stats["4"]
                      ? `${(
                        (parseFloat(stats["0"].current_pnl) +
                          parseFloat(stats["1"].current_pnl) +
                          parseFloat(stats["2"].current_pnl) +
                          parseFloat(stats["3"].current_pnl) +
                          parseFloat(stats["4"].current_pnl) +
                          parseFloat(stats["5"].current_pnl) +
                          parseFloat(stats["6"].current_pnl) +
                          parseFloat(stats["7"].current_pnl) +
                          parseFloat(stats["8"].current_pnl) +
                          parseFloat(stats["8"].current_pnl)) /
                        9
                      ).toFixed(2)}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    //   className="live-stats"
                    id="pnl-color55"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${(
                            parseFloat(stats["0"].portfolio_live_pnl_percent) +
                            parseFloat(stats["1"].portfolio_live_pnl_percent) +
                            parseFloat(stats["2"].portfolio_live_pnl_percent) +
                            parseFloat(stats["3"].portfolio_live_pnl_percent) +
                            parseFloat(stats["4"].portfolio_live_pnl_percent) +
                            parseFloat(stats["5"].portfolio_live_pnl_percent) +
                            parseFloat(stats["6"].portfolio_live_pnl_percent) +
                            parseFloat(stats["7"].portfolio_live_pnl_percent) +
                            parseFloat(stats["8"].portfolio_live_pnl_percent)
                          ).toFixed(2)}`,
                          "pnl-color55"
                        )
                        : null
                    }
                  >
                    {stats["4"]
                      ? `${(
                        parseFloat(stats["0"].portfolio_live_pnl_percent) +
                        parseFloat(stats["1"].portfolio_live_pnl_percent) +
                        parseFloat(stats["2"].portfolio_live_pnl_percent) +
                        parseFloat(stats["3"].portfolio_live_pnl_percent) +
                        parseFloat(stats["4"].portfolio_live_pnl_percent) +
                        parseFloat(stats["5"].portfolio_live_pnl_percent) +
                        parseFloat(stats["6"].portfolio_live_pnl_percent) +
                        parseFloat(stats["7"].portfolio_live_pnl_percent) +
                        parseFloat(stats["8"].portfolio_live_pnl_percent)
                      ).toFixed(2)}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["0"] ? (
                        <Link to={stats["0"].strategy_name.replace(/-/g, "_")}>
                          {stats["0"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color23"
                    onChange={
                      stats["0"]
                        ? forColor(
                          `${parseFloat(stats["0"].current_pnl)}`,
                          "pnl-color23"
                        )
                        : null
                    }
                  >
                    {stats["0"] ? `${stats["0"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color223"
                    onChange={
                      stats["0"]
                        ? forColor(
                          `${parseFloat(stats["0"].portfolio_live_pnl_percent)}`,
                          "pnl-color223"
                        )
                        : null
                    }
                  >
                    {stats["0"]
                      ? `${stats["0"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["1"] ? (
                        <Link to={stats["1"].strategy_name.replace(/-/g, "_")}>
                          {stats["1"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color2"
                    onChange={
                      stats["1"]
                        ? forColor(
                          `${parseFloat(stats["1"].current_pnl)}`,
                          "pnl-color2"
                        )
                        : null
                    }
                  >
                    {stats["1"] ? `${stats["1"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color22"
                    onChange={
                      stats["1"]
                        ? forColor(
                          `${parseFloat(stats["1"].portfolio_live_pnl_percent)}`,
                          "pnl-color22"
                        )
                        : null
                    }
                  >
                    {stats["1"]
                      ? `${stats["1"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["2"] ? (
                        <Link to={stats["2"].strategy_name.replace(/-/g, "_")}>
                          {stats["2"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color333"
                    onChange={
                      stats["2"]
                        ? forColor(
                          `${parseFloat(stats["2"].current_pnl)}`,
                          "pnl-color333"
                        )
                        : null
                    }
                  >
                    {stats["2"] ? `${stats["2"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color335"
                    onChange={
                      stats["2"]
                        ? forColor(
                          `${parseFloat(stats["2"].portfolio_live_pnl_percent)}`,
                          "pnl-color335"
                        )
                        : null
                    }
                  >
                    {stats["2"]
                      ? `${stats["2"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["3"] ? (
                        <Link to={stats["3"].strategy_name.replace(/-/g, "_")}>
                          {stats["3"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color4"
                    onChange={
                      stats["3"]
                        ? forColor(
                          `${parseFloat(stats["3"].current_pnl)}`,
                          "pnl-color4"
                        )
                        : null
                    }
                  >
                    {stats["3"] ? `${stats["3"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color44"
                    onChange={
                      stats["3"]
                        ? forColor(
                          `${parseFloat(stats["3"].portfolio_live_pnl_percent)}`,
                          "pnl-color44"
                        )
                        : null
                    }
                  >
                    {stats["3"]
                      ? `${stats["3"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["4"] ? (
                        <Link to={stats["4"].strategy_name.replace(/-/g, "_")}>
                          {stats["4"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color43"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${parseFloat(stats["4"].current_pnl)}`,
                          "pnl-color43"
                        )
                        : null
                    }
                  >
                    {stats["4"] ? `${stats["4"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color443"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${parseFloat(stats["4"].portfolio_live_pnl_percent)}`,
                          "pnl-color443"
                        )
                        : null
                    }
                  >
                    {stats["4"]
                      ? `${stats["4"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["5"] ? (
                        <Link to={stats["5"].strategy_name.replace(/-/g, "_")}>
                          {stats["5"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color14"
                    onChange={
                      stats["5"]
                        ? forColor(
                          `${parseFloat(stats["5"].current_pnl)}`,
                          "pnl-color14"
                        )
                        : null
                    }
                  >
                    {stats["5"] ? `${stats["5"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color154"
                    onChange={
                      stats["5"]
                        ? forColor(
                          `${parseFloat(stats["5"].portfolio_live_pnl_percent)}`,
                          "pnl-color154"
                        )
                        : null
                    }
                  >
                    {stats["5"]
                      ? `${stats["5"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["6"] ? (
                        <Link to={stats["6"].strategy_name.replace(/-/g, "_")}>
                          {stats["6"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color246"
                    onChange={
                      stats["6"]
                        ? forColor(
                          `${parseFloat(stats["6"].current_pnl)}`,
                          "pnl-color246"
                        )
                        : null
                    }
                  >
                    {stats["6"] ? `${stats["6"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color2246"
                    onChange={
                      stats["6"]
                        ? forColor(
                          `${parseFloat(stats["6"].portfolio_live_pnl_percent)}`,
                          "pnl-color2246"
                        )
                        : null
                    }
                  >
                    {stats["6"]
                      ? `${stats["6"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>

              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["7"] ? (
                        <Link to={stats["7"].strategy_name.replace(/-/g, "_")}>
                          {stats["7"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color3"
                    onChange={
                      stats["7"]
                        ? forColor(
                          `${parseFloat(stats["7"].current_pnl)}`,
                          "pnl-color3"
                        )
                        : null
                    }
                  >
                    {stats["7"] ? `${stats["7"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color33"
                    onChange={
                      stats["7"]
                        ? forColor(
                          `${parseFloat(stats["7"].portfolio_live_pnl_percent)}`,
                          "pnl-color33"
                        )
                        : null
                    }
                  >
                    {stats["7"]
                      ? `${stats["7"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>


              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["8"] ? (
                        <Link to={stats["8"].strategy_name.replace(/-/g, "_")}>
                          {stats["8"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color48"
                    onChange={
                      stats["8"]
                        ? forColor(
                          `${parseFloat(stats["8"].current_pnl)}`,
                          "pnl-color48"
                        )
                        : null
                    }
                  >
                    {stats["8"] ? `${stats["8"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color448"
                    onChange={
                      stats["8"]
                        ? forColor(
                          `${parseFloat(stats["8"].portfolio_live_pnl_percent)}`,
                          "pnl-color448"
                        )
                        : null
                    }
                  >
                    {stats["8"]
                      ? `${stats["8"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>


              <tr>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["9"] ? (
                        <Link to={stats["9"].strategy_name.replace(/-/g, "_")}>
                          {stats["9"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color489"
                    onChange={
                      stats["9"]
                        ? forColor(
                          `${parseFloat(stats["9"].current_pnl)}`,
                          "pnl-color489"
                        )
                        : null
                    }
                  >
                    {stats["9"] ? `${stats["9"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color449"
                    onChange={
                      stats["9"]
                        ? forColor(
                          `${parseFloat(stats["9"].portfolio_live_pnl_percent)}`,
                          "pnl-color449"
                        )
                        : null
                    }
                  >
                    {stats["9"]
                      ? `${stats["9"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>


              </tr>



              <tr>












              </tr>
            </table>
          </div>
        </div>
      ) : (
        // FOR WEB
        <div className="live-pnl">
          <div className="container">
            <h2>Live PNLs</h2>

            <table className="live-pnl-table">
              <tr>
                <th className="live-pnl-table-head">
                  <h3>PNL</h3>
                </th>
                <td className="live-pnl-table-data">
                  <p>Overall</p>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["0"] ? (
                        <Link to={stats["0"].strategy_name.replace(/-/g, "_")}>
                          {stats["0"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["1"] ? (
                        <Link to={stats["1"].strategy_name.replace(/-/g, "_")}>
                          {stats["1"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["2"] ? (
                        <Link to={stats["2"].strategy_name.replace(/-/g, "_")}>
                          {stats["2"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["3"] ? (
                        <Link to={stats["3"].strategy_name.replace(/-/g, "_")}>
                          {stats["3"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["4"] ? (
                        <Link to={stats["4"].strategy_name.replace(/-/g, "_")}>
                          {stats["4"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["5"] ? (
                        <Link to={stats["5"].strategy_name.replace(/-/g, "_")}>
                          {stats["5"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["6"] ? (
                        <Link to={stats["6"].strategy_name.replace(/-/g, "_")}>
                          {stats["6"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["7"] ? (
                        <Link to={stats["7"].strategy_name.replace(/-/g, "_")}>
                          {stats["7"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["8"] ? (
                        <Link to={stats["8"].strategy_name.replace(/-/g, "_")}>
                          {stats["8"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
                <td className="live-pnl-table-data">
                  <div className="link-icon-div for-h3-mb">
                    <p className="strategies-color">
                      {stats["9"] ? (
                        <Link to={stats["9"].strategy_name.replace(/-/g, "_")}>
                          {stats["9"].strategy_name}
                        </Link>
                      ) : (
                        "Loading"
                      )}
                    </p>
                    <BiLinkExternal className="model-link-icon" />
                  </div>
                </td>
              </tr>

              <tr className="for-border-bottom">
                <th className="live-pnl-table-head">
                  <h3>Individual</h3>
                </th>
                <td className="live-pnl-table-data">
                  <p
                    //   className="live-stats"
                    id="pnl-color53"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${(
                            (parseFloat(stats["0"].current_pnl) +
                              parseFloat(stats["1"].current_pnl) +
                              parseFloat(stats["2"].current_pnl) +
                              parseFloat(stats["3"].current_pnl) +
                              parseFloat(stats["4"].current_pnl) +
                              parseFloat(stats["5"].current_pnl) +
                              parseFloat(stats["6"].current_pnl) +
                              parseFloat(stats["7"].current_pnl) +
                              parseFloat(stats["8"].current_pnl) +
                              parseFloat(stats["9"].current_pnl)) /
                            9
                          ).toFixed(2)}`,
                          "pnl-color53"
                        )
                        : null
                    }
                  >
                    {stats["4"]
                      ? `${(
                        (parseFloat(stats["0"].current_pnl) +
                          parseFloat(stats["1"].current_pnl) +
                          parseFloat(stats["2"].current_pnl) +
                          parseFloat(stats["3"].current_pnl) +
                          parseFloat(stats["4"].current_pnl) +
                          parseFloat(stats["5"].current_pnl) +
                          parseFloat(stats["6"].current_pnl) +
                          parseFloat(stats["7"].current_pnl) +
                          parseFloat(stats["8"].current_pnl) +
                          parseFloat(stats["8"].current_pnl)) /
                        9
                      ).toFixed(2)}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color23"
                    onChange={
                      stats["0"]
                        ? forColor(
                          `${parseFloat(stats["0"].current_pnl)}`,
                          "pnl-color23"
                        )
                        : null
                    }
                  >
                    {stats["0"] ? `${stats["0"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color2"
                    onChange={
                      stats["1"]
                        ? forColor(
                          `${parseFloat(stats["1"].current_pnl)}`,
                          "pnl-color2"
                        )
                        : null
                    }
                  >
                    {stats["1"] ? `${stats["1"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color333"
                    onChange={
                      stats["2"]
                        ? forColor(
                          `${parseFloat(stats["2"].current_pnl)}`,
                          "pnl-color333"
                        )
                        : null
                    }
                  >
                    {stats["2"] ? `${stats["2"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color4"
                    onChange={
                      stats["3"]
                        ? forColor(
                          `${parseFloat(stats["3"].current_pnl)}`,
                          "pnl-color4"
                        )
                        : null
                    }
                  >
                    {stats["3"] ? `${stats["3"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color43"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${parseFloat(stats["4"].current_pnl)}`,
                          "pnl-color43"
                        )
                        : null
                    }
                  >
                    {stats["4"] ? `${stats["4"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color14"
                    onChange={
                      stats["5"]
                        ? forColor(
                          `${parseFloat(stats["5"].current_pnl)}`,
                          "pnl-color14"
                        )
                        : null
                    }
                  >
                    {stats["5"] ? `${stats["5"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color246"
                    onChange={
                      stats["6"]
                        ? forColor(
                          `${parseFloat(stats["6"].current_pnl)}`,
                          "pnl-color246"
                        )
                        : null
                    }
                  >
                    {stats["6"] ? `${stats["6"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color3"
                    onChange={
                      stats["7"]
                        ? forColor(
                          `${parseFloat(stats["7"].current_pnl)}`,
                          "pnl-color3"
                        )
                        : null
                    }
                  >
                    {stats["7"] ? `${stats["7"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color48"
                    onChange={
                      stats["8"]
                        ? forColor(
                          `${parseFloat(stats["8"].current_pnl)}`,
                          "pnl-color48"
                        )
                        : null
                    }
                  >
                    {stats["8"] ? `${stats["8"].current_pnl}%` : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color489"
                    onChange={
                      stats["9"]
                        ? forColor(
                          `${parseFloat(stats["9"].current_pnl)}`,
                          "pnl-color489"
                        )
                        : null
                    }
                  >
                    {stats["9"] ? `${stats["9"].current_pnl}%` : null}
                  </p>
                </td>
              </tr>

              <tr>
                <th className="live-pnl-table-head">
                  <h3>Portfolio</h3>
                </th>
                <td className="live-pnl-table-data">
                  <p
                    //   className="live-stats"
                    id="pnl-color55"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${(
                            parseFloat(stats["0"].portfolio_live_pnl_percent) +
                            parseFloat(stats["1"].portfolio_live_pnl_percent) +
                            parseFloat(stats["2"].portfolio_live_pnl_percent) +
                            parseFloat(stats["3"].portfolio_live_pnl_percent) +
                            parseFloat(stats["4"].portfolio_live_pnl_percent) +
                            parseFloat(stats["5"].portfolio_live_pnl_percent) +
                            parseFloat(stats["6"].portfolio_live_pnl_percent) +
                            parseFloat(stats["7"].portfolio_live_pnl_percent) +
                            parseFloat(stats["8"].portfolio_live_pnl_percent)
                          ).toFixed(2)}`,
                          "pnl-color55"
                        )
                        : null
                    }
                  >
                    {stats["4"]
                      ? `${(
                        parseFloat(stats["0"].portfolio_live_pnl_percent) +
                        parseFloat(stats["1"].portfolio_live_pnl_percent) +
                        parseFloat(stats["2"].portfolio_live_pnl_percent) +
                        parseFloat(stats["3"].portfolio_live_pnl_percent) +
                        parseFloat(stats["4"].portfolio_live_pnl_percent) +
                        parseFloat(stats["5"].portfolio_live_pnl_percent) +
                        parseFloat(stats["6"].portfolio_live_pnl_percent) +
                        parseFloat(stats["7"].portfolio_live_pnl_percent) +
                        parseFloat(stats["8"].portfolio_live_pnl_percent)
                      ).toFixed(2)}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color223"
                    onChange={
                      stats["0"]
                        ? forColor(
                          `${parseFloat(stats["0"].portfolio_live_pnl_percent)}`,
                          "pnl-color223"
                        )
                        : null
                    }
                  >
                    {stats["0"]
                      ? `${stats["0"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color22"
                    onChange={
                      stats["1"]
                        ? forColor(
                          `${parseFloat(stats["1"].portfolio_live_pnl_percent)}`,
                          "pnl-color22"
                        )
                        : null
                    }
                  >
                    {stats["1"]
                      ? `${stats["1"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color335"
                    onChange={
                      stats["2"]
                        ? forColor(
                          `${parseFloat(stats["2"].portfolio_live_pnl_percent)}`,
                          "pnl-color335"
                        )
                        : null
                    }
                  >
                    {stats["2"]
                      ? `${stats["2"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color44"
                    onChange={
                      stats["3"]
                        ? forColor(
                          `${parseFloat(stats["3"].portfolio_live_pnl_percent)}`,
                          "pnl-color44"
                        )
                        : null
                    }
                  >
                    {stats["3"]
                      ? `${stats["3"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color443"
                    onChange={
                      stats["4"]
                        ? forColor(
                          `${parseFloat(stats["4"].portfolio_live_pnl_percent)}`,
                          "pnl-color443"
                        )
                        : null
                    }
                  >
                    {stats["4"]
                      ? `${stats["4"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color154"
                    onChange={
                      stats["5"]
                        ? forColor(
                          `${parseFloat(stats["5"].portfolio_live_pnl_percent)}`,
                          "pnl-color154"
                        )
                        : null
                    }
                  >
                    {stats["5"]
                      ? `${stats["5"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color2246"
                    onChange={
                      stats["6"]
                        ? forColor(
                          `${parseFloat(stats["6"].portfolio_live_pnl_percent)}`,
                          "pnl-color2246"
                        )
                        : null
                    }
                  >
                    {stats["6"]
                      ? `${stats["6"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color33"
                    onChange={
                      stats["7"]
                        ? forColor(
                          `${parseFloat(stats["7"].portfolio_live_pnl_percent)}`,
                          "pnl-color33"
                        )
                        : null
                    }
                  >
                    {stats["7"]
                      ? `${stats["7"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color448"
                    onChange={
                      stats["8"]
                        ? forColor(
                          `${parseFloat(stats["8"].portfolio_live_pnl_percent)}`,
                          "pnl-color448"
                        )
                        : null
                    }
                  >
                    {stats["8"]
                      ? `${stats["8"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
                <td className="live-pnl-table-data">
                  <p
                    className="live-stats"
                    id="pnl-color449"
                    onChange={
                      stats["9"]
                        ? forColor(
                          `${parseFloat(stats["9"].portfolio_live_pnl_percent)}`,
                          "pnl-color449"
                        )
                        : null
                    }
                  >
                    {stats["9"]
                      ? `${stats["9"].portfolio_live_pnl_percent}%`
                      : null}
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </div>

  );
};

export default LivePNL;
