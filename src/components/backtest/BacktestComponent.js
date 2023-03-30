import React, {useEffect, useState, memo, useRef} from 'react';
import "./Backtest.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Timer from "../timer/Timer";
import { useStateContext } from "../../ContextProvider";
import ModelNameCol from "../../mobile-components/data-grid/ModelNameCol";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// import { DatePicker } from '@material-ui/pickers';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";




const BacktestComponent = () => {

    const windowWidth = useRef(window.innerWidth);

  const [Flag, setFlag] = useState(null);
  const [timeH, setTimeH] = useState("All");
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
  } = useStateContext();
  const [pnl_for_each_strategy, setPnlForEachStrategy] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (strategies == null && pnl_for_each_strategy == null) {
      return;
    } else {
      //   console.log("Hi here is pnl for each -->", pnl_for_each_strategy);
      var data_for_rows = [];
      var index = 0;

      for (var key in strategies) {
        data_for_rows.push({
          id: index,
          modelNameMob: [
            strategies[key].time_horizon,
            strategies[key].currency,
            key,
            strategies[key].current_position,
          ],
          modelName: key.replace("_", "-"),
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
        set_rows_cached(data_for_rows);
        //  console.log("Here are data grid--->", data_for_rows);
      }
    }
  }, [strategies]);

  useEffect(() => {
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
              // var name = data["response"][i].strategy_name.replace("_", "-");
              model_names.push({
                label: data["response"][i].strategy_name.replace("_", "-"),
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
  }, [topPerformerModels]);

  useEffect(() => {
    if (Flag == null) {
      if (Object.keys(stats_cache).length == 0) {
        fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["msg"].length);
            var model_names = {};
            for (var i = 0; i < data["msg"].length; i++) {
              // console.log(data["msg"][i].strategy_name);
              // var name = data["msg"][i].strategy_name;
              model_names[data["msg"][i].strategy_name] = {
                strategy_name: data["msg"][i].strategy_name,
                current_drawdown: data["msg"][i].current_drawdown,
                curr_drawdown_duration: data["msg"][i].curr_drawdown_duration,
                average_drawdown: data["msg"][i].average_drawdown,
                average_drawdown_duration:
                  data["msg"][i].average_drawdown_duration,
                max_drawdown: data["msg"][i].max_drawdown,
                max_drawdown_duration: data["msg"][i].max_drawdown_duration,
                r2_score: data["msg"][i].r2_score,
                sharpe: data["msg"][i].sharpe,
                sortino: data["msg"][i].sortino,
                total_pnl: data["msg"][i].total_pnl,
                total_positive_pnl: data["msg"][i].total_positive_pnl,
                total_negative_pnl: data["msg"][i].total_negative_pnl,
                total_wins: data["msg"][i].total_wins,
                total_losses: data["msg"][i].total_losses,
                consective_wins: data["msg"][i].consective_wins,
                consective_losses: data["msg"][i].consective_losses,
                win_percentage: data["msg"][i].win_percentage,
                loss_percentage: data["msg"][i].loss_percentage,
                pnl_sum_1: data["msg"][i].pnl_sum_1,
                pnl_sum_7: data["msg"][i].pnl_sum_7,
                pnl_sum_15: data["msg"][i].pnl_sum_15,
                pnl_sum_30: data["msg"][i].pnl_sum_30,
                pnl_sum_45: data["msg"][i].pnl_sum_45,
                pnl_sum_60: data["msg"][i].pnl_sum_60,
                average_daily_pnl: data["msg"][i].average_daily_pnl,
                win_loss_ratio: data["msg"][i].win_loss_ratio,

                rank: data["msg"][i].rank,
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
  }, [Flag]);

  // To Link Grid Rows to Models Component
  const linkModels = useNavigate();
  const handleRowClickEvent = (params) => {
    linkModels(`/${params.row.modelName.replace("_", "-")}`);
  };
  // To Link Grid Rows to Models Component


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

  return (
    <div className='back-test'>
        <div className='container'>
            <h1>Backtest</h1>
            <p>Lorem dolore magna aliqua incididunt ut labore et dolore magna aliqua magna.</p>

            {windowWidth.current <= 768 ? (

              <div className="horizon">
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

             ) : ( 

              <div className="horizon">
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

             ) }

            
                {/* THIS IS FOR WEB */}
            <div className='backtest-filters backtest-for-web'>
              <div className='date-picker flex-display'>
                <h3>Start Date:</h3>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="" />
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField label="" />
                </LocalizationProvider>

              </div>
              <div className='profit-input flex-display'>
                <h3>Take Profit:</h3>
                <TextField id="outlined-basic" placeholder="0-100" variant="outlined" 
                sx={{
                      width: 100
                    }}/>
              </div>
              <div className='loss-input flex-display'>
                <h3>Stop Loss:</h3>
                <TextField id="outlined-basic" placeholder="0-100" variant="outlined" 
                sx={{
                      width: 100
                    }}/>
              </div>
              <div className='fee-input flex-display'>
                <h3>Fee:</h3>
                <TextField id="outlined-basic" placeholder="0-100" variant="outlined" 
                sx={{
                      width: 100
                    }}/>
              </div>
            </div>
                {/* THIS IS FOR MOBILE  */}
            <div className='backtest-filters backtest-for-mobile'>
              <div className='sec-1 flex-display justify-content'>
                <div className='date-picker flex-display'>
                  <h3>Start Date:</h3>
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="" />
                  </LocalizationProvider> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField label="" />
                  </LocalizationProvider>

                </div>
                <div className='profit-input flex-display'>
                  <h3>Take Profit:</h3>
                  <TextField id="outlined-basic" placeholder="0-100" variant="outlined" />
                </div>
              </div>

              <div className='sec-2 flex-display justify-content'>
                <div className='loss-input flex-display'>
                  <h3>Stop Loss:</h3>
                  <TextField id="outlined-basic" placeholder="0-100" variant="outlined" />
                </div>
                <div className='fee-input flex-display'>
                  <h3>Fee:</h3>
                  <TextField id="outlined-basic" placeholder="0-100" variant="outlined" />
                </div>
              </div>
            </div>

            <div className='for-flex-end'>
              <div className="backtest-btn-div backtest-btn-page">
                <Link
                  to="#"
                >
                  <p className="compare-btn">Run Backtest</p>
                </Link>
              </div>
            </div>
        </div>
    </div>
    
  )
}

export default BacktestComponent