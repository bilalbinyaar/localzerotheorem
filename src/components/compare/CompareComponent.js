import React, { useState, useEffect, useRef } from "react";
import "./Compare.css";
import Autocomplete from "@mui/material/Autocomplete";
import { useStateContext } from "../../ContextProvider";
import TextField from "@mui/material/TextField";
import ComparisonChartCanvas from "../models/graphs/ComparisonChartCanvas";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import TvSplineAreaChartTopPerformer from "../models/graphs/TvSplineAreaChartTopPerformer";
import CompareComponentMobile from "./CompareComponentMobile";
import Timer from "../timer/Timer";
const CompareComponent = () => {
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

  const changeColorOnValueBasis = (data) => {
    // console.log("Data debugg -->", data);
    var sorted_result = Object.keys(data).sort(function (a, b) {
      return data[b][0] - data[a][0];
    });

    if (data[sorted_result[0]][0] > data[sorted_result[1]][0]) {
      // console.log("Higer value is  -->", data[sorted_result[0][1]]);
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: --color-day-white !important");
      document
        .getElementById(`${data[sorted_result[2]][1]}`)
        .setAttribute("style", "color: --color-day-white !important");
    } else if (data[sorted_result[0]][0] == data[sorted_result[1]][0]) {
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      if (data[sorted_result[1]][0] == data[sorted_result[2]][0]) {
        document
          .getElementById(`${data[sorted_result[2]][1]}`)
          .setAttribute("style", "color: #16c784 !important");
      } else {
        document
          .getElementById(`${data[sorted_result[2]][1]}`)
          .setAttribute("style", "color: --color-day-white !important");
      }
    }
  };

  const changeColorOnValueBasisMin = (data) => {
    // console.log("Data debugg -->", data);
    var sorted_result = Object.keys(data).sort(function (a, b) {
      return data[a][0] - data[b][0];
    });

    if (data[sorted_result[0]][0] < data[sorted_result[1]][0]) {
      // console.log("Higer value is  -->", data[sorted_result[0][1]]);
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: --color-day-white !important");
      document
        .getElementById(`${data[sorted_result[2]][1]}`)
        .setAttribute("style", "color: --color-day-white !important");
    } else if (data[sorted_result[0]][0] == data[sorted_result[1]][0]) {
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      if (data[sorted_result[1]][0] == data[sorted_result[2]][0]) {
        document
          .getElementById(`${data[sorted_result[2]][1]}`)
          .setAttribute("style", "color: #16c784 !important");
      } else {
        document
          .getElementById(`${data[sorted_result[2]][1]}`)
          .setAttribute("style", "color: --color-day-white !important");
      }
    }
  };

  const changeColorOnValueBasisTwoValues = (data) => {
    // console.log("Data debugg -->", data);
    var sorted_result = Object.keys(data).sort(function (a, b) {
      return data[b][0] - data[a][0];
    });

    if (data[sorted_result[0]][0] > data[sorted_result[1]][0]) {
      // console.log("Higer value is  -->", data[sorted_result[0][1]]);
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: --color-day-white !important");
    } else if (data[sorted_result[0]][0] == data[sorted_result[1]][0]) {
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
    }
  };
  const changeColorOnValueBasisTwoValuesMin = (data) => {
    // console.log("Data debugg -->", data);
    var sorted_result = Object.keys(data).sort(function (a, b) {
      return data[a][0] - data[b][0];
    });

    if (data[sorted_result[0]][0] < data[sorted_result[1]][0]) {
      // console.log("Higer value is  -->", data[sorted_result[0][1]]);
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: --color-day-white !important");
    } else if (data[sorted_result[0]][0] == data[sorted_result[1]][0]) {
      document
        .getElementById(`${data[sorted_result[0]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
      document
        .getElementById(`${data[sorted_result[1]][1]}`)
        .setAttribute("style", "color: #16c784 !important");
    }
  };
  // const [Flag, setFlag] = useState(null);

  const [stats, set_stats] = useState({});
  const location = useLocation();
  var model_name = "";
  var currency = "";
  var time_horizon = "";
  var time_horizon2 = "All";

  if (location.state) {
    model_name = location.state.model_name;
    currency = location.state.currency;
    time_horizon = location.state.time_horizon;
    time_horizon2 = location.state.time_horizon;
  }
  const [default_value, set_default_value] = useState({ label: model_name });
  const [strategies, setStrategies] = useState({});
  const [time_horizon_selected, set_time_horizon_selected] = useState({
    label: time_horizon,
  });
  const [time_horizon_selected2, set_time_horizon_selected2] = useState({
    label: time_horizon2,
  });
  const [currency_selected, set_currency_selected] = useState({
    label: currency,
  });
  const [currency_selected2, set_currency_selected2] = useState({
    label: "Currencies",
  });
  const [selectedItem, setSelectedItem] = useState(time_horizon2);

  // console.log("Default value -->", default_value);
  // if (model_name.length == 0) {
  //   set_default_value(null);
  // }
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
    authCheckLoginInvestor, link
  } = useStateContext();

  const [rows, setRows] = useState([]);

  const [rows_cached, set_rows_cached] = useState([]);
  const handleChangeForModelSelection1 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      set_model_name_1(values.label.replace(/-/g, "_"));
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
      set_model_name_2(values.label.replace(/-/g, "_"));

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
      set_model_name_3(values.label.replace(/-/g, "_"));

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
  const handleChangeForCoinSelectionMobile1 = (event, values) => {
    // console.log("Search dropdown -->", values.label);
    if (values != null) {
      set_currency_selected(values.label);
      if (time_horizon_selected === "All") {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label;
        });
        set_model_names(output);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return (
            obj.currency === values.label && obj.value === time_horizon_selected
          );
        });
        set_model_names(output);
      }
    } else {
      if (time_horizon_selected == "All") {
        set_model_names(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === time_horizon_selected;
        });
        set_model_names(output);
      }
    }
  };

  const handleChangeForCoinSelectionMobile2 = (event, values) => {
    // console.log("Search dropdown -->", values.label);
    if (values != null) {
      set_currency_selected(values.label);
      if (time_horizon_selected2 === "All") {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label;
        });
        set_model_names2(output);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return (
            obj.currency === values.label &&
            obj.value === time_horizon_selected2
          );
        });
        set_model_names2(output);
      }
    } else {
      if (time_horizon_selected2 == "All") {
        set_model_names2(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === time_horizon_selected2;
        });
        set_model_names2(output);
      }
    }
  };

  const handleChangeForCoinSelection1 = (event, values) => {
    // console.log("Search dropdown -->", values.label);
    if (values != null) {
      set_currency_selected(values.label);
      if (selectedItem === "All") {
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

  const handleChangeForTimeSelectionMobile1 = (event, values) => {
    // console.log("Search dropdown -->", values.label);
    if (values != null) {
      set_time_horizon_selected(values.label);
      if (values.label === "All") {
        // let output = model_selection_cache["model_names"].filter((obj) => {
        //   return obj.value === values.label;
        // });
        set_model_names(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === values.label;
        });
        set_model_names(output);
      }
    } else {
      set_time_horizon_selected("All");
      set_model_names(model_selection_cache["model_names"]);
    }
  };
  const handleChangeForTimeSelectionMobile2 = (event, values) => {
    // console.log("Search dropdown -->", values.label);
    if (values != null) {
      set_time_horizon_selected2(values.label);
      if (values.label === "All") {
        // let output = model_selection_cache["model_names"].filter((obj) => {
        //   return obj.value === values.label;
        // });
        set_model_names2(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === values.label;
        });
        set_model_names2(output);
      }
    } else {
      set_time_horizon_selected2("All");
      set_model_names2(model_selection_cache["model_names"]);
    }
  };
  const handleChangeForTimeSelection1 = (event, values) => {
    // console.log("Search dropdown -->", values.label);
    if (values != null) {
      setSelectedItem(values.label);
      if (values.label === "All") {
        // let output = model_selection_cache["model_names"].filter((obj) => {
        //   return obj.value === values.label;
        // });
        set_model_names(model_selection_cache["model_names"]);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === values.label;
        });
        set_model_names(output);
      }
    } else {
      setSelectedItem("All");
      set_model_names(model_selection_cache["model_names"]);
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
  const [time_horizons, set_time_horizons] = useState([
    {
      label: "All",
    },
    {
      label: "24h",
    },
    {
      label: "12h",
    },
    {
      label: "6h",
    },
    {
      label: "4h",
    },
    {
      label: "3h",
    },
    {
      label: "2h",
    },
    {
      label: "1h",
    },
  ]);
  const [time_horizons2, set_time_horizons2] = useState([
    {
      label: "All",
    },
    {
      label: "24h",
    },
    {
      label: "12h",
    },
    {
      label: "6h",
    },
    {
      label: "4h",
    },
    {
      label: "3h",
    },
    {
      label: "2h",
    },
    {
      label: "1h",
    },
  ]);
  const [model_names2, set_model_names2] = useState([]);
  const [model_names3, set_model_names3] = useState([]);
  const [selectedItem2, setSelectedItem2] = useState("All");
  const [selectedItem3, setSelectedItem3] = useState("All");

  const [currencies, set_currencies] = useState([]);
  const [currencies2, set_currencies2] = useState([]);

  const [currencies3, set_currencies3] = useState([]);

  useEffect(() => {
    try {
      if (authCheckLoginInvestor == "TrueSignal") {
        fetch(
          link + "/get/live_strategies",
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
              var dt_str =
                year + "-" + month + "-" + day + " " + hours + ":" + minutes;
              // console.log("DT", dt, dt_str);
              var curr_time_version = dt.split(" ")[2];
              if (curr_time_version == "PM") {
                hours = parseInt(hours) + 12;
              }
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
        if (Object.keys(strategies_cache).length == 0) {
          fetch(link + "/get_strategies", {
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
                var dt_str =
                  year + "-" + month + "-" + day + " " + hours + ":" + minutes;
                // console.log("DT", dt, dt_str);
                var curr_time_version = dt.split(" ")[2];
                if (curr_time_version == "PM") {
                  hours = parseInt(hours) + 12;
                }
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
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, []);
  useEffect(() => {
    try {
      if (authCheckLoginInvestor == "TrueSignal") {
        fetch(link + "/get/live_stats", {
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
                total_pnl: data["response"][i].total_pnl, // defaultValue={default_value}

                total_positive_pnl: data["response"][i].total_positive_pnl,
                total_negative_pnl: data["response"][i].total_negative_pnl,
                total_wins: data["response"][i].total_wins,
                total_losses: data["response"][i].total_losses,
                consective_wins: data["response"][i].consective_wins, // defaultValue={default_value}

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
        if (Object.keys(stats_cache).length == 0) {
          fetch(link + "/get_stats", {
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
                  total_pnl: data["response"][i].total_pnl, // defaultValue={default_value}

                  total_positive_pnl: data["response"][i].total_positive_pnl,
                  total_negative_pnl: data["response"][i].total_negative_pnl,
                  total_wins: data["response"][i].total_wins,
                  total_losses: data["response"][i].total_losses,
                  consective_wins: data["response"][i].consective_wins, // defaultValue={default_value}

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
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, []);

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
    <div className="compare">
      <div className="container">
        <h1>Compare</h1>
        {windowWidth.current <= 768 ? (
          <p className="compare-description">
            Compare any two models by selecting them in the columns below, where
            you can review their details and performance metrics. To refine your
            search, use the time horizon and currency filters to locate a
            specific strategy, or type in the strategy name directly to select
            it. The best values are colored green with the exception of the
            Forecast where Long is always green and Short is always red.
          </p>
        ) : (
          <p className="compare-description">
            Compare up to three models by selecting them in the columns below,
            where you can review their details and performance metrics. To
            refine your search, use the time horizon and currency filters to
            locate a specific strategy, or type in the strategy name directly to
            select it. The best values are colored green with the exception of
            the Forecast where Long is always green and Short is always red.
          </p>
        )}

        <div className="search-table">
          <table className="tg no-bl">
            <thead className="no-bl">
              <tr>
                <th
                  className="tg-0lax no-bl border-remove for-mob-width"
                  visibility="hidden"
                ></th>
                <th className="tg-0lax border-remove">
                  {windowWidth.current <= 768 ? (
                    /* Mobile search bars*/
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
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                              {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                              {
                                borderColor:
                                  "var(--color-day-yellow) !important",
                              },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "var(--color-day-yellow) !important",
                              },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                              {
                                borderBottom:
                                  "2px solid var(--color-day-black) !important",
                              },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                              {
                                fontSize: "13px !important",
                              },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                fontSize: "12px !important",
                                color: "var(--color-day-black) !important",
                                top: "-8px !important",
                              },
                            }}
                            defaultValue={time_horizon_selected}
                            onChange={handleChangeForTimeSelectionMobile1}
                            // value={time_horizon_selected}
                            options={time_horizons}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Horizons"
                                defaultValue={time_horizon_selected}
                                inputProps={{
                                  ...params.inputProps,
                                  style: { width: "70%" }, // set the width to auto

                                  autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          {/* CURRENCIES SEARCH BAR */}
                          {/* <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              marginBottom: "0.8rem",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                                {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                                {
                                  borderColor:
                                    "var(--color-day-yellow) !important",
                                },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  color: "var(--color-day-yellow) !important",
                                },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                                {
                                  borderBottom:
                                    "2px solid var(--color-day-black) !important",
                                },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                                {
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
                                  backgroundColor:
                                    "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                                {
                                  fontSize: "13px !important",
                                },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  fontSize: "12px !important",
                                  color: "var(--color-day-black) !important",
                                  top: "-8px !important",
                                },
                            }}
                            defaultValue={currency_selected}
                            onChange={handleChangeForCoinSelectionMobile1}
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
                          /> */}
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
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                              {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                              {
                                borderColor:
                                  "var(--color-day-yellow) !important",
                              },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "var(--color-day-yellow) !important",
                              },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                              {
                                borderBottom:
                                  "2px solid var(--color-day-black) !important",
                              },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                              {
                                fontSize: "13px !important",
                              },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                fontSize: "12px !important",
                                color: "var(--color-day-black) !important",
                                top: "-8px !important",
                              },
                            }}
                            // defaultValue={default_value}
                            onChange={handleChangeForModelSelection1}
                            options={model_names}
                            autoHighlight
                            defaultValue={default_value}
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
                          {model_name_1 ? (
                            <ComparisonChartCanvas
                              model_name={model_name_1.replace(/-/g, "_")}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="search-filter-wapper">
                        {/* TIME HORIZON */}
                        <h3 className="horizon-comparison-title">
                          Time Horizon
                        </h3>
                        <div className="horizon-left-comparison">
                          <div className="hours-list-comparison">
                            <ul id="hours-list-div-comparsion">
                              <li
                                id="hours-listings hours_filter_All"
                                style={{
                                  background:
                                    selectedItem === "All" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "24h" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "12h" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "8h" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "6h" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "4h" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "3h" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "2h" ? "#fddd4e" : "",
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
                                  background:
                                    selectedItem === "1h" ? "#fddd4e" : "",
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
                        <div className="compare-search-wrapper">
                          {/* MODEL SEARCH BAR */}
                          <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                              {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                              {
                                borderColor:
                                  "var(--color-day-yellow) !important",
                              },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "var(--color-day-yellow) !important",
                              },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                              {
                                borderBottom:
                                  "2px solid var(--color-day-black) !important",
                              },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                              {
                                fontSize: "13px !important",
                              },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                label="Models"
                                inputProps={{
                                  ...params.inputProps,
                                  style: { width: "70%" }, // set the width to auto

                                  autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          {/* CURRENCIES SEARCH BAR */}
                          {/* <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              marginRight: "0.4rem",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                                {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                                {
                                  borderColor:
                                    "var(--color-day-yellow) !important",
                                },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  color: "var(--color-day-yellow) !important",
                                },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                                {
                                  borderBottom:
                                    "2px solid var(--color-day-black) !important",
                                },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                                {
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
                                  backgroundColor:
                                    "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                                {
                                  fontSize: "13px !important",
                                },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  fontSize: "12px !important",
                                  color: "var(--color-day-black) !important",
                                  top: "-8px !important",
                                },
                            }}
                            defaultValue={currency_selected}
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
                          /> */}
                        </div>
                      </div>
                      {model_name_1 ? (
                        <ComparisonChartCanvas
                          model_name={model_name_1.replace(/-/g, "_")}
                        />
                      ) : null}
                    </div>
                  )}
                </th>
                <th className="tg-0lax border-remove">
                  {windowWidth.current <= 768 ? (
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
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                              {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                              {
                                borderColor:
                                  "var(--color-day-yellow) !important",
                              },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "var(--color-day-yellow) !important",
                              },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                              {
                                borderBottom:
                                  "2px solid var(--color-day-black) !important",
                              },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                              {
                                fontSize: "13px !important",
                              },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                fontSize: "12px !important",
                                color: "var(--color-day-black) !important",
                                top: "-8px !important",
                              },
                            }}
                            // defaultValue={default_value}
                            onChange={handleChangeForTimeSelectionMobile2}
                            options={time_horizons2}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Horizons"
                                inputProps={{
                                  ...params.inputProps,
                                  style: { width: "70%" }, // set the width to auto

                                  autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          {/* CURRENCIES SEARCH BAR */}
                          {/* <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              marginBottom: "0.8rem",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                                {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                                {
                                  borderColor:
                                    "var(--color-day-yellow) !important",
                                },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  color: "var(--color-day-yellow) !important",
                                },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                                {
                                  borderBottom:
                                    "2px solid var(--color-day-black) !important",
                                },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                                {
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
                                  backgroundColor:
                                    "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                                {
                                  fontSize: "13px !important",
                                },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  fontSize: "12px !important",
                                  color: "var(--color-day-black) !important",
                                  top: "-8px !important",
                                },
                            }}
                            // defaultValue={default_value}
                            onChange={handleChangeForCoinSelectionMobile2}
                            options={currencies2}
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
                          /> */}
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
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                              {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                              {
                                borderColor:
                                  "var(--color-day-yellow) !important",
                              },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "var(--color-day-yellow) !important",
                              },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                              {
                                borderBottom:
                                  "2px solid var(--color-day-black) !important",
                              },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                              {
                                fontSize: "13px !important",
                              },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                          {model_name_2 ? (
                            <ComparisonChartCanvas
                              model_name={model_name_2.replace(/-/g, "_")}
                            />
                          ) : null}{" "}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="search-filter-wapper">
                        {/* TIME HORIZON */}
                        <h3 className="horizon-comparison-title">
                          Time Horizon
                        </h3>
                        <div className="horizon-left-comparison">
                          <div className="hours-list-comparison">
                            <ul id="hours-list-div-comparsion">
                              <li
                                id="hours-listings hours_filter_All"
                                style={{
                                  background:
                                    selectedItem2 === "All" ? "#fddd4e" : "",
                                  color: selectedItem2 === "All" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_All",
                                    "All"
                                  );
                                  setSelectedItem2("All");
                                }}
                              >
                                All
                              </li>
                              <li
                                id="hours-listings hour_filter_24"
                                style={{
                                  background:
                                    selectedItem2 === "24h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "24h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_24",
                                    "24h"
                                  );
                                  setSelectedItem2("24h");
                                }}
                              >
                                24h
                              </li>
                              <li
                                id="hours-listings hour_filter_12"
                                style={{
                                  background:
                                    selectedItem2 === "12h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "12h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_24",
                                    "12h"
                                  );
                                  setSelectedItem2("12h");
                                }}
                              >
                                12h
                              </li>
                              <li
                                id="hours-listings hour_filter_8"
                                style={{
                                  background:
                                    selectedItem2 === "8h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "8h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_8",
                                    "8h"
                                  );
                                  setSelectedItem2("8h");
                                }}
                              >
                                8h
                              </li>
                              <li
                                id="hours-listings hour_filter_3"
                                style={{
                                  background:
                                    selectedItem2 === "6h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "6h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_6",
                                    "6h"
                                  );
                                  setSelectedItem2("6h");
                                }}
                              >
                                6h
                              </li>
                              <li
                                id="hours-listings hour_filter_3"
                                style={{
                                  background:
                                    selectedItem2 === "4h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "4h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_4",
                                    "4h"
                                  );
                                  setSelectedItem2("4h");
                                }}
                              >
                                4h
                              </li>
                              <li
                                style={{
                                  background:
                                    selectedItem2 === "3h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "3h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_3",
                                    "3h"
                                  );
                                  setSelectedItem2("3h");
                                }}
                              >
                                3h
                              </li>
                              <li
                                id="hours-listings hour_filter_2"
                                style={{
                                  background:
                                    selectedItem2 === "2h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "2h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_2",
                                    "2h"
                                  );
                                  setSelectedItem2("2h");
                                }}
                              >
                                2h
                              </li>
                              <li
                                id="hours-listings hour_filter_1"
                                style={{
                                  background:
                                    selectedItem2 === "1h" ? "#fddd4e" : "",
                                  color: selectedItem2 === "1h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection2(
                                    "hour_filter_1",
                                    "1h"
                                  );
                                  setSelectedItem2("1h");
                                }}
                              >
                                1h
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="compare-search-wrapper">
                          {/* MODEL SEARCH BAR */}
                          <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                              {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                              {
                                borderColor:
                                  "var(--color-day-yellow) !important",
                              },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "var(--color-day-yellow) !important",
                              },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                              {
                                borderBottom:
                                  "2px solid var(--color-day-black) !important",
                              },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                              {
                                fontSize: "13px !important",
                              },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                fontSize: "12px !important",
                                color: "var(--color-day-black) !important",
                                top: "-8px !important",
                              },
                            }}
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
                          {/* CURRENCIES SEARCH BAR */}
                          {/* <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              marginRight: "0.4rem",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                                {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                                {
                                  borderColor:
                                    "var(--color-day-yellow) !important",
                                },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  color: "var(--color-day-yellow) !important",
                                },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                                {
                                  borderBottom:
                                    "2px solid var(--color-day-black) !important",
                                },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                                {
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
                                  backgroundColor:
                                    "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                                {
                                  fontSize: "13px !important",
                                },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  fontSize: "12px !important",
                                  color: "var(--color-day-black) !important",
                                  top: "-8px !important",
                                },
                            }}
                            // defaultValue={default_value}
                            onChange={handleChangeForCoinSelection2}
                            options={currencies2}
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
                          /> */}
                        </div>
                      </div>
                      {model_name_2 ? (
                        <ComparisonChartCanvas
                          model_name={model_name_2.replace(/-/g, "_")}
                        />
                      ) : null}
                    </div>
                  )}
                </th>
                <th className="tg-0lax to-hide border-remove">
                  {windowWidth.current <= 768 ? (
                    <CompareComponentMobile />
                  ) : (
                    <div>
                      <div className="search-filter-wapper">
                        {/* TIME HORIZON */}
                        <h3 className="horizon-comparison-title">
                          Time Horizon
                        </h3>
                        <div className="horizon-left-comparison">
                          <div className="hours-list-comparison">
                            <ul id="hours-list-div-comparsion">
                              <li
                                id="hours-listings hours_filter_All"
                                style={{
                                  background:
                                    selectedItem3 === "All" ? "#fddd4e" : "",
                                  color: selectedItem3 === "All" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_All",
                                    "All"
                                  );
                                  setSelectedItem3("All");
                                }}
                              >
                                All
                              </li>
                              <li
                                id="hours-listings hour_filter_24"
                                style={{
                                  background:
                                    selectedItem3 === "24h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "24h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_24",
                                    "24h"
                                  );
                                  setSelectedItem3("24h");
                                }}
                              >
                                24h
                              </li>
                              <li
                                id="hours-listings hour_filter_12"
                                style={{
                                  background:
                                    selectedItem3 === "12h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "12h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_24",
                                    "12h"
                                  );
                                  setSelectedItem3("12h");
                                }}
                              >
                                12h
                              </li>
                              <li
                                id="hours-listings hour_filter_8"
                                style={{
                                  background:
                                    selectedItem3 === "8h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "8h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_8",
                                    "8h"
                                  );
                                  setSelectedItem3("8h");
                                }}
                              >
                                8h
                              </li>
                              <li
                                id="hours-listings hour_filter_3"
                                style={{
                                  background:
                                    selectedItem3 === "6h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "6h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_6",
                                    "6h"
                                  );
                                  setSelectedItem3("6h");
                                }}
                              >
                                6h
                              </li>
                              <li
                                id="hours-listings hour_filter_3"
                                style={{
                                  background:
                                    selectedItem3 === "4h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "4h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_4",
                                    "4h"
                                  );
                                  setSelectedItem3("4h");
                                }}
                              >
                                4h
                              </li>
                              <li
                                style={{
                                  background:
                                    selectedItem3 === "3h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "3h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_3",
                                    "3h"
                                  );
                                  setSelectedItem3("3h");
                                }}
                              >
                                3h
                              </li>
                              <li
                                id="hours-listings hour_filter_2"
                                style={{
                                  background:
                                    selectedItem3 === "2h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "2h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_2",
                                    "2h"
                                  );
                                  setSelectedItem3("2h");
                                }}
                              >
                                2h
                              </li>
                              <li
                                id="hours-listings hour_filter_1"
                                style={{
                                  background:
                                    selectedItem3 === "1h" ? "#fddd4e" : "",
                                  color: selectedItem3 === "1h" ? "black" : "",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleChangeForTimeHorizonSelection3(
                                    "hour_filter_1",
                                    "1h"
                                  );
                                  setSelectedItem3("1h");
                                }}
                              >
                                1h
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="compare-search-wrapper">
                          {/* MODEL SEARCH BAR */}
                          <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                              {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                              {
                                borderColor:
                                  "var(--color-day-yellow) !important",
                              },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "var(--color-day-yellow) !important",
                              },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                              {
                                borderBottom:
                                  "2px solid var(--color-day-black) !important",
                              },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                              {
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
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                              {
                                fontSize: "13px !important",
                              },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                fontSize: "12px !important",
                                color: "var(--color-day-black) !important",
                                top: "-8px !important",
                              },
                            }}
                            // defaultValue={default_value}
                            onChange={handleChangeForModelSelection3}
                            options={model_names3}
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
                          {/* CURRENCIES SEARCH BAR */}
                          {/* <Autocomplete
                            id="country-select-demo"
                            className="model-compare-search"
                            sx={{
                              backgroundColor: "var(--color-forecasts-card)",
                              borderRadius: "5px",
                              labelColor: "red",
                              fontSize: "11px",
                              marginRight: "0.4rem",
                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper":
                                {
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

                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus":
                                {
                                  borderColor:
                                    "var(--color-day-yellow) !important",
                                },

                              "& div >.MuiOutlinedInput-notchedOutline": {
                                border:
                                  "0px solid var(--color-day-yellow) !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
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

                              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  color: "var(--color-day-yellow) !important",
                                },

                              "& .css-ptiqhd-MuiSvgIcon-root": {
                                height: "0.8em !important",
                                width: "0.8em !important",
                                fill: "var(--color-black-opcaity) !important",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                                padding: "3px 8px !important",
                                backgroundColor:
                                  "var(--color-day-yellow) !important",
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
                                backgroundColor:
                                  "var(--color-day-white) !important",
                                color: "var(--color-day-black) !important",
                              },

                              "& .mui-options": {
                                padding: "0px 15px",
                              },

                              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":
                                {
                                  borderBottom:
                                    "2px solid var(--color-day-black) !important",
                                },

                              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":
                                {
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
                                  backgroundColor:
                                    "var(--color-day-yellow) !important",
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

                              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                                {
                                  fontSize: "13px !important",
                                },

                              "& .css-nlvv43-MuiFormControl-root": {
                                margin: "0px 8px !important",
                                height: "30px !important",
                              },

                              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                {
                                  fontSize: "12px !important",
                                  color: "var(--color-day-black) !important",
                                  top: "-8px !important",
                                },
                            }}
                            // defaultValue={default_value}
                            onChange={handleChangeForCoinSelection3}
                            options={currencies3}
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
                          /> */}
                        </div>
                      </div>
                      {model_name_3 ? (
                        <ComparisonChartCanvas
                          model_name={model_name_3.replace(/-/g, "_")}
                        />
                      ) : null}
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            {windowWidth.current <= 768 ? (
              <tbody>
                <tr>
                  <td className="tg-0lax for-th">
                    Time Horizon
                    <Tooltip title="Time between predictions">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].time_horizon
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].time_horizon
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Currency
                    <Tooltip title="Forecasted currency">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].currency
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].currency
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Start Date
                    <Tooltip title="Start date of this model's forecasts">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].date_started
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].date_started
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Forecast
                    <Tooltip title="Price/directional prediction for current time">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"position"}
                    onChange={
                      strategies[model_name_1]
                        ? forBgColorPosition(
                          strategies[model_name_1].current_position,
                          "position"
                        )
                        : null
                    }
                  >
                    {strategies[model_name_1]
                      ? strategies[model_name_1].current_position
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"position2"}
                    onChange={
                      strategies[model_name_2]
                        ? forBgColorPosition(
                          strategies[model_name_2].current_position,
                          "position2"
                        )
                        : null
                    }
                  >
                    {strategies[model_name_2]
                      ? strategies[model_name_2].current_position
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Forecast Time
                    <Tooltip title="Time when the forecast is created (in local system time)">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].forecast_time
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].forecast_time
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Next Forecast
                    <Tooltip title="Countdown clock till time of next forecast">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1] ? (
                      <Timer
                        time_horizon={[
                          strategies[model_name_1].time_horizon,
                          strategies[model_name_1].next_forecast,
                        ]}
                      />
                    ) : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2] ? (
                      <Timer
                        time_horizon={[
                          strategies[model_name_2].time_horizon,
                          strategies[model_name_2].next_forecast,
                        ]}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    1d PNL
                    <Tooltip title="PNL of last 1 day">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl-bg"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                          value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].pnl_sum_1 : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl2"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                          value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].pnl_sum_1 : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    7d PNL
                    <Tooltip title="PNL of last 7 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl4"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                          value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].pnl_sum_7 : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl5"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                          value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].pnl_sum_7 : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    15d PNL
                    <Tooltip title="PNL of last 15 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl7"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                          value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_15
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl8"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                          value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_15
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    30d PNL
                    <Tooltip title="PNL of last 30 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl10"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                          value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_30
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl11"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                          value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_30
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    45d PNL
                    <Tooltip title="PNL of last 45 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl13"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                          value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_45
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl14"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                          value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_45
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    60d PNL
                    <Tooltip title="PNL of last 60 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl16"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                          value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_60
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl17"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                          value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_60
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Max Drawdown
                    <Tooltip title="Maximum Drawdown – Measurement of maximum negative yield experienced in the past">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl19"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].max_drawdown, "pnl19"],
                          value2: [stats[model_name_2].max_drawdown, "pnl20"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].max_drawdown
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl20"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].max_drawdown, "pnl19"],
                          value2: [stats[model_name_2].max_drawdown, "pnl20"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].max_drawdown
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Max Drawdown Days
                    <Tooltip title="Maximum Drawdown Days – Measurement of the maximum number of days the model was in a negative yield">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl22"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].max_drawdown_duration,
                            "pnl22",
                          ],
                          value2: [
                            stats[model_name_2].max_drawdown_duration,
                            "pnl23",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].max_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl23"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].max_drawdown_duration,
                            "pnl22",
                          ],
                          value2: [
                            stats[model_name_2].max_drawdown_duration,
                            "pnl23",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].max_drawdown_duration
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Average Drawdown
                    <Tooltip title="Average Drawdown – The average negative yield experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl25"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].average_drawdown,
                            "pnl25",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown,
                            "pnl26",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].average_drawdown
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl26"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].average_drawdown,
                            "pnl25",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown,
                            "pnl26",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].average_drawdown
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Average Drawdown Days
                    <Tooltip title="Average Drawdown Days – The average number of days in a negative yield experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl28"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].average_drawdown_duration,
                            "pnl28",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown_duration,
                            "pnl29",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].average_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl29"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].average_drawdown_duration,
                            "pnl28",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown_duration,
                            "pnl29",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].average_drawdown_duration
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Current Drawdown
                    <Tooltip title="Current Drawdown – The actual negative yield (if in a negative) that is currently being experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl31"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].current_drawdown,
                            "pnl31",
                          ],
                          value2: [
                            stats[model_name_2].current_drawdown,
                            "pnl32",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].current_drawdown
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl32"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].current_drawdown,
                            "pnl31",
                          ],
                          value2: [
                            stats[model_name_2].current_drawdown,
                            "pnl32",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].current_drawdown
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Current Drawdown Days
                    <Tooltip title="Current Drawdown Days – The actual number of days in a negative yield (if in a negative) that is currently being experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl34"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].curr_drawdown_duration,
                            "pnl34",
                          ],
                          value2: [
                            stats[model_name_2].curr_drawdown_duration,
                            "pnl35",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].curr_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl35"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].curr_drawdown_duration,
                            "pnl34",
                          ],
                          value2: [
                            stats[model_name_2].curr_drawdown_duration,
                            "pnl35",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].curr_drawdown_duration
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Total Wins
                    <Tooltip title="The total number of wins the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl37"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].total_wins, "pnl37"],
                          value2: [stats[model_name_2].total_wins, "pnl38"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_wins
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl38"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].total_wins, "pnl37"],
                          value2: [stats[model_name_2].total_wins, "pnl38"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_wins
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Total Losses
                    <Tooltip title="The total number of losses the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl40"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [stats[model_name_1].total_losses, "pnl40"],
                          value2: [stats[model_name_2].total_losses, "pnl41"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_losses
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl41"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [stats[model_name_1].total_losses, "pnl40"],
                          value2: [stats[model_name_2].total_losses, "pnl41"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_losses
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Consecutive Wins
                    <Tooltip title="The maximum number of sequential wins the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl43"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].consective_wins,
                            "pnl43",
                          ],
                          value2: [
                            stats[model_name_2].consective_wins,
                            "pnl44",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].consective_wins
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl44"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].consective_wins,
                            "pnl43",
                          ],
                          value2: [
                            stats[model_name_2].consective_wins,
                            "pnl44",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].consective_wins
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Consecutive Losses
                    <Tooltip title="The maximum number of sequential losses the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl46"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].consective_losses,
                            "pnl46",
                          ],
                          value2: [
                            stats[model_name_2].consective_losses,
                            "pnl47",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].consective_losses
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl47"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValuesMin({
                          value1: [
                            stats[model_name_1].consective_losses,
                            "pnl46",
                          ],
                          value2: [
                            stats[model_name_2].consective_losses,
                            "pnl47",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].consective_losses
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Win Percentage
                    <Tooltip title="The percentage number of wins the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl49"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].win_percentage,
                            "pnl49",
                          ],
                          value2: [
                            stats[model_name_2].win_percentage,
                            "pnl50",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].win_percentage
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl50"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].win_percentage,
                            "pnl49",
                          ],
                          value2: [
                            stats[model_name_2].win_percentage,
                            "pnl50",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].win_percentage
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Win/Loss Ratio
                    <Tooltip title="The ratio of the win size vs the loss size. Above 1 means the model wins more than it loses on average">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl52"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].win_loss_ratio,
                            "pnl52",
                          ],
                          value2: [
                            stats[model_name_2].win_loss_ratio,
                            "pnl53",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].win_loss_ratio
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl53"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].win_loss_ratio,
                            "pnl52",
                          ],
                          value2: [
                            stats[model_name_2].win_loss_ratio,
                            "pnl53",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].win_loss_ratio
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Aggregate Profit
                    <Tooltip title="The total amount of positive yield generated by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl55"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].max_drawdown, "pnl55"],
                          value2: [stats[model_name_2].max_drawdown, "pnl56"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_positive_pnl
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl56"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].max_drawdown, "pnl55"],
                          value2: [stats[model_name_2].max_drawdown, "pnl56"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_positive_pnl
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Aggregate Loss
                    <Tooltip title="The total amount of negative yield generated by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl58"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].total_negative_pnl,
                            "pnl58",
                          ],
                          value2: [
                            stats[model_name_2].total_negative_pnl,
                            "pnl59",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_negative_pnl
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl59"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].total_negative_pnl,
                            "pnl58",
                          ],
                          value2: [
                            stats[model_name_2].total_negative_pnl,
                            "pnl59",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_negative_pnl
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Average Daily PNL
                    <Tooltip title="Average daily PNL">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl61"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].average_daily_pnl,
                            "pnl61",
                          ],
                          value2: [
                            stats[model_name_2].average_daily_pnl,
                            "pnl62",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].average_daily_pnl
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl62"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [
                            stats[model_name_1].average_daily_pnl,
                            "pnl61",
                          ],
                          value2: [
                            stats[model_name_2].average_daily_pnl,
                            "pnl62",
                          ],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].average_daily_pnl
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    R2 Score
                    <Tooltip title="A measurement representing the descriptive power of the model. The closer the R2 score is to 1 the better the model is">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl64"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].r2_score, "pnl64"],
                          value2: [stats[model_name_2].r2_score, "pnl65"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].r2_score : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl65"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].r2_score, "pnl64"],
                          value2: [stats[model_name_2].r2_score, "pnl65"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].r2_score : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Sharpe
                    <Tooltip title="The ratio of annualized yield over standard deviation of yield that the model has experienced. The higher the Sharpe ratio the more consistent a model performance is">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl67"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].sharpe, "pnl67"],
                          value2: [stats[model_name_2].sharpe, "pnl68"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].sharpe : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl68"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].sharpe, "pnl67"],
                          value2: [stats[model_name_2].sharpe, "pnl68"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].sharpe : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Sortino
                    <Tooltip title="The ratio of annualized yield over the negative standard deviation of yield that the model has experienced. The higher the Sortino ratio the less risky the model performance is">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl71"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].sortino, "pnl71"],
                          value2: [stats[model_name_2].sortino, "pnl72"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].sortino : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl72"}
                    onChange={
                      stats[model_name_1] && stats[model_name_2]
                        ? changeColorOnValueBasisTwoValues({
                          value1: [stats[model_name_1].sortino, "pnl71"],
                          value2: [stats[model_name_2].sortino, "pnl72"],
                        })
                        : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].sortino : null}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td className="tg-0lax for-th">
                    Time Horizon
                    <Tooltip title="Time between predictions">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].time_horizon
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].time_horizon
                      : null}
                  </td>
                  <td className="tg-0lax to-hide">
                    {strategies[model_name_3]
                      ? strategies[model_name_3].time_horizon
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Currency
                    <Tooltip title="Forecasted currency">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].currency
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].currency
                      : null}
                  </td>
                  <td className="tg-0lax to-hide">
                    {strategies[model_name_3]
                      ? strategies[model_name_3].currency
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Start Date
                    <Tooltip title="Forecasts start date">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].date_started
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].date_started
                      : null}
                  </td>
                  <td className="tg-0lax to-hide">
                    {strategies[model_name_3]
                      ? strategies[model_name_3].date_started
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Forecast
                    <Tooltip title="Price/Directional prediction for current time">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"position"}
                    onChange={
                      strategies[model_name_1]
                        ? forBgColorPosition(
                          strategies[model_name_1].current_position,
                          "position"
                        )
                        : null
                    }
                  >
                    {strategies[model_name_1]
                      ? strategies[model_name_1].current_position
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"position2"}
                    onChange={
                      strategies[model_name_2]
                        ? forBgColorPosition(
                          strategies[model_name_2].current_position,
                          "position2"
                        )
                        : null
                    }
                  >
                    {strategies[model_name_2]
                      ? strategies[model_name_2].current_position
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"position3"}
                    onChange={
                      strategies[model_name_3]
                        ? forBgColorPosition(
                          strategies[model_name_3].current_position,
                          "position3"
                        )
                        : null
                    }
                  >
                    {" "}
                    {strategies[model_name_3]
                      ? strategies[model_name_3].current_position
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Forecast Time
                    <Tooltip title="Time when the forecast is created (in local system time)">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1]
                      ? strategies[model_name_1].forecast_time
                      : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2]
                      ? strategies[model_name_2].forecast_time
                      : null}
                  </td>
                  <td className="tg-0lax to-hide">
                    {strategies[model_name_3]
                      ? strategies[model_name_3].forecast_time
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Next Forecast
                    <Tooltip title="Countdown clock till time of next forecast">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_1] ? (
                      <Timer
                        time_horizon={[
                          strategies[model_name_1].time_horizon,
                          strategies[model_name_1].next_forecast,
                        ]}
                      />
                    ) : null}
                  </td>
                  <td className="tg-0lax">
                    {strategies[model_name_2] ? (
                      <Timer
                        time_horizon={[
                          strategies[model_name_2].time_horizon,
                          strategies[model_name_2].next_forecast,
                        ]}
                      />
                    ) : null}
                  </td>
                  <td className="tg-0lax to-hide">
                    {strategies[model_name_3] ? (
                      <Timer
                        time_horizon={[
                          strategies[model_name_3].time_horizon,
                          strategies[model_name_3].next_forecast,
                        ]}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    1d PNL
                    <Tooltip title="PNL of last 1 day">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl-bg"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                          value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                          value3: [stats[model_name_3].pnl_sum_1, "pnl3"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                            value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_1, "pnl2"],
                              value2: [stats[model_name_3].pnl_sum_1, "pnl3"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                                value2: [stats[model_name_3].pnl_sum_1, "pnl3"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_1 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl2"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                          value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                          value3: [stats[model_name_3].pnl_sum_1, "pnl3"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                            value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_1, "pnl2"],
                              value2: [stats[model_name_3].pnl_sum_1, "pnl3"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                                value2: [stats[model_name_3].pnl_sum_1, "pnl3"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_1 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl3"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                          value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                          value3: [stats[model_name_3].pnl_sum_1, "pnl3"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                            value2: [stats[model_name_2].pnl_sum_1, "pnl2"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_1, "pnl2"],
                              value2: [stats[model_name_3].pnl_sum_1, "pnl3"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_1, "pnl-bg"],
                                value2: [stats[model_name_3].pnl_sum_1, "pnl3"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].pnl_sum_1 + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    7d PNL
                    <Tooltip title="PNL of last 7 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl4"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                          value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                          value3: [stats[model_name_3].pnl_sum_7, "pnl6"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                            value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_7, "pnl5"],
                              value2: [stats[model_name_3].pnl_sum_7, "pnl6"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                                value2: [stats[model_name_3].pnl_sum_7, "pnl6"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_7 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl5"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                          value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                          value3: [stats[model_name_3].pnl_sum_7, "pnl6"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                            value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_7, "pnl5"],
                              value2: [stats[model_name_3].pnl_sum_7, "pnl6"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                                value2: [stats[model_name_3].pnl_sum_7, "pnl6"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_7 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl6"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                          value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                          value3: [stats[model_name_3].pnl_sum_7, "pnl6"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                            value2: [stats[model_name_2].pnl_sum_7, "pnl5"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_7, "pnl5"],
                              value2: [stats[model_name_3].pnl_sum_7, "pnl6"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_7, "pnl4"],
                                value2: [stats[model_name_3].pnl_sum_7, "pnl6"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].pnl_sum_7 + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    15d PNL
                    <Tooltip title="PNL of last 15 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl7"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                          value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                          value3: [stats[model_name_3].pnl_sum_15, "pnl9"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                            value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_15, "pnl8"],
                              value2: [stats[model_name_3].pnl_sum_15, "pnl9"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                                value2: [stats[model_name_3].pnl_sum_15, "pnl9"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_15 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl8"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                          value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                          value3: [stats[model_name_3].pnl_sum_15, "pnl9"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                            value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_15, "pnl8"],
                              value2: [stats[model_name_3].pnl_sum_15, "pnl9"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                                value2: [stats[model_name_3].pnl_sum_15, "pnl9"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_15 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl9"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                          value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                          value3: [stats[model_name_3].pnl_sum_15, "pnl9"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                            value2: [stats[model_name_2].pnl_sum_15, "pnl8"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_15, "pnl8"],
                              value2: [stats[model_name_3].pnl_sum_15, "pnl9"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_15, "pnl7"],
                                value2: [stats[model_name_3].pnl_sum_15, "pnl9"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].pnl_sum_15 + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    30d PNL
                    <Tooltip title="PNL of last 30 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl10"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                          value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                          value3: [stats[model_name_3].pnl_sum_30, "pnl12"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                            value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_30, "pnl11"],
                              value2: [stats[model_name_3].pnl_sum_30, "pnl12"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                                value2: [stats[model_name_3].pnl_sum_30, "pnl12"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_30 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl11"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                          value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                          value3: [stats[model_name_3].pnl_sum_30, "pnl12"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                            value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_30, "pnl11"],
                              value2: [stats[model_name_3].pnl_sum_30, "pnl12"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                                value2: [stats[model_name_3].pnl_sum_30, "pnl12"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_30 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl12"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                          value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                          value3: [stats[model_name_3].pnl_sum_30, "pnl12"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                            value2: [stats[model_name_2].pnl_sum_30, "pnl11"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_30, "pnl11"],
                              value2: [stats[model_name_3].pnl_sum_30, "pnl12"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_30, "pnl10"],
                                value2: [stats[model_name_3].pnl_sum_30, "pnl12"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].pnl_sum_30 + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    45d PNL
                    <Tooltip title="PNL of last 45 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl13"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                          value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                          value3: [stats[model_name_3].pnl_sum_45, "pnl15"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                            value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_45, "pnl14"],
                              value2: [stats[model_name_3].pnl_sum_45, "pnl15"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                                value2: [stats[model_name_3].pnl_sum_45, "pnl15"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_45 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl14"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                          value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                          value3: [stats[model_name_3].pnl_sum_45, "pnl15"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                            value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_45, "pnl14"],
                              value2: [stats[model_name_3].pnl_sum_45, "pnl15"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                                value2: [stats[model_name_3].pnl_sum_45, "pnl15"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_45 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl15"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                          value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                          value3: [stats[model_name_3].pnl_sum_45, "pnl15"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                            value2: [stats[model_name_2].pnl_sum_45, "pnl14"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_45, "pnl14"],
                              value2: [stats[model_name_3].pnl_sum_45, "pnl15"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_45, "pnl13"],
                                value2: [stats[model_name_3].pnl_sum_45, "pnl15"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].pnl_sum_45 + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    60d PNL
                    <Tooltip title="PNL of last 60 days">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl16"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                          value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                          value3: [stats[model_name_3].pnl_sum_60, "pnl18"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                            value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_60, "pnl17"],
                              value2: [stats[model_name_3].pnl_sum_60, "pnl18"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                                value2: [stats[model_name_3].pnl_sum_60, "pnl18"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].pnl_sum_60 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl17"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                          value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                          value3: [stats[model_name_3].pnl_sum_60, "pnl18"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                            value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_60, "pnl17"],
                              value2: [stats[model_name_3].pnl_sum_60, "pnl18"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                                value2: [stats[model_name_3].pnl_sum_60, "pnl18"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].pnl_sum_60 + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl18"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                          value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                          value3: [stats[model_name_3].pnl_sum_60, "pnl18"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                            value2: [stats[model_name_2].pnl_sum_60, "pnl17"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].pnl_sum_60, "pnl17"],
                              value2: [stats[model_name_3].pnl_sum_60, "pnl18"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].pnl_sum_60, "pnl16"],
                                value2: [stats[model_name_3].pnl_sum_60, "pnl18"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].pnl_sum_60 + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Max Drawdown
                    <Tooltip title="Maximum DrawDown – measurement of maximum negative yield experienced in the past">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl19"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].max_drawdown, "pnl19"],
                          value2: [stats[model_name_2].max_drawdown, "pnl20"],
                          value3: [stats[model_name_3].max_drawdown, "pnl21"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].max_drawdown, "pnl19"],
                            value2: [stats[model_name_2].max_drawdown, "pnl20"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].max_drawdown, "pnl20"],
                              value2: [stats[model_name_3].max_drawdown, "pnl21"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].max_drawdown, "pnl19"],
                                value2: [stats[model_name_3].max_drawdown, "pnl21"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].max_drawdown + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl20"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].max_drawdown, "pnl19"],
                          value2: [stats[model_name_2].max_drawdown, "pnl20"],
                          value3: [stats[model_name_3].max_drawdown, "pnl21"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].max_drawdown, "pnl19"],
                            value2: [stats[model_name_2].max_drawdown, "pnl20"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].max_drawdown, "pnl20"],
                              value2: [stats[model_name_3].max_drawdown, "pnl21"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].max_drawdown, "pnl19"],
                                value2: [stats[model_name_3].max_drawdown, "pnl21"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].max_drawdown + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl21"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].max_drawdown, "pnl19"],
                          value2: [stats[model_name_2].max_drawdown, "pnl20"],
                          value3: [stats[model_name_3].max_drawdown, "pnl21"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].max_drawdown, "pnl19"],
                            value2: [stats[model_name_2].max_drawdown, "pnl20"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].max_drawdown, "pnl20"],
                              value2: [stats[model_name_3].max_drawdown, "pnl21"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].max_drawdown, "pnl19"],
                                value2: [stats[model_name_3].max_drawdown, "pnl21"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].max_drawdown + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Max Drawdown Days
                    <Tooltip title="Maximum DrawDown Days – measurement of the maximum number of days the model was in a negative yield">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl22"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].max_drawdown_duration,
                            "pnl22",
                          ],
                          value2: [
                            stats[model_name_2].max_drawdown_duration,
                            "pnl23",
                          ],
                          value3: [
                            stats[model_name_3].max_drawdown_duration,
                            "pnl24",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].max_drawdown_duration,
                              "pnl22",
                            ],
                            value2: [
                              stats[model_name_2].max_drawdown_duration,
                              "pnl23",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].max_drawdown_duration,
                                "pnl23",
                              ],
                              value2: [
                                stats[model_name_3].max_drawdown_duration,
                                "pnl24",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].max_drawdown_duration,
                                  "pnl22",
                                ],
                                value2: [
                                  stats[model_name_3].max_drawdown_duration,
                                  "pnl24",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].max_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl23"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].max_drawdown_duration,
                            "pnl22",
                          ],
                          value2: [
                            stats[model_name_2].max_drawdown_duration,
                            "pnl23",
                          ],
                          value3: [
                            stats[model_name_3].max_drawdown_duration,
                            "pnl24",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].max_drawdown_duration,
                              "pnl22",
                            ],
                            value2: [
                              stats[model_name_2].max_drawdown_duration,
                              "pnl23",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].max_drawdown_duration,
                                "pnl23",
                              ],
                              value2: [
                                stats[model_name_3].max_drawdown_duration,
                                "pnl24",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].max_drawdown_duration,
                                  "pnl22",
                                ],
                                value2: [
                                  stats[model_name_3].max_drawdown_duration,
                                  "pnl24",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].max_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl24"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].max_drawdown_duration,
                            "pnl22",
                          ],
                          value2: [
                            stats[model_name_2].max_drawdown_duration,
                            "pnl23",
                          ],
                          value3: [
                            stats[model_name_3].max_drawdown_duration,
                            "pnl24",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].max_drawdown_duration,
                              "pnl22",
                            ],
                            value2: [
                              stats[model_name_2].max_drawdown_duration,
                              "pnl23",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].max_drawdown_duration,
                                "pnl23",
                              ],
                              value2: [
                                stats[model_name_3].max_drawdown_duration,
                                "pnl24",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].max_drawdown_duration,
                                  "pnl22",
                                ],
                                value2: [
                                  stats[model_name_3].max_drawdown_duration,
                                  "pnl24",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].max_drawdown_duration
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Average Drawdown
                    <Tooltip title="Average DrawDown – the average negative yield experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl25"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].average_drawdown,
                            "pnl25",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown,
                            "pnl26",
                          ],
                          value3: [
                            stats[model_name_3].average_drawdown,
                            "pnl27",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].average_drawdown,
                              "pnl25",
                            ],
                            value2: [
                              stats[model_name_2].average_drawdown,
                              "pnl26",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].average_drawdown,
                                "pnl26",
                              ],
                              value2: [
                                stats[model_name_3].average_drawdown,
                                "pnl27",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].average_drawdown,
                                  "pnl25",
                                ],
                                value2: [
                                  stats[model_name_3].average_drawdown,
                                  "pnl27",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].average_drawdown + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl26"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].average_drawdown,
                            "pnl25",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown,
                            "pnl26",
                          ],
                          value3: [
                            stats[model_name_3].average_drawdown,
                            "pnl27",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].average_drawdown,
                              "pnl25",
                            ],
                            value2: [
                              stats[model_name_2].average_drawdown,
                              "pnl26",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].average_drawdown,
                                "pnl26",
                              ],
                              value2: [
                                stats[model_name_3].average_drawdown,
                                "pnl27",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].average_drawdown,
                                  "pnl25",
                                ],
                                value2: [
                                  stats[model_name_3].average_drawdown,
                                  "pnl27",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].average_drawdown + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl27"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].average_drawdown,
                            "pnl25",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown,
                            "pnl26",
                          ],
                          value3: [
                            stats[model_name_3].average_drawdown,
                            "pnl27",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].average_drawdown,
                              "pnl25",
                            ],
                            value2: [
                              stats[model_name_2].average_drawdown,
                              "pnl26",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].average_drawdown,
                                "pnl26",
                              ],
                              value2: [
                                stats[model_name_3].average_drawdown,
                                "pnl27",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].average_drawdown,
                                  "pnl25",
                                ],
                                value2: [
                                  stats[model_name_3].average_drawdown,
                                  "pnl27",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].average_drawdown + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Average Drawdown Days
                    <Tooltip title="Average DrawDown Days – the average number of days in a negative yield experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl28"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].average_drawdown_duration,
                            "pnl28",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown_duration,
                            "pnl29",
                          ],
                          value3: [
                            stats[model_name_3].average_drawdown_duration,
                            "pnl30",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].average_drawdown_duration,
                              "pnl28",
                            ],
                            value2: [
                              stats[model_name_2].average_drawdown_duration,
                              "pnl29",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].average_drawdown_duration,
                                "pnl29",
                              ],
                              value2: [
                                stats[model_name_3].average_drawdown_duration,
                                "pnl30",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].average_drawdown_duration,
                                  "pnl28",
                                ],
                                value2: [
                                  stats[model_name_3].average_drawdown_duration,
                                  "pnl30",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].average_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl29"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].average_drawdown_duration,
                            "pnl28",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown_duration,
                            "pnl29",
                          ],
                          value3: [
                            stats[model_name_3].average_drawdown_duration,
                            "pnl30",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].average_drawdown_duration,
                              "pnl28",
                            ],
                            value2: [
                              stats[model_name_2].average_drawdown_duration,
                              "pnl29",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].average_drawdown_duration,
                                "pnl29",
                              ],
                              value2: [
                                stats[model_name_3].average_drawdown_duration,
                                "pnl30",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].average_drawdown_duration,
                                  "pnl28",
                                ],
                                value2: [
                                  stats[model_name_3].average_drawdown_duration,
                                  "pnl30",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].average_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl30"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].average_drawdown_duration,
                            "pnl28",
                          ],
                          value2: [
                            stats[model_name_2].average_drawdown_duration,
                            "pnl29",
                          ],
                          value3: [
                            stats[model_name_3].average_drawdown_duration,
                            "pnl30",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].average_drawdown_duration,
                              "pnl28",
                            ],
                            value2: [
                              stats[model_name_2].average_drawdown_duration,
                              "pnl29",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].average_drawdown_duration,
                                "pnl29",
                              ],
                              value2: [
                                stats[model_name_3].average_drawdown_duration,
                                "pnl30",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].average_drawdown_duration,
                                  "pnl28",
                                ],
                                value2: [
                                  stats[model_name_3].average_drawdown_duration,
                                  "pnl30",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].average_drawdown_duration
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Current Drawdown
                    <Tooltip title="Current DrawDown – the actual negative yield (if in a negative) that is currently being experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl31"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].current_drawdown,
                            "pnl31",
                          ],
                          value2: [
                            stats[model_name_2].current_drawdown,
                            "pnl32",
                          ],
                          value3: [
                            stats[model_name_3].current_drawdown,
                            "pnl33",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].current_drawdown,
                              "pnl31",
                            ],
                            value2: [
                              stats[model_name_2].current_drawdown,
                              "pnl32",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].current_drawdown,
                                "pnl32",
                              ],
                              value2: [
                                stats[model_name_3].current_drawdown,
                                "pnl33",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].current_drawdown,
                                  "pnl31",
                                ],
                                value2: [
                                  stats[model_name_3].current_drawdown,
                                  "pnl33",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].current_drawdown + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl32"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].current_drawdown,
                            "pnl31",
                          ],
                          value2: [
                            stats[model_name_2].current_drawdown,
                            "pnl32",
                          ],
                          value3: [
                            stats[model_name_3].current_drawdown,
                            "pnl33",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].current_drawdown,
                              "pnl31",
                            ],
                            value2: [
                              stats[model_name_2].current_drawdown,
                              "pnl32",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].current_drawdown,
                                "pnl32",
                              ],
                              value2: [
                                stats[model_name_3].current_drawdown,
                                "pnl33",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].current_drawdown,
                                  "pnl31",
                                ],
                                value2: [
                                  stats[model_name_3].current_drawdown,
                                  "pnl33",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].current_drawdown + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl33"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].current_drawdown,
                            "pnl31",
                          ],
                          value2: [
                            stats[model_name_2].current_drawdown,
                            "pnl32",
                          ],
                          value3: [
                            stats[model_name_3].current_drawdown,
                            "pnl33",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].current_drawdown,
                              "pnl31",
                            ],
                            value2: [
                              stats[model_name_2].current_drawdown,
                              "pnl32",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].current_drawdown,
                                "pnl32",
                              ],
                              value2: [
                                stats[model_name_3].current_drawdown,
                                "pnl33",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].current_drawdown,
                                  "pnl31",
                                ],
                                value2: [
                                  stats[model_name_3].current_drawdown,
                                  "pnl33",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].current_drawdown + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Current Drawdown Days
                    <Tooltip title="Current DrawDown Days – the actual number of days in a negative yield (if in a negative) that is currently being experienced by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl34"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].curr_drawdown_duration,
                            "pnl34",
                          ],
                          value2: [
                            stats[model_name_2].curr_drawdown_duration,
                            "pnl35",
                          ],
                          value3: [
                            stats[model_name_3].curr_drawdown_duration,
                            "pnl36",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].curr_drawdown_duration,
                              "pnl34",
                            ],
                            value2: [
                              stats[model_name_2].curr_drawdown_duration,
                              "pnl35",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].curr_drawdown_duration,
                                "pnl35",
                              ],
                              value2: [
                                stats[model_name_3].curr_drawdown_duration,
                                "pnl36",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].curr_drawdown_duration,
                                  "pnl34",
                                ],
                                value2: [
                                  stats[model_name_3].curr_drawdown_duration,
                                  "pnl36",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].curr_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl35"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].curr_drawdown_duration,
                            "pnl34",
                          ],
                          value2: [
                            stats[model_name_2].curr_drawdown_duration,
                            "pnl35",
                          ],
                          value3: [
                            stats[model_name_3].curr_drawdown_duration,
                            "pnl36",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].curr_drawdown_duration,
                              "pnl34",
                            ],
                            value2: [
                              stats[model_name_2].curr_drawdown_duration,
                              "pnl35",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].curr_drawdown_duration,
                                "pnl35",
                              ],
                              value2: [
                                stats[model_name_3].curr_drawdown_duration,
                                "pnl36",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].curr_drawdown_duration,
                                  "pnl34",
                                ],
                                value2: [
                                  stats[model_name_3].curr_drawdown_duration,
                                  "pnl36",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].curr_drawdown_duration
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl36"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].curr_drawdown_duration,
                            "pnl34",
                          ],
                          value2: [
                            stats[model_name_2].curr_drawdown_duration,
                            "pnl35",
                          ],
                          value3: [
                            stats[model_name_3].curr_drawdown_duration,
                            "pnl36",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].curr_drawdown_duration,
                              "pnl34",
                            ],
                            value2: [
                              stats[model_name_2].curr_drawdown_duration,
                              "pnl35",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].curr_drawdown_duration,
                                "pnl35",
                              ],
                              value2: [
                                stats[model_name_3].curr_drawdown_duration,
                                "pnl36",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].curr_drawdown_duration,
                                  "pnl34",
                                ],
                                value2: [
                                  stats[model_name_3].curr_drawdown_duration,
                                  "pnl36",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].curr_drawdown_duration
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Total Wins
                    <Tooltip title="The total number of Wins the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl37"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].total_wins, "pnl37"],
                          value2: [stats[model_name_2].total_wins, "pnl38"],
                          value3: [stats[model_name_3].total_wins, "pnl39"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].total_wins, "pnl37"],
                            value2: [stats[model_name_2].total_wins, "pnl38"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].total_wins, "pnl38"],
                              value2: [stats[model_name_3].total_wins, "pnl39"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].total_wins, "pnl37"],
                                value2: [stats[model_name_3].total_wins, "pnl39"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_wins
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl38"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].total_wins, "pnl37"],
                          value2: [stats[model_name_2].total_wins, "pnl38"],
                          value3: [stats[model_name_3].total_wins, "pnl39"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].total_wins, "pnl37"],
                            value2: [stats[model_name_2].total_wins, "pnl38"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].total_wins, "pnl38"],
                              value2: [stats[model_name_3].total_wins, "pnl39"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].total_wins, "pnl37"],
                                value2: [stats[model_name_3].total_wins, "pnl39"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_wins
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl39"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].total_wins, "pnl37"],
                          value2: [stats[model_name_2].total_wins, "pnl38"],
                          value3: [stats[model_name_3].total_wins, "pnl39"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].total_wins, "pnl37"],
                            value2: [stats[model_name_2].total_wins, "pnl38"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].total_wins, "pnl38"],
                              value2: [stats[model_name_3].total_wins, "pnl39"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].total_wins, "pnl37"],
                                value2: [stats[model_name_3].total_wins, "pnl39"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].total_wins
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Total Losses
                    <Tooltip title="The total number of losses the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl40"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [stats[model_name_1].total_losses, "pnl40"],
                          value2: [stats[model_name_2].total_losses, "pnl41"],
                          value3: [stats[model_name_3].total_losses, "pnl42"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [stats[model_name_1].total_losses, "pnl40"],
                            value2: [stats[model_name_2].total_losses, "pnl41"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [stats[model_name_2].total_losses, "pnl41"],
                              value2: [stats[model_name_3].total_losses, "pnl42"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [stats[model_name_1].total_losses, "pnl40"],
                                value2: [stats[model_name_3].total_losses, "pnl42"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_losses
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl41"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [stats[model_name_1].total_losses, "pnl40"],
                          value2: [stats[model_name_2].total_losses, "pnl41"],
                          value3: [stats[model_name_3].total_losses, "pnl42"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [stats[model_name_1].total_losses, "pnl40"],
                            value2: [stats[model_name_2].total_losses, "pnl41"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [stats[model_name_2].total_losses, "pnl41"],
                              value2: [stats[model_name_3].total_losses, "pnl42"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [stats[model_name_1].total_losses, "pnl40"],
                                value2: [stats[model_name_3].total_losses, "pnl42"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_losses
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl42"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [stats[model_name_1].total_losses, "pnl40"],
                          value2: [stats[model_name_2].total_losses, "pnl41"],
                          value3: [stats[model_name_3].total_losses, "pnl42"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [stats[model_name_1].total_losses, "pnl40"],
                            value2: [stats[model_name_2].total_losses, "pnl41"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [stats[model_name_2].total_losses, "pnl41"],
                              value2: [stats[model_name_3].total_losses, "pnl42"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [stats[model_name_1].total_losses, "pnl40"],
                                value2: [stats[model_name_3].total_losses, "pnl42"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].total_losses
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Consecutive Wins
                    <Tooltip title="The maximum amount of sequential wins the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl43"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].consective_wins,
                            "pnl43",
                          ],
                          value2: [
                            stats[model_name_2].consective_wins,
                            "pnl44",
                          ],
                          value3: [
                            stats[model_name_3].consective_wins,
                            "pnl45",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].consective_wins,
                              "pnl43",
                            ],
                            value2: [
                              stats[model_name_2].consective_wins,
                              "pnl44",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].consective_wins,
                                "pnl44",
                              ],
                              value2: [
                                stats[model_name_3].consective_wins,
                                "pnl45",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].consective_wins,
                                  "pnl43",
                                ],
                                value2: [
                                  stats[model_name_3].consective_wins,
                                  "pnl45",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].consective_wins
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl44"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].consective_wins,
                            "pnl43",
                          ],
                          value2: [
                            stats[model_name_2].consective_wins,
                            "pnl44",
                          ],
                          value3: [
                            stats[model_name_3].consective_wins,
                            "pnl45",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].consective_wins,
                              "pnl43",
                            ],
                            value2: [
                              stats[model_name_2].consective_wins,
                              "pnl44",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].consective_wins,
                                "pnl44",
                              ],
                              value2: [
                                stats[model_name_3].consective_wins,
                                "pnl45",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].consective_wins,
                                  "pnl43",
                                ],
                                value2: [
                                  stats[model_name_3].consective_wins,
                                  "pnl45",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].consective_wins
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl45"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].consective_wins,
                            "pnl43",
                          ],
                          value2: [
                            stats[model_name_2].consective_wins,
                            "pnl44",
                          ],
                          value3: [
                            stats[model_name_3].consective_wins,
                            "pnl45",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].consective_wins,
                              "pnl43",
                            ],
                            value2: [
                              stats[model_name_2].consective_wins,
                              "pnl44",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].consective_wins,
                                "pnl44",
                              ],
                              value2: [
                                stats[model_name_3].consective_wins,
                                "pnl45",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].consective_wins,
                                  "pnl43",
                                ],
                                value2: [
                                  stats[model_name_3].consective_wins,
                                  "pnl45",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].consective_wins
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Consecutive Losses
                    <Tooltip title="The maximum amount of sequential losses the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl46"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].consective_losses,
                            "pnl46",
                          ],
                          value2: [
                            stats[model_name_2].consective_losses,
                            "pnl47",
                          ],
                          value3: [
                            stats[model_name_3].consective_losses,
                            "pnl48",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].consective_losses,
                              "pnl46",
                            ],
                            value2: [
                              stats[model_name_2].consective_losses,
                              "pnl47",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].consective_losses,
                                "pnl47",
                              ],
                              value2: [
                                stats[model_name_3].consective_losses,
                                "pnl48",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].consective_losses,
                                  "pnl46",
                                ],
                                value2: [
                                  stats[model_name_3].consective_losses,
                                  "pnl48",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].consective_losses
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl47"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].consective_losses,
                            "pnl46",
                          ],
                          value2: [
                            stats[model_name_2].consective_losses,
                            "pnl47",
                          ],
                          value3: [
                            stats[model_name_3].consective_losses,
                            "pnl48",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].consective_losses,
                              "pnl46",
                            ],
                            value2: [
                              stats[model_name_2].consective_losses,
                              "pnl47",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].consective_losses,
                                "pnl47",
                              ],
                              value2: [
                                stats[model_name_3].consective_losses,
                                "pnl48",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].consective_losses,
                                  "pnl46",
                                ],
                                value2: [
                                  stats[model_name_3].consective_losses,
                                  "pnl48",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].consective_losses
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl48"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasisMin({
                          value1: [
                            stats[model_name_1].consective_losses,
                            "pnl46",
                          ],
                          value2: [
                            stats[model_name_2].consective_losses,
                            "pnl47",
                          ],
                          value3: [
                            stats[model_name_3].consective_losses,
                            "pnl48",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].consective_losses,
                              "pnl46",
                            ],
                            value2: [
                              stats[model_name_2].consective_losses,
                              "pnl47",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].consective_losses,
                                "pnl47",
                              ],
                              value2: [
                                stats[model_name_3].consective_losses,
                                "pnl48",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].consective_losses,
                                  "pnl46",
                                ],
                                value2: [
                                  stats[model_name_3].consective_losses,
                                  "pnl48",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].consective_losses
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Win Percentage
                    <Tooltip title="The percentage amount of wins the model has experienced">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl49"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].win_percentage,
                            "pnl49",
                          ],
                          value2: [
                            stats[model_name_2].win_percentage,
                            "pnl50",
                          ],
                          value3: [
                            stats[model_name_3].win_percentage,
                            "pnl51",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].win_percentage,
                              "pnl49",
                            ],
                            value2: [
                              stats[model_name_2].win_percentage,
                              "pnl50",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].win_percentage,
                                "pnl50",
                              ],
                              value2: [
                                stats[model_name_3].win_percentage,
                                "pnl51",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].win_percentage,
                                  "pnl49",
                                ],
                                value2: [
                                  stats[model_name_3].win_percentage,
                                  "pnl51",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].win_percentage + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl50"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].win_percentage,
                            "pnl49",
                          ],
                          value2: [
                            stats[model_name_2].win_percentage,
                            "pnl50",
                          ],
                          value3: [
                            stats[model_name_3].win_percentage,
                            "pnl51",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].win_percentage,
                              "pnl49",
                            ],
                            value2: [
                              stats[model_name_2].win_percentage,
                              "pnl50",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].win_percentage,
                                "pnl50",
                              ],
                              value2: [
                                stats[model_name_3].win_percentage,
                                "pnl51",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].consective_wins,
                                  "pnl49",
                                ],
                                value2: [
                                  stats[model_name_3].consective_wins,
                                  "pnl51",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].win_percentage + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl51"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].win_percentage,
                            "pnl49",
                          ],
                          value2: [
                            stats[model_name_2].win_percentage,
                            "pnl50",
                          ],
                          value3: [
                            stats[model_name_3].win_percentage,
                            "pnl51",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].win_percentage,
                              "pnl49",
                            ],
                            value2: [
                              stats[model_name_2].win_percentage,
                              "pnl50",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].win_percentage,
                                "pnl50",
                              ],
                              value2: [
                                stats[model_name_3].win_percentage,
                                "pnl51",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].win_percentage,
                                  "pnl49",
                                ],
                                value2: [
                                  stats[model_name_3].win_percentage,
                                  "pnl51",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].win_percentage + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Win/Loss Ratio
                    <Tooltip title="The ratio of the win size vs the loss size. Above 1 means the model wins more than it losses on average">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl52"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].win_loss_ratio,
                            "pnl52",
                          ],
                          value2: [
                            stats[model_name_2].win_loss_ratio,
                            "pnl53",
                          ],
                          value3: [
                            stats[model_name_3].win_loss_ratio,
                            "pnl54",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].win_loss_ratio,
                              "pnl52",
                            ],
                            value2: [
                              stats[model_name_2].win_loss_ratio,
                              "pnl53",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].win_loss_ratio,
                                "pnl53",
                              ],
                              value2: [
                                stats[model_name_3].win_loss_ratio,
                                "pnl54",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].win_loss_ratio,
                                  "pnl52",
                                ],
                                value2: [
                                  stats[model_name_3].win_loss_ratio,
                                  "pnl54",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].win_loss_ratio
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl53"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].win_loss_ratio,
                            "pnl52",
                          ],
                          value2: [
                            stats[model_name_2].win_loss_ratio,
                            "pnl53",
                          ],
                          value3: [
                            stats[model_name_3].win_loss_ratio,
                            "pnl54",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].win_loss_ratio,
                              "pnl52",
                            ],
                            value2: [
                              stats[model_name_2].win_loss_ratio,
                              "pnl53",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].win_loss_ratio,
                                "pnl53",
                              ],
                              value2: [
                                stats[model_name_3].win_loss_ratio,
                                "pnl54",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].win_loss_ratio,
                                  "pnl52",
                                ],
                                value2: [
                                  stats[model_name_3].win_loss_ratio,
                                  "pnl54",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].win_loss_ratio
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl54"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].win_loss_ratio,
                            "pnl52",
                          ],
                          value2: [
                            stats[model_name_2].win_loss_ratio,
                            "pnl53",
                          ],
                          value3: [
                            stats[model_name_3].win_loss_ratio,
                            "pnl54",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].win_loss_ratio,
                              "pnl52",
                            ],
                            value2: [
                              stats[model_name_2].win_loss_ratio,
                              "pnl53",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].win_loss_ratio,
                                "pnl53",
                              ],
                              value2: [
                                stats[model_name_3].win_loss_ratio,
                                "pnl54",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].win_loss_ratio,
                                  "pnl52",
                                ],
                                value2: [
                                  stats[model_name_3].win_loss_ratio,
                                  "pnl54",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].win_loss_ratio
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Aggregate Profit
                    <Tooltip title="The total amount of positive yield generated by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl55"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].total_positive_pnl,
                            "pnl55",
                          ],
                          value2: [
                            stats[model_name_2].total_positive_pnl,
                            "pnl56",
                          ],
                          value3: [
                            stats[model_name_3].total_positive_pnl,
                            "pnl57",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].total_positive_pnl,
                              "pnl55",
                            ],
                            value2: [
                              stats[model_name_2].total_positive_pnl,
                              "pnl56",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].total_positive_pnl,
                                "pnl56",
                              ],
                              value2: [
                                stats[model_name_3].total_positive_pnl,
                                "pnl57",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].total_positive_pnl,
                                  "pnl55",
                                ],
                                value2: [
                                  stats[model_name_3].total_positive_pnl,
                                  "pnl57",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_positive_pnl + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl56"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].total_positive_pnl,
                            "pnl55",
                          ],
                          value2: [
                            stats[model_name_2].total_positive_pnl,
                            "pnl56",
                          ],
                          value3: [
                            stats[model_name_3].total_positive_pnl,
                            "pnl57",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].total_positive_pnl,
                              "pnl55",
                            ],
                            value2: [
                              stats[model_name_2].total_positive_pnl,
                              "pnl56",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].total_positive_pnl,
                                "pnl56",
                              ],
                              value2: [
                                stats[model_name_3].total_positive_pnl,
                                "pnl57",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].total_positive_pnl,
                                  "pnl55",
                                ],
                                value2: [
                                  stats[model_name_3].total_positive_pnl,
                                  "pnl57",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_positive_pnl + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl57"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].total_positive_pnl,
                            "pnl55",
                          ],
                          value2: [
                            stats[model_name_2].total_positive_pnl,
                            "pnl56",
                          ],
                          value3: [
                            stats[model_name_3].total_positive_pnl,
                            "pnl57",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].total_positive_pnl,
                              "pnl55",
                            ],
                            value2: [
                              stats[model_name_2].total_positive_pnl,
                              "pnl56",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].total_positive_pnl,
                                "pnl56",
                              ],
                              value2: [
                                stats[model_name_3].total_positive_pnl,
                                "pnl57",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].total_positive_pnl,
                                  "pnl55",
                                ],
                                value2: [
                                  stats[model_name_3].total_positive_pnl,
                                  "pnl57",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].total_positive_pnl + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Aggregate Loss
                    <Tooltip title="The total amount of negative yield generated by the model">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl58"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].total_negative_pnl,
                            "pnl58",
                          ],
                          value2: [
                            stats[model_name_2].total_negative_pnl,
                            "pnl59",
                          ],
                          value3: [
                            stats[model_name_3].total_negative_pnl,
                            "pnl60",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].total_negative_pnl,
                              "pnl58",
                            ],
                            value2: [
                              stats[model_name_2].total_negative_pnl,
                              "pnl59",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].total_negative_pnl,
                                "pnl59",
                              ],
                              value2: [
                                stats[model_name_3].total_negative_pnl,
                                "pnl60",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].total_negative_pnl,
                                  "pnl58",
                                ],
                                value2: [
                                  stats[model_name_3].total_negative_pnl,
                                  "pnl60",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].total_negative_pnl + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl59"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].total_negative_pnl,
                            "pnl58",
                          ],
                          value2: [
                            stats[model_name_2].total_negative_pnl,
                            "pnl59",
                          ],
                          value3: [
                            stats[model_name_3].total_negative_pnl,
                            "pnl60",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].total_negative_pnl,
                              "pnl58",
                            ],
                            value2: [
                              stats[model_name_2].total_negative_pnl,
                              "pnl59",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].total_negative_pnl,
                                "pnl59",
                              ],
                              value2: [
                                stats[model_name_3].total_negative_pnl,
                                "pnl60",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].total_negative_pnl,
                                  "pnl58",
                                ],
                                value2: [
                                  stats[model_name_3].total_negative_pnl,
                                  "pnl60",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].total_negative_pnl + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl60"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].total_negative_pnl,
                            "pnl58",
                          ],
                          value2: [
                            stats[model_name_2].total_negative_pnl,
                            "pnl59",
                          ],
                          value3: [
                            stats[model_name_3].total_negative_pnl,
                            "pnl60",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValuesMin({
                            value1: [
                              stats[model_name_1].total_negative_pnl,
                              "pnl58",
                            ],
                            value2: [
                              stats[model_name_2].total_negative_pnl,
                              "pnl59",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValuesMin({
                              value1: [
                                stats[model_name_2].total_negative_pnl,
                                "pnl59",
                              ],
                              value2: [
                                stats[model_name_3].total_negative_pnl,
                                "pnl60",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValuesMin({
                                value1: [
                                  stats[model_name_1].total_negative_pnl,
                                  "pnl58",
                                ],
                                value2: [
                                  stats[model_name_3].total_negative_pnl,
                                  "pnl60",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].total_negative_pnl + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Average Daily PNL
                    <Tooltip title="Average daily PNL">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl61"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].average_daily_pnl,
                            "pnl61",
                          ],
                          value2: [
                            stats[model_name_2].average_daily_pnl,
                            "pnl62",
                          ],
                          value3: [
                            stats[model_name_3].average_daily_pnl,
                            "pnl63",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].average_daily_pnl,
                              "pnl61",
                            ],
                            value2: [
                              stats[model_name_2].average_daily_pnl,
                              "pnl62",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].average_daily_pnl,
                                "pnl62",
                              ],
                              value2: [
                                stats[model_name_3].average_daily_pnl,
                                "pnl63",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].average_daily_pnl,
                                  "pnl61",
                                ],
                                value2: [
                                  stats[model_name_3].average_daily_pnl,
                                  "pnl63",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1]
                      ? stats[model_name_1].average_daily_pnl + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl62"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].average_daily_pnl,
                            "pnl61",
                          ],
                          value2: [
                            stats[model_name_2].average_daily_pnl,
                            "pnl62",
                          ],
                          value3: [
                            stats[model_name_3].average_daily_pnl,
                            "pnl63",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].average_daily_pnl,
                              "pnl61",
                            ],
                            value2: [
                              stats[model_name_2].average_daily_pnl,
                              "pnl62",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].average_daily_pnl,
                                "pnl62",
                              ],
                              value2: [
                                stats[model_name_3].average_daily_pnl,
                                "pnl63",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].average_daily_pnl,
                                  "pnl61",
                                ],
                                value2: [
                                  stats[model_name_3].average_daily_pnl,
                                  "pnl63",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2]
                      ? stats[model_name_2].average_daily_pnl + "%"
                      : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl63"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [
                            stats[model_name_1].average_daily_pnl,
                            "pnl61",
                          ],
                          value2: [
                            stats[model_name_2].average_daily_pnl,
                            "pnl62",
                          ],
                          value3: [
                            stats[model_name_3].average_daily_pnl,
                            "pnl63",
                          ],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [
                              stats[model_name_1].average_daily_pnl,
                              "pnl61",
                            ],
                            value2: [
                              stats[model_name_2].average_daily_pnl,
                              "pnl62",
                            ],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [
                                stats[model_name_2].average_daily_pnl,
                                "pnl62",
                              ],
                              value2: [
                                stats[model_name_3].average_daily_pnl,
                                "pnl63",
                              ],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [
                                  stats[model_name_1].average_daily_pnl,
                                  "pnl61",
                                ],
                                value2: [
                                  stats[model_name_3].average_daily_pnl,
                                  "pnl63",
                                ],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3]
                      ? stats[model_name_3].average_daily_pnl + "%"
                      : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    R2 Score
                    <Tooltip title="A measurement representing the descriptive power of the model. The closer the R2 score is to 1 the better the model is">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl64"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].r2_score, "pnl64"],
                          value2: [stats[model_name_2].r2_score, "pnl65"],
                          value3: [stats[model_name_3].r2_score, "pnl66"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].r2_score, "pnl64"],
                            value2: [stats[model_name_2].r2_score, "pnl65"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].r2_score, "pnl65"],
                              value2: [stats[model_name_3].r2_score, "pnl66"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].r2_score, "pnl64"],
                                value2: [stats[model_name_3].r2_score, "pnl66"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].r2_score : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl65"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].r2_score, "pnl64"],
                          value2: [stats[model_name_2].r2_score, "pnl65"],
                          value3: [stats[model_name_3].r2_score, "pnl66"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].r2_score, "pnl64"],
                            value2: [stats[model_name_2].r2_score, "pnl65"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].r2_score, "pnl65"],
                              value2: [stats[model_name_3].r2_score, "pnl66"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].r2_score, "pnl64"],
                                value2: [stats[model_name_3].r2_score, "pnl66"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].r2_score : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl66"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].r2_score, "pnl64"],
                          value2: [stats[model_name_2].r2_score, "pnl65"],
                          value3: [stats[model_name_3].r2_score, "pnl66"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].r2_score, "pnl64"],
                            value2: [stats[model_name_2].r2_score, "pnl65"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].r2_score, "pnl65"],
                              value2: [stats[model_name_3].r2_score, "pnl66"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].r2_score, "pnl64"],
                                value2: [stats[model_name_3].r2_score, "pnl66"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3] ? stats[model_name_3].r2_score : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Sharpe
                    <Tooltip title="The ratio of annualised yield over standard deviation of yield that the model has experienced. The higher the Sharpe ratio the more consistent a model performance is">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl67"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].sharpe, "pnl67"],
                          value2: [stats[model_name_2].sharpe, "pnl68"],
                          value3: [stats[model_name_3].sharpe, "pnl69"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].sharpe, "pnl67"],
                            value2: [stats[model_name_2].sharpe, "pnl68"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].sharpe, "pnl68"],
                              value2: [stats[model_name_3].sharpe, "pnl69"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].sharpe, "pnl67"],
                                value2: [stats[model_name_3].sharpe, "pnl69"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].sharpe : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl68"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].sharpe, "pnl67"],
                          value2: [stats[model_name_2].sharpe, "pnl68"],
                          value3: [stats[model_name_3].sharpe, "pnl69"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].sharpe, "pnl67"],
                            value2: [stats[model_name_2].sharpe, "pnl68"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].sharpe, "pnl68"],
                              value2: [stats[model_name_3].sharpe, "pnl69"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].sharpe, "pnl67"],
                                value2: [stats[model_name_3].sharpe, "pnl69"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].sharpe : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl69"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].sharpe, "pnl67"],
                          value2: [stats[model_name_2].sharpe, "pnl68"],
                          value3: [stats[model_name_3].sharpe, "pnl69"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].sharpe, "pnl67"],
                            value2: [stats[model_name_2].sharpe, "pnl68"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].sharpe, "pnl68"],
                              value2: [stats[model_name_3].sharpe, "pnl69"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].sharpe, "pnl67"],
                                value2: [stats[model_name_3].sharpe, "pnl69"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3] ? stats[model_name_3].sharpe : null}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax for-th">
                    Sortino
                    <Tooltip title="The ratio of annualised yield over the negative standard deviation of yield that the model has experienced. The higher the Sortino ratio the less risky the model performance is">
                      <IconButton>
                        <BsFillInfoCircleFill />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl71"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].sortino, "pnl71"],
                          value2: [stats[model_name_2].sortino, "pnl72"],
                          value3: [stats[model_name_3].sortino, "pnl73"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].sortino, "pnl71"],
                            value2: [stats[model_name_2].sortino, "pnl72"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].sortino, "pnl72"],
                              value2: [stats[model_name_3].sortino, "pnl73"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].sortino, "pnl71"],
                                value2: [stats[model_name_3].sortino, "pnl73"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_1] ? stats[model_name_1].sortino : null}
                  </td>
                  <td
                    className="tg-0lax"
                    id={"pnl72"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].sortino, "pnl71"],
                          value2: [stats[model_name_2].sortino, "pnl72"],
                          value3: [stats[model_name_3].sortino, "pnl73"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].sortino, "pnl71"],
                            value2: [stats[model_name_2].sortino, "pnl72"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].sortino, "pnl72"],
                              value2: [stats[model_name_3].sortino, "pnl73"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].sortino, "pnl71"],
                                value2: [stats[model_name_3].sortino, "pnl73"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_2] ? stats[model_name_2].sortino : null}
                  </td>
                  <td
                    className="tg-0lax to-hide"
                    id={"pnl73"}
                    onChange={
                      stats[model_name_1] &&
                        stats[model_name_2] &&
                        stats[model_name_3]
                        ? changeColorOnValueBasis({
                          value1: [stats[model_name_1].sortino, "pnl71"],
                          value2: [stats[model_name_2].sortino, "pnl72"],
                          value3: [stats[model_name_3].sortino, "pnl73"],
                        })
                        : stats[model_name_1] && stats[model_name_2]
                          ? changeColorOnValueBasisTwoValues({
                            value1: [stats[model_name_1].sortino, "pnl71"],
                            value2: [stats[model_name_2].sortino, "pnl72"],
                          })
                          : stats[model_name_2] && stats[model_name_3]
                            ? changeColorOnValueBasisTwoValues({
                              value1: [stats[model_name_2].sortino, "pnl72"],
                              value2: [stats[model_name_3].sortino, "pnl73"],
                            })
                            : stats[model_name_1] && stats[model_name_3]
                              ? changeColorOnValueBasisTwoValues({
                                value1: [stats[model_name_1].sortino, "pnl71"],
                                value2: [stats[model_name_3].sortino, "pnl73"],
                              })
                              : null
                    }
                  >
                    {stats[model_name_3] ? stats[model_name_3].sortino : null}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareComponent;
