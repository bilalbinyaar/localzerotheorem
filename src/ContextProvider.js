import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  memo,
} from "react";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { set_day_mode, set_night_mode } from "./store";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  // const store = configureStore({
  //   reducer: mySlice.reducer,
  // });
  // const myValue = useSelector((state) => state.mySlice.myValue);

  // Dark Light Mode
  const default_theme = useSelector((state) => state.theme);
  const default_login = useSelector((state) => state.loginFlag);
  // console.log("Got this state bro -->", default_login);
  const dispatch = useDispatch();

  // console.log("Value of redux state -->", default_theme.theme);
  const [theme, setTheme] = useState(default_theme.theme);
  const [authCheckLogin, setAuthCheckLogin] = useState(false);
  const [authCheckLoginInvestor, setAuthCheckLoginInvestor] = useState(
    default_login.loginFlag
  );

  const [uid, setUid] = useState(null);
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
      handleDayModeTheme();
      handleiamClick();
    } else {
      setTheme("dark-theme");
      handleNightModeTheme();
      handleiamClick();
    }
  };

  const handleNightModeTheme = () => {
    dispatch(set_night_mode());
  };
  const handleDayModeTheme = () => {
    dispatch(set_day_mode());
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [iamClick, setiamClick] = useState(false);
  const handleiamClick = () => setiamClick(!iamClick);
  // Dark Light Mode

  // Highlights ON/OFF
  const [checked, setChecked] = useState(true);
  const toggleChecked = () => setChecked((value) => !value);
  // Highlights ON/OFF

  // Currency Search Bar Filter
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  // Currency Search Bar Filter

  // Model Search Bar Filter
  const [filteredDataModel, setFilteredDataModel] = useState([]);
  const [wordEnteredModel, setWordEnteredModel] = useState("");
  // Model Search Bar Filter

  // Login
  const adminUserMain = {
    passwordMain: "neurog",
    userMain: "admin@zerotheorem.com",
    investorMain: "investor@zerotheorem.com",
    investorSecondary: "neurog@zerotheorem.com",
    investorPassword: "neuroglia",
  };
  const [userMain, setUserMain] = useState({ name: "", password: "" });
  const [errorMain, setErrorMain] = useState("");

  const LoginMain = (detailsMain) => {
    // console.log(details);

    if (detailsMain.passwordMain === adminUserMain.passwordMain) {
      // console.log("Logged In");
      setUserMain({
        name: detailsMain.name,
        email: detailsMain.email,
      });
    } else {
      // console.log("Invalid Details");
      setErrorMain("Invalid Details!");
    }
  };

  const LogoutMain = () => {
    setUserMain({ passwordMain: "" });
  };
  // Login End

  // SideBar Navigation
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const [showThreeTwo, setShowThreeTwo] = useState(false);
  const [showFour, setShowFour] = useState(false);
  const [showFive, setShowFive] = useState(false);
  const [showSix, setShowSix] = useState(false);
  const [showSeven, setShowSeven] = useState(false);
  const [showSubOne, setShowSubOne] = useState(false);
  const [showSubTwo, setShowSubTwo] = useState(false);
  const [showSubThree, setShowSubThree] = useState(false);
  const [showSubFour, setShowSubFour] = useState(false);

  // SideBar Navigation

  const [sorted_stats_cache, set_sorted_stats_cache] = useState({});
  const [strategies_cache, set_strategies_cache] = useState({});
  const [stats_cache, set_stats_cache] = useState({});
  const [forecast_spline_graph_cache, set_forecast_spline_graph_cache] =
    useState({});

  const [straight_spline_graph_cache, set_straight_spline_graph_cache] =
    useState({});
  const [rows_grid_cache, set_rows_grid_cache] = useState({});
  const [spline_graph_cache, set_spline_graph_cache] = useState({});
  const [negative_graph_cache, set_negative_graph_cache] = useState({});
  const [drawdown_graph_cache, set_drawdown_graph_cache] = useState({});
  const [drawdown_canvasjs_graph_cache, set_drawdown_canvasjs_graph_cache] =
    useState({});

  const [coin_selection_cache, set_coin_selection_cache] = useState({});
  const [model_selection_cache, set_model_selection_cache] = useState({});
  const [spline_graph_cum_cache, set_spline_graph_cum_cache] = useState({});
  const [negative_canvasjs_graph_cache, set_negative_canvasjs_graph_cache] =
    useState({});
  const [
    drawdown_negative_canvasjs_graph_cache,
    set_drawdown_negative_canvasjs_graph_cache,
  ] = useState({});
  const [
    forecastSpline_canvasjs_graph_cache,
    set_forecastSpline_canvasjs_graph_cache,
  ] = useState({});
  const [individual_pnl_graph_cache, set_individual_pnl_graph_cache] = useState(
    {}
  );
  const [tv_drawdown_cache, set_tv_drawdown_cache] = useState({});
  const [
    individual_pnl_canvasjs_graph_cache,
    set_individual_pnl_canvasjs_graph_cache,
  ] = useState({});
  const [position_stats_cache, set_position_stats_cache] = useState({});
  const Set_position_stats_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let stats = Object.assign(position_stats_cache, new_data);
    set_position_stats_cache(stats);
    // console.log("My updated data in cache -->", obj);
  };

  const Set_tv_drawdown_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let stats = Object.assign(tv_drawdown_cache, new_data);
    set_tv_drawdown_cache(stats);
    // console.log("My updated data in cache -->", obj);
  };
  const Set_sorted_stats_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj = Object.assign(sorted_stats_cache, new_data);
    set_sorted_stats_cache(obj);
    // console.log("My updated data in cache -->", obj);
  };
  const Set_strategies_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj2 = Object.assign(strategies_cache, new_data);
    set_strategies_cache(obj2);
    // console.log("My updated data in cache -->", obj2);
  };
  const Set_stats_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj3 = Object.assign(stats_cache, new_data);
    set_stats_cache(obj3);
    // console.log("My updated data in cache -->", obj3);
  };

  const Set_forecast_spline_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj4 = Object.assign(forecast_spline_graph_cache, new_data);
    set_forecast_spline_graph_cache(obj4);
    // console.log("My updated data in cache -->", obj4);
  };

  const Set_straight_spline_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj5 = Object.assign(straight_spline_graph_cache, new_data);
    set_straight_spline_graph_cache(obj5);
    // console.log("My updated data in cache -->", straight_spline_graph_cache);
  };
  const Set_rows_grid_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj6 = Object.assign(rows_grid_cache, new_data);
    set_rows_grid_cache(obj6);
    // console.log("My updated data in cache -->", obj6);
  };
  const Set_spline_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj7 = Object.assign(spline_graph_cache, new_data);
    set_spline_graph_cache(obj7);
    // console.log("My updated data in cache -->", obj7);
  };
  const Set_negative_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj8 = Object.assign(negative_graph_cache, new_data);
    set_negative_graph_cache(obj8);
    // console.log("My updated data in cache -->", obj8);
  };

  const Set_negative_canvasjs_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj33 = Object.assign(negative_canvasjs_graph_cache, new_data);
    set_negative_canvasjs_graph_cache(obj33);
    // console.log("My updated data in cache -->", obj8);
  };
  const Set_drawdown_negative_canvasjs_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj55 = Object.assign(drawdown_negative_canvasjs_graph_cache, new_data);
    set_drawdown_negative_canvasjs_graph_cache(obj55);
    // console.log("My updated data in cache -->", obj8);
  };
  const Set_forecastSpline_canvasjs_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj44 = Object.assign(forecastSpline_canvasjs_graph_cache, new_data);
    set_forecastSpline_canvasjs_graph_cache(obj44);
    // console.log("My updated data in cache -->", obj8);
  };

  const Set_individual_pnl_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj9 = Object.assign(individual_pnl_graph_cache, new_data);
    set_individual_pnl_graph_cache(obj9);
    // console.log("My updated data in cache -->", obj9);
  };
  const Set_individual_pnl_canvasjs_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj99 = Object.assign(individual_pnl_canvasjs_graph_cache, new_data);
    set_individual_pnl_canvasjs_graph_cache(obj99);
    // console.log("My updated data in cache -->", obj9);
  };
  const Set_drawdown_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj10 = Object.assign(drawdown_graph_cache, new_data);
    set_drawdown_graph_cache(obj10);
    // console.log("My updated data in cache -->", obj10);
  };
  const Set_coin_search_selection_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj11 = Object.assign(coin_selection_cache, new_data);
    set_coin_selection_cache(obj11);
    // console.log("My updated data in cache -->", obj11);
  };

  const Set_model_search_selection_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj12 = Object.assign(model_selection_cache, new_data);
    set_model_selection_cache(obj12);
    // console.log("My updated data in cache -->", obj12);
  };
  const Set_drawdown_canvasjs_graph_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj13 = Object.assign(drawdown_canvasjs_graph_cache, new_data);
    set_drawdown_canvasjs_graph_cache(obj13);
    // console.log("My updated data in cache -->", obj12);
  };
  const Set_spline_graph_cum_cache = (new_data) => {
    // const updated_data = [...cache, new_data];
    let obj29 = Object.assign(spline_graph_cum_cache, new_data);
    set_spline_graph_cum_cache(obj29);
    // console.log("My updated data in cache -->", obj12);
  };
  // PRELOADER
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 1000);
  }
  const [checkLoginMain, setCheckLoginMain] = useState(false);
  // PRELOADER

  return (
    <StateContext.Provider
      value={{
        checkLoginMain,
        setCheckLoginMain,
        toggleTheme,
        iamClick,
        theme,
        setTheme,
        checked,
        toggleChecked,
        filteredData,
        setFilteredData,
        wordEntered,
        setWordEntered,
        filteredDataModel,
        setFilteredDataModel,
        wordEnteredModel,
        setWordEnteredModel,
        adminUserMain,
        LoginMain,
        userMain,
        setUserMain,
        errorMain,
        setErrorMain,
        LogoutMain,
        showOne,
        setShowOne,
        showTwo,
        setShowTwo,
        showThree,
        showThreeTwo,
        setShowThree,
        setShowThreeTwo,
        showFour,
        setShowFour,
        showFive,
        setShowFive,
        showSix,
        showSeven,
        setShowSeven,
        setShowSix,
        showSubOne,
        setShowSubOne,
        showSubTwo,
        setShowSubTwo,
        showSubThree,
        setShowSubThree,
        showSubFour,
        setShowSubFour,
        stats_cache,
        strategies_cache,
        sorted_stats_cache,
        Set_stats_cache,
        Set_strategies_cache,
        Set_sorted_stats_cache,
        forecast_spline_graph_cache,
        Set_forecast_spline_graph_cache,
        straight_spline_graph_cache,
        Set_straight_spline_graph_cache,
        rows_grid_cache,
        Set_rows_grid_cache,
        loading,
        spline_graph_cache,
        Set_spline_graph_cache,
        negative_graph_cache,
        Set_negative_graph_cache,
        individual_pnl_graph_cache,
        Set_individual_pnl_graph_cache,
        drawdown_graph_cache,
        Set_drawdown_graph_cache,
        coin_selection_cache,
        Set_coin_search_selection_cache,
        model_selection_cache,
        Set_model_search_selection_cache,
        negative_canvasjs_graph_cache,
        Set_negative_canvasjs_graph_cache,
        forecastSpline_canvasjs_graph_cache,
        Set_forecastSpline_canvasjs_graph_cache,
        drawdown_canvasjs_graph_cache,
        Set_drawdown_canvasjs_graph_cache,
        individual_pnl_canvasjs_graph_cache,
        Set_individual_pnl_canvasjs_graph_cache,
        drawdown_negative_canvasjs_graph_cache,
        Set_drawdown_negative_canvasjs_graph_cache,
        position_stats_cache,
        Set_position_stats_cache,
        spline_graph_cum_cache,
        Set_spline_graph_cum_cache,
        tv_drawdown_cache,
        Set_tv_drawdown_cache,
        // authCheck,
        // setAuthCheck,
        authCheckLogin,
        setAuthCheckLogin,
        uid,
        setUid,
        authCheckLoginInvestor,
        setAuthCheckLoginInvestor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
