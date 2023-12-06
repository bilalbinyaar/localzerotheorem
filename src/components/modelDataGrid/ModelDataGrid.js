import React, { useEffect, useState, memo, useRef } from "react";
import "./ModelDataGrid.css";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import Swal from "sweetalert2";
import DataGridGraph from "./GridGraph";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Timer from "../timer/Timer";
import { useStateContext } from "../../ContextProvider";
import ModelNameCol from "../../mobile-components/data-grid/ModelNameCol";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import TradingViewSplineAreaChart from "../models/graphs/TvSplineAreaChart";
import IconButton from "@mui/material/IconButton";
import { ThreeDots } from "react-loader-spinner";

import {
  GridColDef,
  GridFooterContainer,
  GridPagination,
  GridValueGetterParams,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { database, auth } from "../../firebase_config";
import { ref, onValue, set, update } from "firebase/database";

export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          {...item}
        />
      )}
    />
  );
}
function CustomFooter() {
  return (
    <GridFooterContainer>
      <CustomPagination />
      <GridPagination />
    </GridFooterContainer>
  );
}

const ModelDataGrid = () => {
  const windowWidth = useRef(window.innerWidth);
  const [pinnedRows, setPinnedRows] = useState([]);
  const [Flag, setFlag] = useState(null);
  const [timeH, setTimeH] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedItem, setSelectedItem] = useState("All");

  // console.log("I am called here to due to dark mode");
  const [rows_cached, set_rows_cached] = useState([]);
  const [coin_search_selection, set_coin_search_selection] = useState([]);
  // console.log("Testing data ", coin_search_selection);
  const [model_search_selection, set_model_search_selection] = useState([]);

  const handleChangeForCoinSelection = (event, values) => {
    if (values != null) {
      if (selectedItem == "All") {
        const res = rows_cached.filter((item) => {
          return item.currency == values.label;
        });
        set_model_search_selection(model_selection_cache["model_names"]);
        setRows(res);
      } else {
        const res = rows_cached.filter((item) => {
          return item.currency === values.label;
        });
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label && obj.value == selectedItem;
        });
        set_model_search_selection(output);
        setRows(res);
      }
      // setRows({});
    } else {
      if (selectedItem === "All") {
        set_model_search_selection(model_selection_cache["model_names"]);
        setRows(rows_cached);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === selectedItem;
        });
        set_model_search_selection(output);
        setRows(rows_cached);
      }
    }
  };
  // const handleChangeForCoinSelection3 = (event, values) => {
  //   // console.log("Search dropdown -->", values);
  //   if (values != null) {
  //     if (selectedItem3 == "All") {
  //       let output = model_selection_cache["model_names"].filter((obj) => {
  //         return obj.currency === values.label;
  //       });
  //       set_model_names3(output);
  //     } else {
  //       let output = model_selection_cache["model_names"].filter((obj) => {
  //         return obj.currency === values.label && obj.value === selectedItem3;
  //       });
  //       set_model_names3(output);
  //     }
  //   } else {
  //     if (selectedItem3 == "All") {
  //       set_model_names3(model_selection_cache["model_names"]);
  //     } else {
  //       let output = model_selection_cache["model_names"].filter((obj) => {
  //         return obj.value === selectedItem3;
  //       });
  //       set_model_names3(output);
  //     }
  //   }
  // };
  const handleChangeForModelSelection = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      // setRows({});
      const res = rows_cached.filter((item) => {
        return item.modelName == values.label;
      });
      handleChangePage("", 1);
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };

  const handleChangeForTimeHorizon = (event, values) => {
    // console.log("Search dropdown -->", values.props.value);
    if (values != null) {
      // setRows({});
      setTimeH(values.props.value);

      if (values.props.value == "All") {
        setRows(rows_cached);
      } else {
        handleChangePage("", 1);
        const res = rows_cached.filter((item) => {
          return item.timeHorizon == values.props.value;
        });

        setRows(res);
      }
    } else {
      setTimeH("All");

      setRows(rows_cached);
    }
  };

  const styles = {
    container: (css) => ({ ...css, width: "200px" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  // const DropdownIndicator = (props) => {
  //   return (
  //     <components.DropdownIndicator {...props}>
  //       <SearchOutlined />
  //     </components.DropdownIndicator>
  //   );
  // };
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
    uid,
    setUid,
    authCheckLogin,
    setAuthCheckLogin,
  } = useStateContext();
  const [pnl_for_each_strategy, setPnlForEachStrategy] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // console.log("Here is strategies -->", strategies, pnl_for_each_strategy);
    try {
      if (strategies == null || pnl_for_each_strategy == null) {
        return;
      } else {
        //   console.log("Hi here is pnl for each -->", pnl_for_each_strategy);
        var data_for_rows = [];
        var index = 0;
        for (var key in strategies) {
          data_for_rows.push({
            favs: false,
            id: index,
            modelNameMob: [
              strategies[key].time_horizon,
              strategies[key].currency,
              key,
              strategies[key].current_position,
            ],
            modelName: key.replace(/_/g, "-"),
            currency: strategies[key].currency,
            timeHorizon: strategies[key].time_horizon,
            dateAdded: strategies[key].date_started,
            currentForecast: strategies[key].current_position,
            pnl_sum_7: pnl_for_each_strategy[key].pnl_sum_7,
            nextForecast: [
              strategies[key].time_horizon,
              strategies[key].next_forecast,
            ],
            avg_daily_pnl: pnl_for_each_strategy[key].average_daily_pnl,
            forecast_time: strategies[key].forecast_time,
            tpsl: "$186 / $740",

            totalpnl: pnl_for_each_strategy[key].total_pnl,
            pnlGraph: `${key}`,
          });
          index++;
        }
        if (data_for_rows.length != 0) {
          setRows(data_for_rows);
          setPinnedRows([data_for_rows[2]]);
          set_rows_cached(data_for_rows);
          setIsLoaded(true);
          //  console.log("Here are data grid--->", data_for_rows);
        }
      }
    } catch (err) {
      console.log("Error occured -->", err);
    }
  }, [strategies]);
  const [favs_list, set_favs_list] = useState([]);
  useEffect(() => {
    if (authCheckLogin == true) {
      // console.log("UID is --->", uid);
      if (rows.length == 0 && authCheckLogin == true) {
        setAuthCheckLogin(true);
      }
      if (rows.length > 0 && uid != null) {
        const starCountRef = ref(database, "user_favs/" + uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          // console.log("Here is the data -->", data, uid);
          var favs_models_list = [];
          for (let name in data) {
            favs_models_list.push(name);
          }
          if (favs_models_list.length > 0) {
            set_favs_list(favs_models_list);
          }
        });
      }
    } else {
      if (rows.length > 0) {
        const updatedRows = rows.map((row) =>
          row.favs == true ? { ...row, ["favs"]: false } : row
        );
        setRows(updatedRows);
        // set_rows_cached(rows);
      }
    }
  }, [authCheckLogin, rows]);

  useEffect(() => {
    try {
      if (favs_list.length > 0) {
        const updatedRows = rows.map((row) =>
          favs_list.includes(row.modelName) ? { ...row, ["favs"]: true } : row
        );
        var sorted = {};
        if (Object.keys(updatedRows).length > 10) {
          sorted = Object.keys(updatedRows)
            .map((key) => {
              return { ...updatedRows[key], key };
            })
            .sort((a, b) => b.favs - a.favs);
        }

        if (Object.keys(sorted).length > 10) {
          setRows(sorted);
          // set_rows_cached(rows);
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [favs_list]);

  useEffect(() => {
    try {
      if (topPerformerModels == null) {
        return;
      } else {
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
              console.log("Here pnl list -->", pnl_for_each_strategy);
              var data_for_strategies = {};
              var model_names = [];
              var coin_names = [];
              var unique_coins = {};
              var index = 0;
              for (var i = 0; i < data["response"].length; i++) {
                // var name = data["response"][i].strategy_name.replace(/_/g, "-");
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
                // console.log("Locale string -->", dt);
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
          // console.log(
          //   "I am using cached value of strategies -->",
          //   strategies_cache
          // );
          setStrategies(strategies_cache["strategies"]);
          // console.log(
          //   "Here are model names c--->",
          //   model_selection_cache["model_names"]
          // );

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
      if (Flag == null) {
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
                setFlag(true);
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
          setFlag(true);
        }
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, []);

  // To Link Grid Rows to Models Component
  const linkModels = useNavigate();
  const handleRowClickEvent = (params) => {
    // linkModels(`/${params.row.modelName.replace(/_/g, "-")}`);
  };
  // To Link Grid Rows to Models Component

  const columns = [
    {
      field: "favs",
      headerName: "",
      headerAlign: "center",
      width: 8,
      type: Boolean,
      sortable: false,
      renderCell: (cellValues) => {
        return cellValues.value == true ? (
          <AiFillStar className="star-filled-icons" />
        ) : (
          <AiOutlineStar className="star-icons" />
        );
      },
    },

    { field: "id", headerName: "#", headerAlign: "center", width: 18 },
    // {
    //   field: "modelName",
    //   headerName: "Model Name",
    //   width: 110,
    //   sortable: true,
    //   headerAlign: "center",
    //   flex: 1.2,
    // },
    {
      field: "modelNameMob",
      // headerName: "Model",
      width: 120,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => (
        <strong>
          {"Model "}
          <Tooltip
            className="performance-table-tooltip"
            title="Model name, time horizon, and currency"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
      flex: 1.5,
      renderCell: (cellValues) => {
        return <ModelNameCol value={cellValues.value} />;
      },
    },
    {
      field: "dateAdded",
      headerName: "Start Date",
      type: "date",
      width: 130,
      sortable: true,
      headerAlign: "center",
      flex: 1.65,
      renderHeader: (params) => (
        <strong>
          {"Start Date "}
          <Tooltip
            className="performance-table-tooltip"
            title="Start date of the model's forecasts"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },
    {
      field: "currentForecast",
      // headerName: "Forecast",
      width: 180,
      sortable: true,
      headerAlign: "center",
      flex: 1.55,

      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value === "Short",
          positive: params.value === "Long",
        });
      },
      renderHeader: (params) => (
        <strong>
          {"Forecast "}
          <Tooltip
            className="performance-table-tooltip"
            title="Price/Directional prediction for current time"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },

    {
      field: "forecast_time",
      headerName: "Forecast Time",
      width: 140,
      sortable: true,
      headerAlign: "center",
      flex: 2,
      renderHeader: (params) => (
        <strong>
          {"Forecast Time"}
          <Tooltip
            className="performance-table-tooltip"
            title="Time when the forecast is created (in local system time)"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },

    {
      field: "nextForecast",
      headerName: "Next Forecast",
      width: 120,
      sortable: false,
      headerAlign: "center",
      flex: 1.67,
      renderCell: (cellValues) => {
        // console.log("Here is the model -->", cellValues.value);
        return <Timer time_horizon={cellValues.value} />;
      },
      renderHeader: (params) => (
        <strong>
          {"Next Forecast "}
          <Tooltip
            className="performance-table-tooltip"
            title="Countdown clock till time of next forecast"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },

    {
      field: "avg_daily_pnl",
      headerName: "Avg Daily PNL",
      width: 100,
      sortable: true,
      headerAlign: "center",
      flex: 2,
      renderHeader: (params) => (
        <strong>
          {"Avg Daily PNL"}
          <Tooltip
            className="performance-table-tooltip"
            title="Average daily PNL"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },

    {
      field: "pnl_sum_7",
      headerName: "7d PNL",
      width: 120,
      sortable: true,
      headerAlign: "center",
      flex: 1.4,
      renderHeader: (params) => (
        <strong>
          {"7d PNL "}
          <Tooltip
            className="performance-table-tooltip"
            title="PNL of last 7 days"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },

    {
      field: "totalpnl",
      headerName: "Total PNL",
      width: 110,
      sortable: true,
      headerAlign: "center",
      flex: 1.63,
      renderHeader: (params) => (
        <strong>
          {"Total PNL "}
          <Tooltip
            className="performance-table-tooltip"
            title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)
"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),

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
      sortable: false,
      width: 120,
      headerAlign: "center",
      flex: 1.5,
      renderCell: (cellValues) => {
        // console.log("I am called in dark mode -->", cellValues.value);
        return <DataGridGraph model_name={cellValues.value + "_PNL"} />;
      },
      renderHeader: (params) => (
        <strong>
          {"PNL Graph "}
          <Tooltip
            className="performance-table-tooltip"
            title="Cumulative PNL graph w.r.t time"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },
  ];

  const columnsTab = [
    {
      field: "favs",
      headerName: "",
      headerAlign: "center",
      width: 7,
      type: Boolean,
      sortable: false,
      renderCell: (cellValues) => {
        return cellValues.value == true ? (
          <AiFillStar className="star-filled-icons" />
        ) : (
          <AiOutlineStar className="star-icons" />
        );
      },
    },

    { field: "id", headerName: "#", headerAlign: "center", width: 23 },

    {
      field: "modelNameMob",
      // headerName: "Model",
      width: 120,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => (
        <strong>
          {"Model "}
          <Tooltip
            className="performance-table-tooltip"
            title="Model name, time horizon, and currency"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
      flex: 1.4,
      renderCell: (cellValues) => {
        return <ModelNameCol value={cellValues.value} />;
      },
    },
    // {
    //   field: "dateAdded",
    //   headerName: "Start Date",
    //   type: "date",
    //   width: 130,
    //   sortable: true,
    //   headerAlign: "center",
    //   flex: 1.5,
    //   renderHeader: (params) => (
    //     <strong>
    //       {"Start Date "}
    //       <Tooltip
    //         className="performance-table-tooltip"
    //         title="Forecasts start date"
    //       >
    //         <IconButton>
    //           <BsFillInfoCircleFill />Time Horizon
    //         </IconButton>
    //       </Tooltip>
    //     </strong>
    //   ),
    // },
    {
      field: "currentForecast",
      // headerName: "Forecast",
      width: 180,
      sortable: true,
      headerAlign: "center",
      flex: 1.4,

      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value === "Short",
          positive: params.value === "Long",
        });
      },
      renderHeader: (params) => (
        <strong>
          {"Forecast "}
          <Tooltip
            className="performance-table-tooltip"
            title="Price/Directional prediction for current time"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },

    {
      field: "forecast_time",
      headerName: "Forecast Time",
      width: 140,
      sortable: true,
      headerAlign: "center",
      flex: 1.75,
      renderHeader: (params) => (
        <strong>
          {"Forecast Time"}
          <Tooltip
            className="performance-table-tooltip"
            title="Time when the forecast is created (in local system time)"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },

    // {
    //   field: "nextForecast",
    //   headerName: "Next Forecast",
    //   width: 120,
    //   sortable: false,
    //   headerAlign: "center",
    //   flex: 1.6,
    //   renderCell: (cellValues) => {
    //     // console.log("Here is the model -->", cellValues.value);
    //     return <Timer time_horizon={cellValues.value} />;
    //   },
    //   renderHeader: (params) => (
    //     <strong>
    //       {"Next Forecast "}
    //       <Tooltip
    //         className="performance-table-tooltip"
    //         title="Countdown clock till time of next forecast"
    //       >
    //         <IconButton>
    //           <BsFillInfoCircleFill />
    //         </IconButton>
    //       </Tooltip>
    //     </strong>
    //   ),
    // },

    // {
    //   field: "avg_daily_pnl",
    //   headerName: "Avg Daily PNL",
    //   width: 100,
    //   sortable: true,
    //   headerAlign: "center",
    //   flex: 1.75,
    //   renderHeader: (params) => (
    //     <strong>
    //       {"Avg Daily PNL"}
    //       <Tooltip
    //         className="performance-table-tooltip"
    //         title="Average daily PNL"
    //       >
    //         <IconButton>
    //           <BsFillInfoCircleFill />
    //         </IconButton>
    //       </Tooltip>
    //     </strong>
    //   ),
    // },

    // {
    //   field: "pnl_sum_7",
    //   headerName: "7d PNL",
    //   width: 120,
    //   sortable: true,
    //   headerAlign: "center",
    //   flex: 1.3,
    //   renderHeader: (params) => (
    //     <strong>
    //       {"7d PNL "}
    //       <Tooltip
    //         className="performance-table-tooltip"
    //         title="PNL of last 7 days"
    //       >
    //         <IconButton>
    //           <BsFillInfoCircleFill />
    //         </IconButton>
    //       </Tooltip>
    //     </strong>
    //   ),
    // },

    {
      field: "totalpnl",
      headerName: "Total PNL",
      width: 110,
      sortable: true,
      headerAlign: "center",
      flex: 1.45,
      renderHeader: (params) => (
        <strong>
          {"Total PNL "}
          <Tooltip
            className="performance-table-tooltip"
            title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)
"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),

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
      sortable: false,
      width: 120,
      headerAlign: "center",
      flex: 1.35,
      renderCell: (cellValues) => {
        // console.log("I am called in dark mode -->", cellValues.value);
        return <DataGridGraph model_name={cellValues.value + "_PNL"} />;
      },
      renderHeader: (params) => (
        <strong>
          {"PNL Graph "}
          <Tooltip
            className="performance-table-tooltip"
            title="Cumulative PNL graph w.r.t time"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },
  ];

  // To Link Grid Rows to Models Component

  const handleChangeForTimeHorizonSelection = (id, timeH) => {
    // var for_style = set_curr_active(id);
    // document.getElementById(id).style = "background-color : green !important";
    // console.log("Current active is -->", id);

    if (timeH == "All") {
      setRows(rows_cached);
      set_model_search_selection(model_selection_cache["model_names"]);
    } else {
      handleChangePage("", 1);

      const res = rows_cached.filter((item) => {
        return item.timeHorizon == timeH;
      });
      let output = model_selection_cache["model_names"].filter((obj) => {
        return obj.value === timeH;
      });
      set_model_search_selection(output);
      setRows(res);
    }
  };

  // COLUMNS FOR MOBILE VIEW
  const columnsMobile = [
    // {
    //   field: "favs",
    //   with: 10,
    //   flex: 0.09,
    //   headerName: "",
    //   headerAlign: "center",
    //   type: Boolean,
    //   sortable: false,
    //   renderCell: (cellValues) => {
    //     return cellValues.value == true ? (
    //       <AiFillStar className="star-filled-icons" />
    //     ) : (
    //       <AiOutlineStar className="star-icons" />
    //     );
    //   },
    // },

    {
      field: "modelNameMob",
      headerName: "Model",
      width: 120,
      sortable: false,
      headerAlign: "center",
      flex: 1.5,
      renderCell: (cellValues) => {
        // console.log("I am mobile component bro");
        return <ModelNameCol value={cellValues.value} />;
      },
    },

    {
      field: "totalpnl",
      headerName: "Total PNL",
      width: 100,
      sortable: true,
      headerAlign: "center",
      flex: 0.9,
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
      sortable: false,
      width: 100,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return <DataGridGraph model_name={cellValues.value + "_PNL"} />;
      },
    },
  ];
  // COLUMNS FOR MOBILE VIEW

  const handleChangeForCoinSelectionMob = async (selected) => {
    if (selected != null) {
      const res = rows_cached.filter((item) => {
        return item.currency == selected.label;
      });
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };
  const handleChangeForModelSelectionMob = async (selected) => {
    if (selected != null) {
      const res = rows_cached.filter((item) => {
        return item.modelName == selected.label;
      });
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };

  const [isActive, setActive] = useState("true");
  // const [isActive1, setActive1] = useState('false');
  // const activeList = () => {
  //   setActive(!isActive);
  // };
  // const activeList1 = () => {
  //   setActive1(!isActive1);
  // };
  const [curr_active, set_curr_active] = useState("hours_filter_All");

  const [pageSize, setPageSize] = React.useState(20);

  const { data } = {
    dataSet: "Commodity",
    rowLength: 540,
    maxColumns: 6,
  };

  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    // console.log("Value is -->", value);
    setPage(value);
    // setPageSize(value);
  };

  const handleChangePageSize = (event) => {
    setPageSize(+event.target.value);
    setPage(1);
  };
  const gridRef = React.createRef();
  const start = (page - 1) * pageSize;
  const end = page * rows.length;
  function handleCellClick(params, event) {
    // console.log(`Cell clicked: row ${params.row.id}, column ${params.value}`);
    if (params.field == "favs") {
      if (authCheckLogin == true) {
        const updatedRows = rows.map((row) =>
          row.id === params.row.id
            ? row.favs == true
              ? { ...row, ["favs"]: false }
              : { ...row, ["favs"]: true }
            : row
        );
        setRows(updatedRows);
        // set_rows_cached(rows);
        if (params.row.favs == false) {
          const updateObj = {};
          updateObj[params.row.modelName] = true;
          update(ref(database, "user_favs/" + uid), updateObj);
          // const userFavsRef = database.ref(`user_favs/${uid}`);
          // const model_name_for_favs = params.row.modelName;
          // userFavsRef.update(model_name_for_favs);
        } else {
          const updateObj = {};
          updateObj[params.row.modelName] = null;
          update(ref(database, "user_favs/" + uid), updateObj);
        }
      } else {
        Swal.fire({
          title: "Kindly login for making model favourite",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-right",
          showConfirmButton: false,
        });
      }
    } else {
      linkModels(`/${params.row.modelName.replace(/_/g, "-")}`);
    }
  }
  return (
    <div className="model-grid">
      <div className="container">
        {windowWidth.current <= 568 ? (
          <div className="model-grid-mob">
            <div className="horizon">
              <h2 className="horizon-head">All Models</h2>
              <p className="all-models-description">
                Listed below are all the forecast models, which can be filtered
                by their time horizon, currency, or name. Additionally, you can
                sort selective columns in ascending or descending order by
                clicking on the column header.
              </p>
              <div className="horizon-row">
                <div className="horizon-left">
                  {/* <h3>Time Horizon</h3> */}
                  {/* <div className="divider-icon">
                  <p>All</p>
                  <AiFillCaretDown className="dd-ico" />
                </div> */}
                  <FormControl
                    variant="standard"
                    className="all-horizon"
                    sx={{ m: 1, minWidth: 60 }}
                  >
                    {/* <InputLabel id="demo-simple-select-standard-label"></InputLabel> */}
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      sx={{
                        backgroundColor: "var(--color-forecasts-card)",
                        borderRadius: "5px",
                        padding: "3.8px 8px 3.8px 11px",
                        fontSize: "11px",
                        marginRight: "0.4rem",
                        borderBottom: "0 !important",
                      }}
                      select
                      value={timeH}
                      onChange={handleChangeForTimeHorizon}
                      label="age"
                    >
                      <MenuItem value="All">Horizons</MenuItem>
                      <MenuItem value={"24h"}>24h</MenuItem>
                      <MenuItem value={"12h"}>12h</MenuItem>
                      <MenuItem value={"8h"}>8h</MenuItem>
                      <MenuItem value={"6h"}>6h</MenuItem>
                      <MenuItem value={"4h"}>4h</MenuItem>
                      <MenuItem value={"3h"}>3h</MenuItem>
                      <MenuItem value={"2h"}>2h</MenuItem>
                      <MenuItem value={"1h"}>1h</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="horizon-right">
                  <Autocomplete
                    id="country-select-demo"
                    className="currency-auto"
                    sx={{
                      backgroundColor: "var(--color-forecasts-card)",
                      borderRadius: "5px",
                      labelColor: "red",
                      fontSize: "11px",
                      "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "var(--color-day-black)",
                      },

                      "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input":
                      {
                        color: "var(--color-day-black)",
                      },
                      "& div  >.MuiAutocomplete-option.Mui-focused": {
                        backgroundColor: "var(--color-day-yellow)",
                        color: "#000000",
                      },

                      "& div >.MuiOutlinedInput-root": {
                        padding: "4px",
                      },

                      "& div div >.MuiAutocomplete-input": {
                        padding: "4.5px 4px 4.5px 6px",
                      },

                      "& div >.MuiAutocomplete-option": {
                        fontSize: "12px",
                        margin: "0",
                        color: "var(--color-day-black)",
                      },

                      "& .MuiAutocomplete-noOptions": {
                        color: "var(--color-day-black)",
                        fontSize: "12px",
                      },

                      "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper": {
                        backgroundColor: "var(--color-dropdown-bg)",
                      },

                      "& div div >.MuiAutocomplete-input": {
                        fontSize: "11px",
                      },

                      "& .css-1xc3v61-indicatorContainer": {
                        backgroundColor: "var(--color-day-white)",
                      },

                      "& .css-13cymwt-control": {
                        minHeight: "34px",
                        height: "34px",
                      },

                      "& .css-i4bv87-MuiSvgIcon-root": {
                        width: "0.8em !important",
                        height: "0.8em !important",
                        fill: "var(--color-black-opcaity) !important",
                      },

                      "& .css-i4bv87-MuiSvgIcon-root": {
                        width: "0.8em !important",
                        height: "0.8em !important",
                        fill: "var(--color-black-opcaity) !important",
                      },

                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        color: "var(--color-day-black) !important",
                      },

                      "& div div >.MuiOutlinedInput-root": {
                        backgroundColor:
                          "var(--color-forecasts-card) !important",
                        color: "var(--color-day-black) !important",
                      },

                      "& div div >.MuiOutlinedInput-root:focus": {
                        border: "0 !important",
                      },

                      "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus": {
                        borderColor: "var(--color-day-yellow) !important",
                      },

                      "& div >.MuiOutlinedInput-notchedOutline": {
                        border: "0px solid var(--color-day-yellow) !important",
                      },

                      "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        fontSize: "12px !important",
                        color: "var(--color-day-black) !important",
                        top: "-6px !important",
                      },

                      "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
                      {
                        backgroundColor:
                          "var(--color-dropdown-bg) !important",
                        color: "var(--color-day-black) !important",
                      },

                      "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "var(--color-day-yellow) !important",
                      },

                      "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "var(--color-day-yellow) !important",
                      },

                      "& .css-ptiqhd-MuiSvgIcon-root": {
                        height: "0.8em !important",
                        width: "0.8em !important",
                        fill: "var(--color-black-opcaity) !important",
                      },

                      "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                        padding: "3px 8px !important",
                        backgroundColor: "var(--color-day-yellow) !important",
                        borderRadius: "4px",
                        display: "flex !important",
                        justifyContent: "center !important",
                        alignItems: "center !important",
                        fontSize: "15px !important",
                        textAlign: "center !important",
                      },

                      "& .optgroup": {
                        padding: "2px !important",
                      },

                      "& div div >.optgroup": {
                        backgroundColor: "var(--color-day-white) !important",
                        color: "var(--color-day-black) !important",
                      },

                      "& .mui-options": {
                        padding: "0px 15px",
                      },

                      "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
                        borderBottom:
                          "2px solid var(--color-day-black) !important",
                      },

                      "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "var(--color-day-black) !important",
                        fontSize: "14px !important",
                      },

                      "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                        color: "var(--color-day-black) !important",
                      },

                      "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:before":
                      {
                        borderBottom:
                          "1px solid var(--color-day-yellow) !important",
                      },

                      "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                      {
                        borderBottom:
                          "2px solid var(--color-day-yellow) !important",
                      },

                      "& #demo-simple-select-standard-label": {
                        color: "var(--color-day-yellow) !important",
                      },

                      "& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon": {
                        color: "var(--color-day-black) !important",
                      },

                      "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected":
                      {
                        backgroundColor: "var(--color-day-yellow) !important",
                        color: "black",
                      },

                      "& .css-1869usk-MuiFormControl-root": {
                        height: "60px !important",
                      },

                      "& div div >.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                      {
                        color: "var(--color-day-black) !important",
                        fontSize: "14px !important",
                      },

                      "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root": {
                        fontSize: "13px !important",
                      },

                      "& .css-nlvv43-MuiFormControl-root": {
                        margin: "0px 8px !important",
                        height: "30px !important",
                      },

                      "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        fontSize: "12px !important",
                        color: "var(--color-day-black) !important",
                        top: "-8px !important",
                      },
                    }}
                    onChange={handleChangeForCoinSelection}
                    options={coin_search_selection}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Currencies"
                        inputProps={{
                          ...params.inputProps,
                          style: { width: "30%" }, // set the width to auto

                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    id="country-select-demo"
                    className="model-auto"
                    sx={{
                      backgroundColor: "var(--color-forecasts-card)",
                      borderRadius: "5px",
                      labelColor: "red",
                      fontSize: "11px",
                      marginLeft: "0.4rem",
                      "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "var(--color-day-black)",
                      },

                      "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input":
                      {
                        color: "var(--color-day-black)",
                      },
                      "& div  >.MuiAutocomplete-option.Mui-focused": {
                        backgroundColor: "var(--color-day-yellow)",
                        color: "#000000",
                      },

                      "& div >.MuiOutlinedInput-root": {
                        padding: "4px",
                      },

                      "& div div >.MuiAutocomplete-input": {
                        padding: "4.5px 4px 4.5px 6px",
                      },

                      "& div >.MuiAutocomplete-option": {
                        fontSize: "12px",
                        margin: "0",
                        color: "var(--color-day-black)",
                      },

                      "& .MuiAutocomplete-noOptions": {
                        color: "var(--color-day-black)",
                        fontSize: "12px",
                      },

                      "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper": {
                        backgroundColor: "var(--color-dropdown-bg)",
                      },

                      "& div div >.MuiAutocomplete-input": {
                        fontSize: "11px",
                      },

                      "& .css-1xc3v61-indicatorContainer": {
                        backgroundColor: "var(--color-day-white)",
                      },

                      "& .css-13cymwt-control": {
                        minHeight: "34px",
                        height: "34px",
                      },

                      "& .css-i4bv87-MuiSvgIcon-root": {
                        width: "0.8em !important",
                        height: "0.8em !important",
                        fill: "var(--color-black-opcaity) !important",
                      },

                      "& .css-i4bv87-MuiSvgIcon-root": {
                        width: "0.8em !important",
                        height: "0.8em !important",
                        fill: "var(--color-black-opcaity) !important",
                      },

                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        color: "var(--color-day-black) !important",
                      },

                      "& div div >.MuiOutlinedInput-root": {
                        backgroundColor:
                          "var(--color-forecasts-card) !important",
                        color: "var(--color-day-black) !important",
                      },

                      "& div div >.MuiOutlinedInput-root:focus": {
                        border: "0 !important",
                      },

                      "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus": {
                        borderColor: "var(--color-day-yellow) !important",
                      },

                      "& div >.MuiOutlinedInput-notchedOutline": {
                        border: "0px solid var(--color-day-yellow) !important",
                      },

                      "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        fontSize: "12px !important",
                        color: "var(--color-day-black) !important",
                        top: "-6px !important",
                      },

                      "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
                      {
                        backgroundColor:
                          "var(--color-dropdown-bg) !important",
                        color: "var(--color-day-black) !important",
                      },

                      "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "var(--color-day-yellow) !important",
                      },

                      "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "var(--color-day-yellow) !important",
                      },

                      "& .css-ptiqhd-MuiSvgIcon-root": {
                        height: "0.8em !important",
                        width: "0.8em !important",
                        fill: "var(--color-black-opcaity) !important",
                      },

                      "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                        padding: "3px 8px !important",
                        backgroundColor: "var(--color-day-yellow) !important",
                        borderRadius: "4px",
                        display: "flex !important",
                        justifyContent: "center !important",
                        alignItems: "center !important",
                        fontSize: "15px !important",
                        textAlign: "center !important",
                      },

                      "& .optgroup": {
                        padding: "2px !important",
                      },

                      "& div div >.optgroup": {
                        backgroundColor: "var(--color-day-white) !important",
                        color: "var(--color-day-black) !important",
                      },

                      "& .mui-options": {
                        padding: "0px 15px",
                      },

                      "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
                        borderBottom:
                          "2px solid var(--color-day-black) !important",
                      },

                      "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "var(--color-day-black) !important",
                        fontSize: "14px !important",
                      },

                      "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                        color: "var(--color-day-black) !important",
                      },

                      "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:before":
                      {
                        borderBottom:
                          "1px solid var(--color-day-yellow) !important",
                      },

                      "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                      {
                        borderBottom:
                          "2px solid var(--color-day-yellow) !important",
                      },

                      "& #demo-simple-select-standard-label": {
                        color: "var(--color-day-yellow) !important",
                      },

                      "& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon": {
                        color: "var(--color-day-black) !important",
                      },

                      "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected":
                      {
                        backgroundColor: "var(--color-day-yellow) !important",
                        color: "black",
                      },

                      "& .css-1869usk-MuiFormControl-root": {
                        height: "60px !important",
                      },

                      "& div div >.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                      {
                        color: "var(--color-day-black) !important",
                        fontSize: "14px !important",
                      },

                      "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root": {
                        fontSize: "13px !important",
                      },

                      "& .css-nlvv43-MuiFormControl-root": {
                        margin: "0px 8px !important",
                        height: "30px !important",
                      },

                      "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        fontSize: "12px !important",
                        color: "var(--color-day-black) !important",
                        top: "-8px !important",
                      },
                    }}
                    onChange={handleChangeForModelSelection}
                    options={model_search_selection}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Models"
                        inputProps={{
                          ...params.inputProps,
                          style: { width: "70%" }, // set the width to auto

                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {isLoaded ? (
              <div className="model-grid">
                <Box
                  sx={{
                    // height: "650px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DataGrid
                    onRowClick={handleRowClickEvent}
                    onCellClick={handleCellClick}
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
                    columns={columnsMobile}
                    pageSize={pageSize}
                    autoHeight={true}
                    rowsPerPageOptions={[10, 20, 50]}
                    onPageSizeChange={(newPage) => {
                      // handleChangePage("", 1);

                      setPageSize(newPage);
                    }}
                    // checkboxSelection
                    // disableSelectionOnClick
                    localeText={{
                      footerRowSelected: CustomPagination,
                    }}
                    components={{
                      Footer: CustomFooter,
                    }}

                  // {...data}
                  // experimentalFeatures={{ newEditingApi: true }}
                  />
                </Box>
              </div>
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
        ) : (
          <div className="model-grid-web">
            <div className="horizon">
              <h2 className="horizon-head">All Models</h2>
              <p className="all-models-description">
                Listed below are all the forecast models, which can be filtered
                by their time horizon, currency, or name. Additionally, you can
                sort selective columns in ascending or descending order by
                clicking on the column header.
              </p>
              <div className="horizon-row">
                <div className="horizon-left">
                  <h3>Time Horizon</h3>
                  <p className="divider-icon"> | </p>
                  <div className="hours-list">
                    <ul id="hours-list-div">
                      <li
                        id="hours-listings hours_filter_All"
                        style={{
                          background: selectedItem === "All" ? "#fddd4e" : "",
                          color: selectedItem === "All" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_All",
                            "All"
                          );
                          setSelectedItem("All");
                        }}
                      >
                        All
                      </li>
                      <li
                        id="hours-listings hour_filter_24"
                        style={{
                          background: selectedItem === "24h" ? "#fddd4e" : "",
                          color: selectedItem === "24h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_24",
                            "24h"
                          );
                          setSelectedItem("24h");
                        }}
                      >
                        24h
                      </li>
                      <li
                        id="hours-listings hour_filter_12"
                        style={{
                          background: selectedItem === "12h" ? "#fddd4e" : "",
                          color: selectedItem === "12h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_24",
                            "12h"
                          );
                          setSelectedItem("12h");
                        }}
                      >
                        12h
                      </li>
                      <li
                        id="hours-listings hour_filter_8"
                        style={{
                          background: selectedItem === "8h" ? "#fddd4e" : "",
                          color: selectedItem === "8h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_8",
                            "8h"
                          );
                          setSelectedItem("8h");
                        }}
                      >
                        8h
                      </li>
                      <li
                        id="hours-listings hour_filter_3"
                        style={{
                          background: selectedItem === "6h" ? "#fddd4e" : "",
                          color: selectedItem === "6h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_6",
                            "6h"
                          );
                          setSelectedItem("6h");
                        }}
                      >
                        6h
                      </li>
                      <li
                        id="hours-listings hour_filter_3"
                        style={{
                          background: selectedItem === "4h" ? "#fddd4e" : "",
                          color: selectedItem === "4h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_4",
                            "4h"
                          );
                          setSelectedItem("4h");
                        }}
                      >
                        4h
                      </li>
                      <li
                        style={{
                          background: selectedItem === "3h" ? "#fddd4e" : "",
                          color: selectedItem === "3h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_3",
                            "3h"
                          );
                          setSelectedItem("3h");
                        }}
                      >
                        3h
                      </li>
                      <li
                        id="hours-listings hour_filter_2"
                        style={{
                          background: selectedItem === "2h" ? "#fddd4e" : "",
                          color: selectedItem === "2h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_2",
                            "2h"
                          );
                          setSelectedItem("2h");
                        }}
                      >
                        2h
                      </li>
                      <li
                        id="hours-listings hour_filter_1"
                        style={{
                          background: selectedItem === "1h" ? "#fddd4e" : "",
                          color: selectedItem === "1h" ? "black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChangeForTimeHorizonSelection(
                            "hour_filter_1",
                            "1h"
                          );
                          setSelectedItem("1h");
                        }}
                      >
                        1h
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="horizon-right">
                  <Autocomplete
                    id="country-select-demo"
                    sx={{
                      width: 220,
                      backgroundColor: "var(--color-forecasts-card)",
                      borderRadius: "5px",
                      labelColor: "red",
                      fontSize: "11px",
                      marginLeft: "0.8rem",
                    }}
                    onChange={handleChangeForCoinSelection}
                    options={coin_search_selection}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Currencies"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  {/* <Select
                  placeholder="Models"
                  options={model_search_selection}
                  components={{ DropdownIndicator }}
                  styles={styles}
                  isClearable={true}
                  onChange={handleChangeForModelSelection}
                /> */}
                  <Autocomplete
                    id="country-select-demo"
                    sx={{
                      width: 220,
                      backgroundColor: "var(--color-forecasts-card)",
                      borderRadius: "5px",
                      labelColor: "red",
                      fontSize: "11px",
                      marginLeft: "0.8rem",
                    }}
                    onChange={handleChangeForModelSelection}
                    options={model_search_selection}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Models"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {isLoaded ? (
              <div className="grid-div-web">
                <Box
                  sx={{
                    // height: "120vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DataGrid
                    onRowClick={handleRowClickEvent}
                    onCellClick={handleCellClick}
                    // onCellClick={handleOnCellClick}
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
                    pageSize={pageSize}
                    autoHeight={true}
                    pinnedRows={pinnedRows}
                    rowsPerPageOptions={[10, 20, 50]}
                    onPageSizeChange={(newPage) => {
                      // handleChangePage("", 1);

                      setPageSize(newPage);
                    }}
                    // checkboxSelection
                    // disableSelectionOnClick
                    localeText={{
                      footerRowSelected: CustomPagination,
                    }}
                    components={{
                      Footer: CustomFooter,
                    }}
                  />
                </Box>
              </div>
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
            {isLoaded ? (
              <div className="grid-div-tab">
                <Box
                  sx={{
                    // height: "120vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DataGrid
                    onRowClick={handleRowClickEvent}
                    onCellClick={handleCellClick}
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
                    columns={columnsTab}
                    pageSize={pageSize}
                    autoHeight={true}
                    rowsPerPageOptions={[10, 20, 50]}
                    onPageSizeChange={(newPage) => {
                      // handleChangePage("", 1);

                      setPageSize(newPage);
                    }}
                    // checkboxSelection
                    // disableSelectionOnClick
                    localeText={{
                      footerRowSelected: CustomPagination,
                    }}
                    components={{
                      Footer: CustomFooter,
                    }}
                  />
                </Box>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ModelDataGrid);
