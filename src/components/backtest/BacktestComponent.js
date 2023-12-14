// THIS COMPONENT IS BEING USED
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import validator from 'validator';
import './Backtest.css';
import dayjs from 'dayjs';
import InDepthBacktest from '../models/inDepth/InDepthBacktest';
import TextField from '@mui/material/TextField';
import { useStateContext } from '../../ContextProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { database } from '../../firebase_config';
import { ref, onValue, set } from 'firebase/database';
import cryptoRandomString from 'crypto-random-string';
import RecentlyViewed from '../recentlyViewed/RecentlyViewed';
import CanvasjsSplineAreaChartWithRangeSelecetor from '../models/graphs/CanvasjsSplineAreaChartWithRangeSelecetor';
import CanvasjsDrawdownWithSliderRange from '../models/graphs/CanvasjsDrawdownWithSliderRange';
import CumulativePNL from '../models/cumulativePNL/CumulativePNL';
import GraphsTableBacktest from '../models/graphsTable/GraphsTableBacktest';
import { ThreeDots } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import DrawDown from '../models/drawDown/DrawDown';

const BacktestComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const now = dayjs();
  const disableBeforeUnixTimestamp = 1648780800;
  const [disableBefore, setDisableBefore] = useState(
    dayjs.unix(disableBeforeUnixTimestamp)
  );
  const [Flag, setFlag] = useState(null);

  const handleDateChangeCalender = (date) => {
    if (date > now || date < disableBefore) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
      const parsedDate = dayjs(date).toDate();
      const timestamp = parsedDate.getTime() / 1000;
      set_date_selected_for_backtest(timestamp);
    }
  };
  const handleDateChangeCalenderMobile = (date) => {
    if (date > now || date < disableBefore) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
      const parsedDate = dayjs(date).toDate();
      const timestamp = parsedDate.getTime() / 1000;
      set_date_selected_for_backtest_mobile(timestamp);
    }
  };
  // eslint-disable-next-line
  const [rows_cached, set_rows_cached] = useState([]);
  // eslint-disable-next-line
  const [coin_search_selection, set_coin_search_selection] = useState([]);
  // eslint-disable-next-line
  const [model_search_selection, set_model_search_selection] = useState([]);

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
  // eslint-disable-next-line
  const [rows, setRows] = useState([]);

  useEffect(() => {
    try {
      if (strategies == null && pnl_for_each_strategy == null) {
        return;
      } else {
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
            modelName: key.replace(/_/g, '-'),
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
            tpsl: '$186 / $740',

            totalpnl: pnl_for_each_strategy[key].total_pnl,
            pnlGraph: `${key}`,
          });
          index++;
        }
        if (data_for_rows.length !== 0) {
          setRows(data_for_rows);
          set_rows_cached(data_for_rows);
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [strategies]);

  useEffect(() => {
    try {
      if (topPerformerModels == null) {
        return;
      } else {
        if (
          props.model_name.includes('strategy') ||
          props.model_name.split('_').length === 3
        ) {
          fetch(
            'https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_strategies',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                'ngrok-skip-browser-warning': 'true',
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              var data_for_strategies = {};
              var model_names = [];
              var coin_names = [];
              var unique_coins = {};
              var index = 0;
              for (var i = 0; i < data['response'].length; i++) {
                model_names.push({
                  label: data['response'][i].strategy_name.replace(/_/g, '-'),
                  value: data['response'][i].time_horizon,
                  currency: data['response'][i].currency,
                });
                if (!unique_coins[data['response'][i].currency]) {
                  unique_coins[data['response'][i].currency] = 1;
                  coin_names.push({
                    label: data['response'][i].currency,
                  });
                }
                var dt = new Date(
                  parseInt(data['response'][i].forecast_time) * 1000
                ).toLocaleString();
                var year = dt.split('/')[2].split(',')[0];
                var month = dt.split('/')[0];
                if (month.length === 1) {
                  month = '0' + month;
                }
                var day = dt.split('/')[1];
                if (day.length === 1) {
                  day = '0' + day;
                }
                var hours = dt.split(', ')[1].split(':')[0];
                if (hours.length === 1) {
                  hours = '0' + hours;
                }
                var minutes = dt.split(':')[1];
                if (minutes.length === 1) {
                  minutes = '0' + minutes;
                }
                var curr_time_version = dt.split(' ')[2];
                if (curr_time_version === 'PM') {
                  hours = parseInt(hours) + 12;
                }
                var dt_str =
                  year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

                data_for_strategies[data['response'][i].strategy_name] = {
                  current_position: data['response'][i].current_position,
                  time_horizon: data['response'][i].time_horizon,
                  currency: data['response'][i].currency,
                  date_started: data['response'][i].date_started,
                  entry_price: data['response'][i].entry_price,
                  forecast_time: dt_str,
                  next_forecast: data['response'][i].next_forecast,
                  current_price: data['response'][i].current_price,
                  strategy_name: data['response'][i].strategy_name,
                  current_pnl: data['response'][i].current_pnl,
                  position_start_time: data['response'][i].position_start_time,
                };
                // eslint-disable-next-line
                index++;
              }
              if (JSON.stringify(data_for_strategies) !== '{}') {
                setStrategies(data_for_strategies);
              }
            })
            .catch((err) => console.log(err));
        } else {
          if (Object.keys(strategies_cache).length === 0) {
            fetch(
              'https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_strategies',
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                  'ngrok-skip-browser-warning': 'true',
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                var data_for_strategies = {};
                var model_names = [];
                var coin_names = [];
                var unique_coins = {};
                var index = 0;
                for (var i = 0; i < data['response'].length; i++) {
                  model_names.push({
                    label: data['response'][i].strategy_name.replace(/_/g, '-'),
                    value: data['response'][i].time_horizon,
                    currency: data['response'][i].currency,
                  });
                  if (!unique_coins[data['response'][i].currency]) {
                    unique_coins[data['response'][i].currency] = 1;
                    coin_names.push({
                      label: data['response'][i].currency,
                    });
                  }
                  var dt = new Date(
                    parseInt(data['response'][i].forecast_time) * 1000
                  ).toLocaleString();
                  var year = dt.split('/')[2].split(',')[0];
                  var month = dt.split('/')[0];
                  if (month.length === 1) {
                    month = '0' + month;
                  }
                  var day = dt.split('/')[1];
                  if (day.length === 1) {
                    day = '0' + day;
                  }
                  var hours = dt.split(', ')[1].split(':')[0];
                  if (hours.length === 1) {
                    hours = '0' + hours;
                  }
                  var minutes = dt.split(':')[1];
                  if (minutes.length === 1) {
                    minutes = '0' + minutes;
                  }
                  var curr_time_version = dt.split(' ')[2];
                  if (curr_time_version === 'PM') {
                    hours = parseInt(hours) + 12;
                  }
                  var dt_str =
                    year +
                    '-' +
                    month +
                    '-' +
                    day +
                    ' ' +
                    hours +
                    ':' +
                    minutes;

                  data_for_strategies[data['response'][i].strategy_name] = {
                    current_position: data['response'][i].current_position,
                    time_horizon: data['response'][i].time_horizon,
                    currency: data['response'][i].currency,
                    date_started: data['response'][i].date_started,
                    entry_price: data['response'][i].entry_price,
                    forecast_time: dt_str,

                    next_forecast: data['response'][i].next_forecast,
                    current_price: data['response'][i].current_price,
                    strategy_name: data['response'][i].strategy_name,
                    current_pnl: data['response'][i].current_pnl,
                    position_start_time:
                      data['response'][i].position_start_time,
                  };
                  // eslint-disable-next-line
                  index++;
                }
                if (JSON.stringify(data_for_strategies) !== '{}') {
                  setStrategies(data_for_strategies);
                  set_model_search_selection(model_names);
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
            setStrategies(strategies_cache['strategies']);

            set_coin_search_selection(coin_selection_cache['coin_names']);
            set_model_search_selection(model_selection_cache['model_names']);
          }
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [topPerformerModels]);

  useEffect(() => {
    try {
      if (Flag == null) {
        if (
          props.model_name.includes('strategy') ||
          props.model_name.split('_').length === 3
        ) {
          fetch('https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_stats', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              var model_names = {};
              for (var i = 0; i < data['response'].length; i++) {
                model_names[data['response'][i].strategy_name] = {
                  strategy_name: data['response'][i].strategy_name,
                  current_drawdown: data['response'][i].current_drawdown,
                  curr_drawdown_duration:
                    data['response'][i].curr_drawdown_duration,
                  average_drawdown: data['response'][i].average_drawdown,
                  average_drawdown_duration:
                    data['response'][i].average_drawdown_duration,
                  max_drawdown: data['response'][i].max_drawdown,
                  max_drawdown_duration:
                    data['response'][i].max_drawdown_duration,
                  r2_score: data['response'][i].r2_score,
                  sharpe: data['response'][i].sharpe,
                  sortino: data['response'][i].sortino,
                  total_pnl: data['response'][i].total_pnl,
                  total_positive_pnl: data['response'][i].total_positive_pnl,
                  total_negative_pnl: data['response'][i].total_negative_pnl,
                  total_wins: data['response'][i].total_wins,
                  total_losses: data['response'][i].total_losses,
                  consective_wins: data['response'][i].consective_wins,
                  consective_losses: data['response'][i].consective_losses,
                  win_percentage: data['response'][i].win_percentage,
                  loss_percentage: data['response'][i].loss_percentage,
                  pnl_sum_1: data['response'][i].pnl_sum_1,
                  pnl_sum_7: data['response'][i].pnl_sum_7,
                  pnl_sum_15: data['response'][i].pnl_sum_15,
                  pnl_sum_30: data['response'][i].pnl_sum_30,
                  pnl_sum_45: data['response'][i].pnl_sum_45,
                  pnl_sum_60: data['response'][i].pnl_sum_60,
                  average_daily_pnl: data['response'][i].average_daily_pnl,
                  win_loss_ratio: data['response'][i].win_loss_ratio,

                  rank: data['response'][i].rank,
                };
              }
              if (JSON.stringify(model_names) !== '{}') {
                const sorted = Object.keys(model_names)
                  .map((key) => {
                    return { ...model_names[key], key };
                  })
                  .sort((a, b) => b.total_pnl - a.total_pnl);
                setPnlForEachStrategy(model_names);

                setTopPerformersModels(sorted);
                setFlag(true);
              }
            })
            .catch((err) => console.log(err));
        } else {
          if (Object.keys(stats_cache).length === 0) {
            fetch('https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_stats', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                'ngrok-skip-browser-warning': 'true',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                var model_names = {};
                for (var i = 0; i < data['response'].length; i++) {
                  model_names[data['response'][i].strategy_name] = {
                    strategy_name: data['response'][i].strategy_name,
                    current_drawdown: data['response'][i].current_drawdown,
                    curr_drawdown_duration:
                      data['response'][i].curr_drawdown_duration,
                    average_drawdown: data['response'][i].average_drawdown,
                    average_drawdown_duration:
                      data['response'][i].average_drawdown_duration,
                    max_drawdown: data['response'][i].max_drawdown,
                    max_drawdown_duration:
                      data['response'][i].max_drawdown_duration,
                    r2_score: data['response'][i].r2_score,
                    sharpe: data['response'][i].sharpe,
                    sortino: data['response'][i].sortino,
                    total_pnl: data['response'][i].total_pnl,
                    total_positive_pnl: data['response'][i].total_positive_pnl,
                    total_negative_pnl: data['response'][i].total_negative_pnl,
                    total_wins: data['response'][i].total_wins,
                    total_losses: data['response'][i].total_losses,
                    consective_wins: data['response'][i].consective_wins,
                    consective_losses: data['response'][i].consective_losses,
                    win_percentage: data['response'][i].win_percentage,
                    loss_percentage: data['response'][i].loss_percentage,
                    pnl_sum_1: data['response'][i].pnl_sum_1,
                    pnl_sum_7: data['response'][i].pnl_sum_7,
                    pnl_sum_15: data['response'][i].pnl_sum_15,
                    pnl_sum_30: data['response'][i].pnl_sum_30,
                    pnl_sum_45: data['response'][i].pnl_sum_45,
                    pnl_sum_60: data['response'][i].pnl_sum_60,
                    average_daily_pnl: data['response'][i].average_daily_pnl,
                    win_loss_ratio: data['response'][i].win_loss_ratio,

                    rank: data['response'][i].rank,
                    alpha: data['response'][i].alpha,
                    beta: data['response'][i].beta,
                  };
                }
                if (JSON.stringify(model_names) !== '{}') {
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
            setTopPerformersModels(sorted_stats_cache['sorted_stats']);
            setPnlForEachStrategy(stats_cache['stats']);
            setFlag(true);
          }
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [Flag]);

  const location = useLocation();

  var model_name = '';
  var currency = '';
  var time_horizon2 = 'All';

  if (location.state) {
    model_name = location.state.model_name.replace(/_/g, '-');
    currency = location.state.currency;
    time_horizon2 = location.state.time_horizon;
  }
  // eslint-disable-next-line
  const [selectedItem, setSelectedItem] = useState(time_horizon2);
  // eslint-disable-next-line
  const [default_value_model, set_default_value_model] = useState({
    label: model_name,
  });
  // eslint-disable-next-line
  const [timeH, setTimeH] = useState(time_horizon2);
  // eslint-disable-next-line
  const [default_value_currency, set_default_value_currency] = useState({
    label: currency,
  });
  const [model_selected_for_backted, set_model_selected_for_backtest] =
    useState(model_name.replace(/-/g, '_'));
  const [selectedDate, setSelectedDate] = useState(null);
  const [date_selected_for_backtest, set_date_selected_for_backtest] =
    useState(null);
  const [
    take_profit_selected_for_backtest,
    set_take_profit_selected_for_backtest,
  ] = useState(100);
  const [stop_loss_selected_for_backtest, set_stop_loss_selected_for_backtest] =
    useState(100);
  const [fee_selected_for_backtest, set_fee_selected_for_backtest] =
    useState(0);

  const [
    date_selected_for_backtest_mobile,
    set_date_selected_for_backtest_mobile,
  ] = useState(null);
  const [
    take_profit_selected_for_backtest_mobile,
    set_take_profit_selected_for_backtest_mobile,
  ] = useState(100);
  const [
    stop_loss_selected_for_backtest_mobile,
    set_stop_loss_selected_for_backtest_mobile,
  ] = useState(100);
  const [
    fee_selected_for_backtest_mobile,
    set_fee_selected_for_backtest_mobile,
  ] = useState(0);

  const handleFeeChange = (event) => {
    set_fee_selected_for_backtest(event.target.value);
  };
  const handleFeeChangeMobile = (event) => {
    set_fee_selected_for_backtest_mobile(event.target.value);
  };
  const handleProfitChange = (event) => {
    set_take_profit_selected_for_backtest(event.target.value);
  };
  const handleProfitChangeMobile = (event) => {
    set_take_profit_selected_for_backtest_mobile(event.target.value);
  };
  const handleLossChange = (event) => {
    set_stop_loss_selected_for_backtest(event.target.value);
  };
  const handleLossChangeMobile = (event) => {
    set_stop_loss_selected_for_backtest_mobile(event.target.value);
  };
  const [backtest_table_name, set_backtest_table_name] = useState(null);
  const handleRunBacktestChange = () => {
    if (isButtonDisabled === false) {
      if (
        !date_selected_for_backtest ||
        !take_profit_selected_for_backtest ||
        !stop_loss_selected_for_backtest ||
        fee_selected_for_backtest.length === 0 ||
        !model_selected_for_backted
      ) {
        setIsButtonDisabled(false);

        Swal.fire({
          title: 'Kindly input all fields to run backtest',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
      } else {
        setIsButtonDisabled(true);

        const id = cryptoRandomString({ length: 10, type: 'alphanumeric' });
        set_backtest_table_name(id);
        var current_time = new Date();
        const timestamp = current_time.getTime();
        var check = true;
        if (
          take_profit_selected_for_backtest <= 0 ||
          take_profit_selected_for_backtest > 100
        ) {
          setIsButtonDisabled(false);

          check = false;
          Swal.fire({
            title: 'Take profit should be in range 0-100%',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
          });
        }
        if (
          !validator.isNumeric(take_profit_selected_for_backtest.toString())
        ) {
          check = false;
          setIsButtonDisabled(false);

          Swal.fire({
            title: 'Kindly input value in numbers for take profit',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
          });
        }
        if (
          stop_loss_selected_for_backtest <= 0 ||
          stop_loss_selected_for_backtest > 100
        ) {
          check = false;
          setIsButtonDisabled(false);

          Swal.fire({
            title: 'Stop loss should be in range 0-100%',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
          });
        }
        if (!validator.isNumeric(stop_loss_selected_for_backtest.toString())) {
          check = false;
          setIsButtonDisabled(false);

          Swal.fire({
            title: 'Kindly input value in numbers for stop profit',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
          });
        }
        if (fee_selected_for_backtest < 0 || fee_selected_for_backtest > 1) {
          check = false;
          setIsButtonDisabled(false);

          Swal.fire({
            title: 'Fee should be in range 0-1%',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
          });
        }
        if (!validator.isNumeric(fee_selected_for_backtest.toString())) {
          check = false;
          setIsButtonDisabled(false);

          Swal.fire({
            title: 'Kindly input value in numbers for fee',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
          });
        }
        if (check === true) {
          setIsLoading(true);

          set(ref(database, `backtest_queue/user_${id}`), {
            id: 'user_' + id,
            modelName: model_selected_for_backted,
            start_date: date_selected_for_backtest,
            end_date: '1677555199',
            take_profit: take_profit_selected_for_backtest,
            stop_loss: stop_loss_selected_for_backtest,
            transaction_fee: fee_selected_for_backtest,
            status: 0,
            current_time: timestamp,
          });

          set_flag_backtest_result(new Date());
        }
      }
    }
  };

  const handleRunBacktestChangeMobile = () => {
    if (
      !date_selected_for_backtest_mobile ||
      !take_profit_selected_for_backtest_mobile ||
      !stop_loss_selected_for_backtest_mobile ||
      fee_selected_for_backtest.length === 0 ||
      !model_selected_for_backted
    ) {
      Swal.fire({
        title: 'Kindly input all fields to run backtest',
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
    } else {
      setIsButtonDisabled(true);

      const id = cryptoRandomString({ length: 10, type: 'alphanumeric' });
      set_backtest_table_name(id);
      var current_time = new Date();
      const timestamp = current_time.getTime();
      var check = true;
      if (
        take_profit_selected_for_backtest_mobile < 0 ||
        take_profit_selected_for_backtest_mobile > 100
      ) {
        check = false;
        Swal.fire({
          title: 'Take profit should be in range 0-100%',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
      }
      if (
        !validator.isNumeric(
          take_profit_selected_for_backtest_mobile.toString()
        )
      ) {
        check = false;
        Swal.fire({
          title: 'Kindly input value in numbers for take profit',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
      }
      if (
        stop_loss_selected_for_backtest_mobile < 0 ||
        stop_loss_selected_for_backtest_mobile > 100
      ) {
        check = false;

        Swal.fire({
          title: 'Stop loss should be in range 0-100%',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
      }
      if (
        !validator.isNumeric(stop_loss_selected_for_backtest_mobile.toString())
      ) {
        check = false;
        Swal.fire({
          title: 'Kindly input value in numbers for stop loss',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
      }
      if (
        fee_selected_for_backtest_mobile < 0 ||
        fee_selected_for_backtest_mobile > 1
      ) {
        check = false;

        Swal.fire({
          title: 'Fee should be in range 0-1%',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
      }
      if (!validator.isNumeric(fee_selected_for_backtest_mobile.toString())) {
        check = false;
        Swal.fire({
          title: 'Kindly input value in numbers for fee',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
      }
      if (check === true) {
        setIsLoading(true);

        set(ref(database, `backtest_queue/user_${id}`), {
          id: 'user_' + id,
          modelName: model_selected_for_backted,
          start_date: date_selected_for_backtest_mobile,
          end_date: '1677555199',
          take_profit: take_profit_selected_for_backtest_mobile,
          stop_loss: stop_loss_selected_for_backtest_mobile,
          transaction_fee: fee_selected_for_backtest_mobile,
          status: 0,
          current_time: timestamp,
        });
        set_flag_backtest_result(new Date());
      }
    }
  };
  const [flag_for_backtest_result, set_flag_backtest_result] = useState(null);
  const [
    model_name_for_result_backtest_result,
    set_model_name_for_result_backtest_result,
  ] = useState(null);
  const [
    model_name_for_result_backtest_result_stats,
    set_model_name_for_result_backtest_result_stats,
  ] = useState(null);

  useEffect(() => {
    if (props.model_name) {
      set_model_name_for_result_backtest_result(props.model_name);
      set_model_name_for_result_backtest_result_stats(props.model_name);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    try {
      if (flag_for_backtest_result == null) {
        return;
      } else {
        setTimeout(() => {
          const starCountRef = ref(
            database,
            'backtest_queue/user_' + backtest_table_name
          );
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
              set_flag_backtest_result(new Date());
            } else {
              if (data.status === 1) {
                set_model_name_for_result_backtest_result(
                  'user_' + backtest_table_name
                );
                set_model_name_for_result_backtest_result_stats(
                  'user_' + backtest_table_name + '_stats'
                );
                Swal.fire({
                  title: 'Backtest is successful',
                  icon: 'success',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                });
                setIsLoading(false);
                setIsButtonDisabled(false);
              } else if (data.status === 2) {
                Swal.fire({
                  title: 'Backtest is not successful',
                  icon: 'error',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                });
                setIsLoading(false);
                setIsButtonDisabled(false);
              } else {
                set_flag_backtest_result(new Date());
              }
            }
          });
        }, 1000);
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [flag_for_backtest_result]);

  useEffect(() => {
    try {
      if (strategies == null) {
        return;
      } else {
        if (model_selected_for_backted) {
          const model = model_selected_for_backted;
          const dateStr = strategies[model].date_started;
          const unixTimestamp = Math.floor(new Date(dateStr).getTime() / 1000);

          setDisableBefore(dayjs.unix(unixTimestamp));
          setSelectedDate(dayjs.unix(unixTimestamp));
          set_date_selected_for_backtest(unixTimestamp);
          set_date_selected_for_backtest_mobile(unixTimestamp);
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    if (strategies == null) {
      return;
    } else {
      if (model_selected_for_backted) {
        const model = model_selected_for_backted;
        const dateStr = strategies[model].date_started;
        const unixTimestamp = Math.floor(new Date(dateStr).getTime() / 1000);

        setDisableBefore(dayjs.unix(unixTimestamp));
        setSelectedDate(dayjs.unix(unixTimestamp));
        set_date_selected_for_backtest(unixTimestamp);
        set_date_selected_for_backtest_mobile(unixTimestamp);
      }
    }
  }, [strategies, model_selected_for_backted]);
  const [model_name_check, set_model_name_check] = useState(null);
  var name = location.pathname.split('/')[1];
  if (name !== model_name_check) {
    set_model_name_check(name);
  }
  useEffect(() => {
    try {
      if (strategies == null) {
        return;
      } else {
        var name = location.pathname.split('/')[1];
        if (!name.includes('backtest')) {
          set_default_value_model({ label: name });
          set_default_value_currency({
            label: strategies[name.replace(/-/g, '_')].currency,
          });
          setSelectedItem(strategies[name.replace(/-/g, '_')].time_horizon);
          setTimeH(strategies[name.replace(/-/g, '_')].time_horizon);

          const dateStr = strategies[name.replace(/-/g, '_')].date_started;
          const unixTimestamp = Math.floor(new Date(dateStr).getTime() / 1000);

          set_model_selected_for_backtest(name.replace(/-/g, '_'));
          setDisableBefore(dayjs.unix(unixTimestamp));
          setSelectedDate(dayjs.unix(unixTimestamp));
          set_date_selected_for_backtest(unixTimestamp);

          set_date_selected_for_backtest_mobile(unixTimestamp);
          set_model_name_for_result_backtest_result(name.replace(/-/g, '_'));
          set_model_name_for_result_backtest_result_stats(
            name.replace(/-/g, '_')
          );
        } else {
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [strategies, model_name_check]);

  return (
    <div>
      <div className="back-test models-page-backtest">
        {props.model_name.includes('strategy') ||
        props.model_name.split('_').length === 3 ? null : (
          <div className="container">
            <h1>Backtest</h1>
            <p className="backtest-description">
              To conduct a personalized backtest, begin by choosing a strategy
              through either the time horizon and currencies filter or by
              selecting from the Strategies dropdown menu. Afterwards, adjust
              the backtest inputs to fit your preferences, including the start
              date, which must not be earlier than the model's Start date
              (default value). Additionally, set the take profit and stop loss
              values within a range of 0 to 100, and specify a fee for each
              transaction with a value between 0 and 1.
            </p>

            {/* THIS IS FOR WEB */}
            <div className="backtest-filters backtest-for-web this-is-for-models-page">
              <div className="date-picker flex-display">
                <h3>Start Date:</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label=""
                    value={selectedDate}
                    onChange={handleDateChangeCalender}
                    minDate={disableBefore}
                    maxDate={now}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          selectedDate !== null &&
                          (selectedDate < now || selectedDate > disableBefore)
                        }
                        helperText={
                          selectedDate !== null &&
                          (selectedDate < now || selectedDate > disableBefore)
                            ? 'Invalid date'
                            : ''
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="profit-input flex-display">
                <h3>Take Profit:</h3>
                <TextField
                  id="profit"
                  placeholder="0-100%"
                  variant="outlined"
                  value={take_profit_selected_for_backtest}
                  onChange={handleProfitChange}
                  sx={{
                    width: 70,
                  }}
                />
              </div>
              <div className="loss-input flex-display">
                <h3>Stop Loss:</h3>
                <TextField
                  id="loss"
                  placeholder="0-100%"
                  variant="outlined"
                  value={stop_loss_selected_for_backtest}
                  onChange={handleLossChange}
                  sx={{
                    width: 70,
                  }}
                />
              </div>
              <div className="loss-input flex-display">
                <h3>Fee:</h3>
                <TextField
                  id="fee"
                  placeholder="0-1%"
                  variant="outlined"
                  value={fee_selected_for_backtest}
                  onChange={handleFeeChange}
                  sx={{
                    width: 70,
                  }}
                />
              </div>

              <div className="fee-input flex-display">
                <h3>Stop Time:</h3>
                <TextField
                  id="fee"
                  placeholder="0-1%"
                  variant="outlined"
                  value={fee_selected_for_backtest}
                  onChange={handleFeeChange}
                  sx={{
                    width: 70,
                  }}
                />
              </div>

              <div
                className="btn-div-backtest"
                onClick={handleRunBacktestChange}
              >
                <button
                  className="btn-contact-backtest"
                  disabled={isButtonDisabled}
                  style={{ pointerEvents: isButtonDisabled ? 'none' : 'auto' }}
                >
                  Run Backtest
                </button>
              </div>
            </div>

            {/* THIS IS FOR MOBILE  */}
            <div className="backtest-filters backtest-for-mobile">
              <div className="sec-1 flex-display justify-content">
                <div className="date-picker flex-display">
                  <h3>Start Date:</h3>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label=""
                      value={selectedDate}
                      onChange={handleDateChangeCalenderMobile}
                      minDate={disableBefore}
                      maxDate={now}
                      sx={{
                        width: 130,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={
                            selectedDate !== null &&
                            (selectedDate < now || selectedDate > disableBefore)
                          }
                          helperText={
                            selectedDate !== null &&
                            (selectedDate < now || selectedDate > disableBefore)
                              ? 'Invalid date'
                              : ''
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="profit-input flex-display">
                  <h3>Take Profit:</h3>
                  <TextField
                    id="profit_mobile"
                    placeholder="0-100%"
                    variant="outlined"
                    value={take_profit_selected_for_backtest_mobile}
                    onChange={handleProfitChangeMobile}
                    sx={{
                      width: 75,
                    }}
                  />
                </div>
              </div>

              <div className="sec-2 flex-display justify-content">
                <div className="loss-input flex-display">
                  <h3>Stop Loss:</h3>
                  <TextField
                    id="profit_loss"
                    placeholder="0-100%"
                    variant="outlined"
                    value={stop_loss_selected_for_backtest_mobile}
                    onChange={handleLossChangeMobile}
                    sx={{
                      width: 65,
                    }}
                  />
                </div>
                <div className="loss-input flex-display">
                  <h3>Fee:</h3>
                  <TextField
                    id="outlined-basic"
                    placeholder="0-1%"
                    variant="outlined"
                    value={fee_selected_for_backtest_mobile}
                    onChange={handleFeeChangeMobile}
                    sx={{
                      width: 65,
                    }}
                  />
                </div>

                <div className="fee-input flex-display">
                  <h3>Stop Time:</h3>
                  <TextField
                    id="outlined-basic"
                    placeholder="0-1%"
                    variant="outlined"
                    value={fee_selected_for_backtest_mobile}
                    onChange={handleFeeChangeMobile}
                    sx={{
                      width: 65,
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="backtest-btn-for-mobile"
              onClick={handleRunBacktestChangeMobile}
            >
              <button
                className="btn-contact-backtest-mobile"
                disabled={isButtonDisabled}
                style={{ pointerEvents: isButtonDisabled ? 'none' : 'auto' }}
              >
                Run Backtest
              </button>
            </div>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="container loader-container">
          <ThreeDots
            className="backtest-loader"
            color="#fddd4e"
            height={80}
            width={80}
          />
        </div>
      ) : (
        <div>
          {model_name_for_result_backtest_result ? (
            <CumulativePNL model_name={model_name_for_result_backtest_result} />
          ) : null}
          {model_name_for_result_backtest_result ? (
            <CanvasjsSplineAreaChartWithRangeSelecetor
              model_name={model_name_for_result_backtest_result}
            />
          ) : null}
          {model_name_for_result_backtest_result ? (
            <InDepthBacktest
              model_name={model_name_for_result_backtest_result}
              model_name_stats={model_name_for_result_backtest_result_stats}
            />
          ) : null}

          {model_name_for_result_backtest_result ? (
            <DrawDown model_name={model_name_for_result_backtest_result} />
          ) : null}

          {model_name_for_result_backtest_result ? (
            <CanvasjsDrawdownWithSliderRange
              model_name={model_name_for_result_backtest_result}
            />
          ) : null}
          {model_name_for_result_backtest_result ? (
            <GraphsTableBacktest
              model_name={model_name_for_result_backtest_result_stats}
            />
          ) : null}
          {(props.model_name.includes('strategy') && props.Flag !== 'True') ||
          (props.model_name.split('_').length === 3 &&
            props.Flag !== 'True') ? (
            <RecentlyViewed />
          ) : (
            <div className="container"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default BacktestComponent;
