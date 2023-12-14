// THIS COMPONENT IS BEING USED
import React from 'react';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../../ContextProvider';
import IconButton from '@mui/material/IconButton';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Tooltip } from '@mui/material';

const WinLossTableBacktest = (props) => {
  const [stats, setStats] = useState({});
  const { stats_cache, Set_stats_cache, link } = useStateContext();

  useEffect(() => {
    try {
      if (props.model_name.includes('stats')) {
        try {
          fetch(link + '/get_stats_backtest/' + props.model_name, {
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
                model_names[props.model_name] = {
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
                setStats(model_names);
              }
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log('Error occured');
        }
      } else if (
        props.model_name.includes('strategy') ||
        props.model_name.split('_').length === 3
      ) {
        try {
          fetch(link + '/get/live_stats', {
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
                var name = data['response'][i].strategy_name;
                if (props.model_name === name) {
                  model_names[props.model_name] = {
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
              }
              if (JSON.stringify(model_names) !== '{}') {
                setStats(model_names);
              }
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log('Error occured');
        }
      } else {
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
                  var name = data['response'][i].strategy_name;
                  if (props.model_name === name) {
                    model_names[props.model_name] = {
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
                      total_positive_pnl:
                        data['response'][i].total_positive_pnl,
                      total_negative_pnl:
                        data['response'][i].total_negative_pnl,
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
                }
                if (JSON.stringify(model_names) !== '{}') {
                  setStats(model_names);
                  Set_stats_cache({ stats: model_names });
                }
              })
              .catch((err) => console.log(err));
          } else {
            setStats(stats_cache['stats']);
          }
        } catch (error) {
          console.log('Error occured');
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [props.model_name]);
  const forBgColorRed = (value, id) => {
    document
      .getElementById(`${id}`)
      .setAttribute('style', 'color: #ff2e2e !important');
  };
  const forBgColorGreen = (value, id) => {
    document
      .getElementById(`${id}`)
      .setAttribute('style', 'color: #16c784 !important');
  };
  const forBgColorWinLossPercentage = (value, id) => {
    if (value <= 50) {
      document
        .getElementById(`${id}`)
        .setAttribute('style', 'color: #ff2e2e !important');
    } else {
      document
        .getElementById(`${id}`)
        .setAttribute('style', 'color: #16c784 !important');
    }
  };
  const forBgColorWinLossRatio = (value, id) => {
    if (value > 1) {
      document
        .getElementById(`${id}`)
        .setAttribute('style', 'color: #16c784 !important');
    } else {
      document
        .getElementById(`${id}`)
        .setAttribute('style', 'color: #ff2e2e !important');
    }
  };
  return (
    <div className="table-card for-margin">
      <div className="table-card-head">
        <h3>Win/Loss</h3>
      </div>
      <div className="table-card-body">
        <table className="for-table">
          <tr className="for-table-row">
            <th className="for-table-head">
              Total Wins
              <Tooltip title="The total number of wins the model has experienced">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="wins"
              onChange={
                stats[props.model_name]
                  ? forBgColorGreen(stats[props.model_name].total_wins, 'wins')
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].total_wins
                : null}
            </td>
            <th className="for-table-head">
              Total Losses
              <Tooltip title="The total number of losses the model has experienced">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="losses"
              onChange={
                stats[props.model_name]
                  ? forBgColorRed(stats[props.model_name].total_wins, 'losses')
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].total_losses
                : null}
            </td>
          </tr>
          <tr className="for-table-row">
            <th className="for-table-head">
              Consecutive Wins
              <Tooltip title="The maximum number of sequential wins the model has experienced">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="wins3"
              onChange={
                stats[props.model_name]
                  ? forBgColorGreen(
                      stats[props.model_name].consective_wins,
                      'wins3'
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].consective_wins
                : null}
            </td>
            <th className="for-table-head">
              Consecutive Losses
              <Tooltip title="The maximum number of sequential losses the model has experienced">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="losses2"
              onChange={
                stats[props.model_name]
                  ? forBgColorRed(
                      stats[props.model_name].consective_losses,
                      'losses2'
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].consective_losses
                : null}{' '}
            </td>
          </tr>
          <tr className="for-table-row">
            <th className="for-table-head">
              Win Percentage
              <Tooltip title="The percentage number of wins the model has experienced">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="wins_percentage"
              onChange={
                stats[props.model_name]
                  ? forBgColorWinLossPercentage(
                      stats[props.model_name].win_percentage,
                      'wins_percentage'
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].win_percentage
                : null}
              {'%'}
            </td>
            <th className="for-table-head">
              Win/Loss Ratio
              <Tooltip title="The ratio of the win size vs the loss size. Above 1 means the model wins more than it loses on average">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td
              className="for-table-data"
              id="wins_loss_ratio"
              onChange={
                stats[props.model_name]
                  ? forBgColorWinLossRatio(
                      stats[props.model_name].total_wins,
                      'wins_loss_ratio'
                    )
                  : null
              }
            >
              {stats[props.model_name]
                ? stats[props.model_name].win_loss_ratio
                : null}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default WinLossTableBacktest;
