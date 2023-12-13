import CanvasJSReact from '../../../canvasjs.react';
import { useStateContext } from '../../../ContextProvider';
import React, { useState, useEffect } from 'react';

const CanvasDoughnutBacktest = (props) => {
  const { stats_cache, Set_stats_cache, link } = useStateContext();

  const [model_name, set_model_name] = useState(null);

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [stats, setStats] = useState(null);

  const [options, setOptions] = useState({
    backgroundColor: 'transparent',
    theme: 'light2',
    data: [
      {
        type: 'doughnut',
        radius: '75%',
        indexLabel: '{name}: {y}',
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: 'Wins', y: 70, color: '#16c784' },
          { name: 'Losses', y: 30, color: '#ff2e2e' },
        ],
      },
    ],
  });
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
            model_names[props.model_name] = {
              strategy_name: data['response'][0].strategy_name,
              current_drawdown: data['response'][0].current_drawdown,
              curr_drawdown_duration:
                data['response'][0].curr_drawdown_duration,
              average_drawdown: data['response'][0].average_drawdown,
              average_drawdown_duration:
                data['response'][0].average_drawdown_duration,
              max_drawdown: data['response'][0].max_drawdown,
              max_drawdown_duration: data['response'][0].max_drawdown_duration,
              r2_score: data['response'][0].r2_score,
              sharpe: data['response'][0].sharpe,
              sortino: data['response'][0].sortino,
              total_pnl: data['response'][0].total_pnl,
              total_positive_pnl: data['response'][0].total_positive_pnl,
              total_negative_pnl: data['response'][0].total_negative_pnl,
              total_wins: data['response'][0].total_wins,
              total_losses: data['response'][0].total_losses,
              consective_wins: data['response'][0].consective_wins,
              consective_losses: data['response'][0].consective_losses,
              win_percentage: data['response'][0].win_percentage,
              loss_percentage: data['response'][0].loss_percentage,
              pnl_sum_1: data['response'][0].pnl_sum_1,
              pnl_sum_7: data['response'][0].pnl_sum_7,
              pnl_sum_15: data['response'][0].pnl_sum_15,
              pnl_sum_30: data['response'][0].pnl_sum_30,
              pnl_sum_45: data['response'][0].pnl_sum_45,
              pnl_sum_60: data['response'][0].pnl_sum_60,
              average_daily_pnl: data['response'][0].average_daily_pnl,
              win_loss_ratio: data['response'][0].win_loss_ratio,

              rank: data['response'][0].rank,
              alpha: data['response'][0].alpha,
              beta: data['response'][0].beta,
            };
            if (JSON.stringify(model_names) !== '{}') {
              setStats(model_names);
              set_model_name(props.model_name);
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

                  rank: data['response'][i].rank,
                };
              }
            }
            if (JSON.stringify(model_names) !== '{}') {
              setStats(model_names);
              set_model_name(props.model_name);
            }
          })
          .catch((err) => console.log(err));
      } else {
        if (model_name !== props.model_name) {
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
                setStats(model_names);
                set_model_name(props.model_name);
                Set_stats_cache({ stats: model_names });
                if (model_name !== props.model_name) {
                  set_model_name(props.model_name);
                }
              }
            })
            .catch((err) => console.log(err));
        } else {
          setStats(stats_cache['stats']);
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [props.model_name]);

  useEffect(() => {
    try {
      if (model_name == null) {
        return;
      } else {
        var data_for_stat = [];
        data_for_stat.push(stats[props.model_name].win_percentage);
        data_for_stat.push(stats[props.model_name].loss_percentage);

        if (data_for_stat.length !== 0) {
          setOptions({
            backgroundColor: 'transparent',
            theme: 'light2',
            toolTip: {
              fontSize: 10,
            },
            data: [
              {
                type: 'doughnut',
                radius: '75%',
                indexLabel: '{name}: {y}',
                yValueFormatString: "#,###'%'",
                dataPoints:
                  data_for_stat[1] !== 0
                    ? [
                        {
                          name: 'Wins',
                          y: data_for_stat[0],
                          color: '#16c784',
                        },
                        {
                          name: 'Losses',
                          y: data_for_stat[1],
                          color: '#ff2e2e',
                        },
                      ]
                    : [
                        {
                          name: 'Wins',
                          y: data_for_stat[0],
                          color: '#16c784',
                        },
                      ],
              },
            ],
          });
        }
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [model_name]);

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default CanvasDoughnutBacktest;
