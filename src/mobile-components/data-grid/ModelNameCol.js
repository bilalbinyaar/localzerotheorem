import React, { useEffect, useState } from 'react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { useStateContext } from '../../ContextProvider';
import { BiLinkExternal } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const ModelNameCol = (props) => {
  // TOTAL PNL COLORS

  const {
    stats_cache,
    strategies_cache,
    sorted_stats_cache,
    Set_strategies_cache,
    Set_sorted_stats_cache,
    Set_stats_cache,

    Set_coin_search_selection_cache,

    Set_model_search_selection_cache,
    link,
  } = useStateContext();

  const [topPerformerModels, setTopPerformersModels] = useState([]);
  useEffect(() => {
    try {
      if (Object.keys(stats_cache).length === 0) {
        fetch(link + '/get_stats', {
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
              setTopPerformersModels(sorted);
              Set_stats_cache({ stats: model_names });

              Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else {
        setTopPerformersModels(sorted_stats_cache['sorted_stats']);
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const [strategies, setStrategies] = useState({});

  useEffect(() => {
    try {
      if (Object.keys(strategies_cache).length === 0) {
        fetch(link + '/get_strategies', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
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
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [topPerformerModels]);

  return (
    <div className="forecasts-model-name">
      <div className="forecasts-model-name-icon-div">
        {/* {props.value[2].replace(/_/g, "-")} */}
        <Link to={props.value[2].replace(/_/g, '-')}>
          <h3>{props.value[2].replace(/_/g, '-')} </h3>
        </Link>
        <BiLinkExternal className="model-link-icon" />
      </div>
      <div className="model-details-left-body for-forecasts-card">
        <Tooltip title="Time Horizon">
          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
            <p>{props.value[0]}</p>
          </div>
        </Tooltip>
        <Tooltip title="Currency">
          <div className="model-details-left-body-stats date for-forecast-card-details">
            <p className="para-margin">{props.value[1]}</p>
          </div>
        </Tooltip>
        <div>
          {props.value[3] === 'Short' ? (
            <div className="bg-short">
              <p>Short</p>
            </div>
          ) : (
            <div className="bg-long">
              <p>Long</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelNameCol;
