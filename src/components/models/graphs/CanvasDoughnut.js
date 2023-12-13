import CanvasJSReact from '../../../canvasjs.react';
import { useStateContext } from '../../../ContextProvider';
import React, { useState, useEffect } from 'react';

const CanvasDoughnut = (props) => {
  const [model_name, set_model_name] = useState(null);
  if (model_name !== props.model_name && model_name != null) {
    set_model_name(props.model_name);
  }
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
  const { stats_cache, Set_stats_cache, link } = useStateContext();
  useEffect(() => {
    try {
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
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [model_name]);

  useEffect(() => {
    try {
      if (stats == null) {
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
                dataPoints: [
                  { name: 'Wins', y: data_for_stat[0], color: '#16c784' },
                  { name: 'Losses', y: data_for_stat[1], color: '#ff2e2e' },
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

export default CanvasDoughnut;
