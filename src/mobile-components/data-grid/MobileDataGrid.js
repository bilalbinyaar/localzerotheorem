import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridGraph from "../../components/modelDataGrid/GridGraph";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useStateContext } from "../../ContextProvider";
import Select, { components } from "react-select";
import ModelNameCol from "./ModelNameCol";
import { AiFillCaretDown } from "react-icons/ai";

const MobileDataGrid = () => {
  const [rows_cached, set_rows_cached] = useState([]);
  const [coin_search_selection, set_coin_search_selection] = useState([
    { label: "Ripple", value: 1 },
    { label: "BTC", value: 2 },
    { label: "Ethereum", value: 3 },
  ]);

  const [model_search_selection, set_model_search_selection] = useState([
    { label: "Area50", value: 1 },
    { label: "Area51", value: 2 },
    { label: "Area52", value: 3 },
  ]);

  const handleChangeForCoinSelection = async (selected) => {
    if (selected != null) {
      const res = rows_cached.filter((item) => {
        return item.currency == selected.label;
      });
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };
  const handleChangeForModelSelection = async (selected) => {
    if (selected != null) {
      const res = await rows_cached.filter((item) => {
        return item.modelNameMob == selected.label;
      });
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };
  const styles = {
    container: (css) => ({ ...css, width: "200px" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <SearchOutlined />
      </components.DropdownIndicator>
    );
  };
  // const currency = [
  //   { label: "Area50", value: 1 },
  //   { label: "Area51", value: 2 },
  //   { label: "Area52", value: 3 },
  // ];
  // const models = [
  //   { label: "Area50", value: 1 },
  //   { label: "Area51", value: 2 },
  //   { label: "Area52", value: 3 },
  // ];
  const [topPerformerModels, setTopPerformersModels] = useState(null);
  const [strategies, setStrategies] = useState(null);

  const {
    stats_cache,
    strategies_cache,
    sorted_stats_cache,
    Set_strategies_cache,
    Set_sorted_stats_cache,
    Set_stats_cache,
    coin_selection_cache,
    Set_coin_search_selection_cache,
    model_selection_cache,
    Set_model_search_selection_cache,
  } = useStateContext();
  const [pnl_for_each_strategy, setPnlForEachStrategy] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    try {
      if (strategies == null && pnl_for_each_strategy == null) {
        return;
      } else {
        // console.log("Hi here is pnl for each -->", pnl_for_each_strategy);
        var data_for_rows = [];
        var index = 0;

        for (var key in strategies) {
          data_for_rows.push({
            modelNameMob: [
              strategies[key].time_horizon,
              strategies[key].currency,
              key,
              strategies[key].current_position,
            ],
            totalpnl: pnl_for_each_strategy[key].total_pnl,
            pnlGraph: `${key}`,
          });
          index++;
        }
        if (data_for_rows.length != 0) {
          setRows(data_for_rows);
          set_rows_cached(data_for_rows);
          // console.log("Here are data grid--->", data_for_rows);
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [strategies]);

  useEffect(() => {
    try {
      if (topPerformerModels == null) {
        return;
      } else {
        if (Object.keys(strategies_cache).length == 0) {
          fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_strategies", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
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
                // console.log("Strategies final -->", data_for_strategies);
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
          set_coin_search_selection(coin_selection_cache["coin_names"]);
          set_model_search_selection(model_selection_cache["model_names"]);
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [topPerformerModels]);

  useEffect(() => {
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

              const sorted = Object.keys(model_names)
                .map((key) => {
                  return { ...model_names[key], key };
                })
                .sort((a, b) => b.total_pnl - a.total_pnl);
              Set_stats_cache({ stats: model_names });
              setPnlForEachStrategy(model_names);

              Set_sorted_stats_cache({ sorted_stats: sorted });
              setTopPerformersModels(sorted);
            }
          })
          .catch((err) => console.log(err));
      } else {
        // console.log(
        //   "I am using cached values of sorted stats -->",
        //   sorted_stats_cache
        // );
        setTopPerformersModels(sorted_stats_cache["sorted_stats"]);
        setPnlForEachStrategy(stats_cache["stats"]);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, []);

  // To Link Grid Rows to Models Component
  const linkModels = useNavigate();
  const handleRowClickEvent = (params) => {
    linkModels(`/${params.row.modelName.replace(/_/g, "-")}`, {
      state: { model_name: params.row.modelName },
    });
  };
  // To Link Grid Rows to Models Component

  const [isActive, setIsActive] = useState(false);
  const handleClick = (e) => {
    e.currentTarget.classList.remove("active");
    e.currentTarget.classList.add("active");
    setIsActive((current) => !current);
  };

  const handleChangeForTimeHorizonSelection = (id, timeH) => {
    if (timeH == "All") {
      setRows(rows_cached);
    } else {
      const res = rows_cached.filter((item) => {
        return item.timeHorizon == timeH;
      });
      setRows(res);
    }
  };

  const columns = [
    {
      field: "modelName",
      headerName: "Model Name",
      width: 110,
      sortable: true,
      headerAlign: "center",
      flex: 1.2,
      renderCell: (cellValues) => {
        return <ModelNameCol value={cellValues.value} />;
      },
    },

    {
      field: "totalpnl",
      headerName: "Total PNL",
      width: 110,
      sortable: true,
      headerAlign: "center",
      flex: 1,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value < 0,
          positive: params.value > 0,
        });
      },
    },

    {
      field: "pnlGraph",
      headerName: "PNL Graph",
      sortable: true,
      width: 120,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return <DataGridGraph model_name={cellValues.value} />;
      },
    },
  ];

  return (
    <div>
      <div className="horizon">
        <div className="horizon-row">
          <div className="horizon-left">
            <h3>Time Horizon</h3>
            <div className="divider-icon">
              <p>All</p>
              <AiFillCaretDown className="dd-ico" />
            </div>
            {/* <div className="hours-list">
                <ul>
                  <li
                    id="hours-listings hours_filter_All"
                    className="active"
                    onClick={() => {
                      handleChangeForTimeHorizonSelection(
                        "hour_filter_24",
                        "All"
                      );
                    }}
                  >
                    All
                  </li>
                  <li
                    id="hours-listings hour_filter_24"
                    onClick={() => {
                      handleChangeForTimeHorizonSelection(
                        "hour_filter_24",
                        "24h"
                      );
                    }}
                  >
                    24h
                  </li>
                  <li
                    id="hours-listings hour_filter_12"
                    onClick={() => {
                      handleChangeForTimeHorizonSelection(
                        "hour_filter_12",
                        "12h"
                      );
                    }}
                  >
                    12h
                  </li>
                  <li
                    id="hours-listings hour_filter_8"
                    onClick={() => {
                      handleChangeForTimeHorizonSelection(
                        "hour_filter_8",
                        "8h"
                      );
                    }}
                  >
                    8h
                  </li>
                  <li
                    id="hours-listings hour_filter_3"
                    onClick={() => {
                      handleChangeForTimeHorizonSelection(
                        "hour_filter_3",
                        "3h"
                      );
                    }}
                  >
                    3h
                  </li>
                  <li
                    id="hours-listings hour_filter_2"
                    onClick={() => {
                      handleChangeForTimeHorizonSelection(
                        "hour_filter_2",
                        "2h"
                      );
                    }}
                  >
                    2h
                  </li>
                  <li
                    id="hours-listings hour_filter_1"
                    onClick={() => {
                      handleChangeForTimeHorizonSelection(
                        "hour_filter_1",
                        "1h"
                      );
                    }}
                  >
                    1h
                  </li>
                </ul>
              </div> */}
          </div>

          <div className="horizon-right">
            <Select
              placeholder="Currency"
              options={coin_search_selection}
              components={{ DropdownIndicator }}
              showSearch
              styles={styles}
              onChange={handleChangeForCoinSelection}
            />
            <Select
              placeholder="Models"
              options={model_search_selection}
              components={{ DropdownIndicator }}
              styles={styles}
              onChange={handleChangeForModelSelection}
            />
          </div>
        </div>
        <div className="model-grid">
          <Box
            sx={{
              height: 650,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DataGrid
              onRowClick={handleRowClickEvent}
              sx={{
                borderColor: "var(--color-grid-border)",
                color: "var(--color-day-black)",
                "& .MuiDataGrid-cell:hover": {
                  color: "var(--color-day-yellow)",
                },
                "& .MuiDataGrid-cell": {
                  justifyContent: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "12px",
                },
                backgroundColor: "var(--color-day-white)",
                "& .MuiDataGrid-columnHeaders": {
                  borderBottomColor: "var(--color-grid-border)",
                },
                "& .MuiDataGrid-row": {
                  borderBottomColor: "var(--color-grid-border)",
                },
                "& div div div div >.MuiDataGrid-cell": {
                  borderBottom: "none",
                },

                "& .MuiDataGrid-footerContainer": {
                  borderTopColor: "var(--color-grid-border)",
                },
                "& .super-app.negative": {
                  color: "#FF2E2E",
                  fontWeight: "600",
                },
                "& .super-app.positive": {
                  color: " #16C784",
                  fontWeight: "600",
                },
              }}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
              pagination
            />
          </Box>
        </div>
      </div>
      <div className="model-grid">
        <Box
          sx={{
            height: 650,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DataGrid
            onRowClick={handleRowClickEvent}
            sx={{
              borderColor: "var(--color-grid-border)",
              color: "var(--color-day-black)",
              "& .MuiDataGrid-cell:hover": {
                color: "var(--color-day-yellow)",
              },
              "& .MuiDataGrid-cell": {
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "12px",
              },
              backgroundColor: "var(--color-day-white)",
              "& .MuiDataGrid-columnHeaders": {
                borderBottomColor: "var(--color-grid-border)",
              },
              "& .MuiDataGrid-row": {
                borderBottomColor: "var(--color-grid-border)",
              },
              "& div div div div >.MuiDataGrid-cell": {
                borderBottom: "none",
              },

              "& .MuiDataGrid-footerContainer": {
                borderTopColor: "var(--color-grid-border)",
              },
              "& .super-app.negative": {
                color: "#FF2E2E",
                fontWeight: "600",
              },
              "& .super-app.positive": {
                color: " #16C784",
                fontWeight: "600",
              },
            }}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            pagination
          />
        </Box>
      </div>
    </div>
  );
};

export default MobileDataGrid;
