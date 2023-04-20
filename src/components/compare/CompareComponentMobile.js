import React, { useState, useEffect, useRef } from "react";
import "./Compare.css";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../../ContextProvider";
import TextField from "@mui/material/TextField";
import ComparisonChartCanvas from "../models/graphs/ComparisonChartCanvas";

const CompareComponentMobile = () => {
  const forBgColor = (total_pnl, id) => {
    if (total_pnl < 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #ff2e2e !important");
    } else if (total_pnl >= 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #16c784 !important");
    }
  };
  const forBgColorPosition = (position, id) => {
    if (position == "Short") {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #ff2e2e !important");
    } else if (position == "Long") {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #16c784 !important");
    }
  };

  const forBgColorWinLoss = (value, id) => {
    if (value < 50) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #ff2e2e !important");
    } else if (value >= 50) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #16c784 !important");
    }
  };
  const forBgColorWinLossRatio = (value, id) => {
    if (value < 1) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #ff2e2e !important");
    } else if (value >= 1) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color: #16c784 !important");
    }
  };
  // const [Flag, setFlag] = useState(null);
  const [stats, set_stats] = useState({});
  const location = useLocation();
  var model_name = "";
  if (location.state) {
    model_name = location.state.model_name;
  }
  const [default_value, set_default_value] = useState({ label: model_name });
  // console.log("Model name -->", location.state.model_name);
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

  const [rows, setRows] = useState([]);
  const [strategies, setStrategies] = useState({});

  const [rows_cached, set_rows_cached] = useState([]);
  const handleChangeForModelSelection1 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      set_model_name_1(values.label.replace("-", "_"));
      // setStrategies(strategies_cache);

      // setRows({});
      // const res = rows_cached.filter((item) => {
      //   return item.modelName == values.label;
      // });
      // handleChangePage("", 1);
      // setRows(res);
    } else {
      set_model_name_1("");
      // setRows(rows_cached);
    }
  };
  const handleChangeForModelSelection2 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      set_model_name_2(values.label.replace("-", "_"));

      // setRows({});
      // const res = rows_cached.filter((item) => {
      //   return item.modelName == values.label;
      // });
      // handleChangePage("", 1);
      // setRows(res);
    } else {
      set_model_name_2("");

      // setRows(rows_cached);
    }
  };
  const handleChangeForModelSelection3 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      set_model_name_3(values.label.replace("-", "_"));

      // setRows({});
      // const res = rows_cached.filter((item) => {
      //   return item.modelName == values.label;
      // });
      // handleChangePage("", 1);
      // setRows(res);
    } else {
      set_model_name_3("");

      // setRows(rows_cached);
    }
  };
  const handleChangeForCoinSelection1 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      if (selectedItem == "All") {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label;
        });
        set_model_names(output);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label && obj.value === selectedItem;
        });
        set_model_names(output);
      }
    } else {
      if (selectedItem == "All") {
        set_model_names(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === selectedItem;
        });
        set_model_names(output);
      }
    }
  };

  const handleChangeForCoinSelection2 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      if (selectedItem2 == "All") {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label;
        });
        set_model_names2(output);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label && obj.value === selectedItem2;
        });
        set_model_names2(output);
      }
    } else {
      if (selectedItem2 == "All") {
        set_model_names2(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === selectedItem2;
        });
        set_model_names2(output);
      }
    }
  };
  const handleChangeForCoinSelection3 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      if (selectedItem3 == "All") {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label;
        });
        set_model_names3(output);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label && obj.value === selectedItem3;
        });
        set_model_names3(output);
      }
    } else {
      if (selectedItem3 == "All") {
        set_model_names3(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === selectedItem3;
        });
        set_model_names3(output);
      }
    }
  };
  const [model_search_selection, set_model_search_selection] = useState([]);
  const [model_name_1, set_model_name_1] = useState(model_name);
  const [model_name_2, set_model_name_2] = useState("");
  const [model_name_3, set_model_name_3] = useState("");
  const [model_names, set_model_names] = useState([]);
  const [model_names2, set_model_names2] = useState([]);
  const [model_names3, set_model_names3] = useState([]);
  const [selectedItem2, setSelectedItem2] = useState("All");
  const [selectedItem3, setSelectedItem3] = useState("All");

  const [currencies, set_currencies] = useState([]);
  const [currencies2, set_currencies2] = useState([]);

  const [currencies3, set_currencies3] = useState([]);

  useEffect(() => {
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
            set_model_names(model_names);
            set_model_names2(model_names);
            set_model_names3(model_names);

            set_currencies(coin_names);
            set_currencies2(coin_names);
            set_currencies3(coin_names);
            // console.log("Using model names -->", model_names);
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
      // console.log(
      //   "Using model names -->",
      //   model_selection_cache["model_names"]
      // );
      set_model_names(model_selection_cache["model_names"]);
      set_model_names2(model_selection_cache["model_names"]);
      set_model_names3(model_selection_cache["model_names"]);
      set_currencies(coin_selection_cache["coin_names"]);
      set_currencies2(coin_selection_cache["coin_names"]);
      set_currencies3(coin_selection_cache["coin_names"]);
    }
  }, []);
  useEffect(() => {
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
            set_stats(model_names);
            Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } else {
      // console.log(
      //   "I am using cached values of sorted stats -->",
      //   sorted_stats_cache
      // );
      set_stats(stats_cache["stats"]);
    }
  }, []);

  const [selectedItem, setSelectedItem] = useState("All");
  const handleChangeForTimeHorizonSelection = (id, timeH) => {
    if (timeH == "All") {
      // setRows(rows_cached);
      set_model_names(model_selection_cache["model_names"]);
    } else {
      // handleChangePage("", 1);
      let output = model_selection_cache["model_names"].filter((obj) => {
        return obj.value == timeH;
      });
      set_model_names(output);
      // const res = rows_cached.filter((item) => {
      //   return item.timeHorizon == timeH;
      // });
      // setRows(res);
    }
  };

  const handleChangeForTimeHorizonSelection2 = (id, timeH) => {
    if (timeH == "All") {
      // setRows(rows_cached);
      set_model_names2(model_selection_cache["model_names"]);
    } else {
      // handleChangePage("", 1);
      let output = model_selection_cache["model_names"].filter((obj) => {
        return obj.value == timeH;
      });
      set_model_names2(output);
      // const res = rows_cached.filter((item) => {
      //   return item.timeHorizon == timeH;
      // });
      // setRows(res);
    }
  };
  const handleChangeForTimeHorizonSelection3 = (id, timeH) => {
    if (timeH == "All") {
      // setRows(rows_cached);
      set_model_names3(model_selection_cache["model_names"]);
    } else {
      // handleChangePage("", 1);
      let output = model_selection_cache["model_names"].filter((obj) => {
        return obj.value == timeH;
      });
      set_model_names3(output);
      // const res = rows_cached.filter((item) => {
      //   return item.timeHorizon == timeH;
      // });
      // setRows(res);
    }
  };
  const handleChangeForModelSelection = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      // setRows({});
      const res = rows_cached.filter((item) => {
        return item.modelName == values.label;
      });
      // handleChangePage("", 1);
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };

  const windowWidth = useRef(window.innerWidth);

  return (
    <div>
      <div className="search-filter-wapper">
        <div className="compare-search-wrapper">
          {/* TIME HORIZON */}
          <Autocomplete
            id="country-select-demo"
            className="model-compare-search"
            sx={{
              backgroundColor: "var(--color-forecasts-card)",
              borderRadius: "5px",
              labelColor: "red",
              fontSize: "11px",
              marginBottom: "0.8rem",
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black)",
              },

              "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input": {
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

              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root": {
                backgroundColor: "var(--color-forecasts-card) !important",
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
                  backgroundColor: "var(--color-dropdown-bg) !important",
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
                borderBottom: "2px solid var(--color-day-black) !important",
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
                  borderBottom: "1px solid var(--color-day-yellow) !important",
                },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                {
                  borderBottom: "2px solid var(--color-day-yellow) !important",
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
            defaultValue={default_value}
            onChange={handleChangeForModelSelection1}
            options={model_names}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Time"
                inputProps={{
                  ...params.inputProps,
                  style: { width: "70%" }, // set the width to auto

                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          {/* CURRENCIES SEARCH BAR */}
          <Autocomplete
            id="country-select-demo"
            className="model-compare-search"
            sx={{
              backgroundColor: "var(--color-forecasts-card)",
              borderRadius: "5px",
              labelColor: "red",
              fontSize: "11px",
              marginBottom: "0.8rem",
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black)",
              },

              "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input": {
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

              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root": {
                backgroundColor: "var(--color-forecasts-card) !important",
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
                  backgroundColor: "var(--color-dropdown-bg) !important",
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
                borderBottom: "2px solid var(--color-day-black) !important",
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
                  borderBottom: "1px solid var(--color-day-yellow) !important",
                },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                {
                  borderBottom: "2px solid var(--color-day-yellow) !important",
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
            // defaultValue={default_value}
            onChange={handleChangeForCoinSelection1}
            options={currencies}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Currenices"
                inputProps={{
                  ...params.inputProps,
                  style: { width: "70%" }, // set the width to auto

                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          {/* MODEL SEARCH BAR */}
          <Autocomplete
            id="country-select-demo"
            className="model-compare-search"
            sx={{
              backgroundColor: "var(--color-forecasts-card)",
              borderRadius: "5px",
              labelColor: "red",
              fontSize: "11px",
              marginBottom: "0.8rem",
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black)",
              },

              "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input": {
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

              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root": {
                backgroundColor: "var(--color-forecasts-card) !important",
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
                  backgroundColor: "var(--color-dropdown-bg) !important",
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
                borderBottom: "2px solid var(--color-day-black) !important",
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
                  borderBottom: "1px solid var(--color-day-yellow) !important",
                },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                {
                  borderBottom: "2px solid var(--color-day-yellow) !important",
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
            // defaultValue={default_value}
            onChange={handleChangeForModelSelection2}
            options={model_names2}
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
  );
};

export default CompareComponentMobile;
