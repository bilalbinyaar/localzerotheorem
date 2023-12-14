// THIS COMPONENT IS BEING USED
import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../../ContextProvider';
import IconButton from '@mui/material/IconButton';

const PerformanceTableBacktest = (props) => {
  const [stats, setStats] = useState({});
  const { stats_cache, Set_stats_cache, link } = useStateContext();
  useEffect(() => {
    try {
      if (props.model_name.includes('stats')) {
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

                alpha: data['response'][i].alpha,
                beta: data['response'][i].beta,
                rank: data['response'][i].rank,
              };
            }
            if (JSON.stringify(model_names) !== '{}') {
              setStats(model_names);
            }
          })
          .catch((err) => console.log(err));
      } else if (
        props.model_name.includes('strategy') ||
        props.model_name.split('_').length === 3
      ) {
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
                  alpha: data['response'][i].alpha,
                  beta: data['response'][i].beta,
                  rank: data['response'][i].rank,
                };
              }
            }
            if (JSON.stringify(model_names) !== '{}') {
              setStats(model_names);
            }
          })
          .catch((err) => console.log(err));
      } else {
        if (Object.keys(stats_cache).length === 0) {
          try {
            fetch(link + '/get_stats', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                'ngrok-skip-browser-warning': 'true',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                // console.log(data["response"].length);
                var model_names = {};
                for (var i = 0; i < data['response'].length; i++) {
                  console.log('Stats', data['response']);
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
                  Set_stats_cache({ stats: model_names });
                }
              })
              .catch((err) => console.log(err));
          } catch (error) {
            console.log('Error occured');
          }
        } else {
          setStats(stats_cache['stats']);
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [props.model_name]);

  return (
    <div className="table-card">
      <div className="table-card-head">
        <h3>General</h3>
      </div>
      <div className="table-card-body">
        <table className="for-table">
          {props.model_name.split('_').length === 3 &&
          !props.model_name.includes('user_') ? (
            <tr className="for-table-row">
              <th className="for-table-head">
                Alpha
                <Tooltip className="performance-table-tooltip" title="Alpha">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </th>
              <td className="for-table-data" id="agg_profit">
                {stats[props.model_name] ? stats[props.model_name].alpha : null}
              </td>
              <th className="for-table-head">
                Beta
                <Tooltip className="performance-table-tooltip" title="Beta">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </th>
              <td className="for-table-data" id="agg_loss">
                {stats[props.model_name] ? stats[props.model_name].beta : null}
              </td>
            </tr>
          ) : (
            <tr className="for-table-row">
              <th className="for-table-head">
                Alpha
                <Tooltip className="performance-table-tooltip" title="Alpha">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </th>
              <td className="for-table-data" id="agg_profit">
                {stats[props.model_name] ? stats[props.model_name].alpha : null}
              </td>
              <th className="for-table-head">
                Beta
                <Tooltip className="performance-table-tooltip" title="Beta">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </th>
              <td className="for-table-data" id="agg_loss">
                {stats[props.model_name] ? stats[props.model_name].beta : null}
              </td>
            </tr>
          )}

          <tr className="for-table-row">
            <th className="for-table-head">
              Avg Daily PNL
              <Tooltip
                className="performance-table-tooltip"
                title="Average daily PNL"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name]
                ? stats[props.model_name].average_daily_pnl
                : null}
              {'%'}
            </td>
            <th className="for-table-head">
              R2 Score
              <Tooltip
                className="performance-table-tooltip"
                title="A measurement representing the descriptive power of the model. The closer the R2 score is to 1 the better the model is"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name]
                ? stats[props.model_name].r2_score
                : null}
            </td>
          </tr>
          <tr className="for-table-row">
            <th className="for-table-head">
              Sharpe
              <Tooltip
                className="performance-table-tooltip"
                title="The ratio of annualized yield over standard deviation of yield that the model has experienced. The higher the Sharpe ratio the more consistent a model performance is"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name] ? stats[props.model_name].sharpe : null}
            </td>
            <th className="for-table-head">
              Sortino
              <Tooltip
                className="performance-table-tooltip"
                title="The ratio of annualized yield over the negative standard deviation of yield that the model has experienced. The higher the Sortino ratio the less risky the model performance is"
              >
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip>
            </th>
            <td className="for-table-data">
              {stats[props.model_name] ? stats[props.model_name].sortino : null}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTableBacktest;
