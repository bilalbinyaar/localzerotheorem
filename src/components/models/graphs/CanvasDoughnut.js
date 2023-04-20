import CanvasJSReact from "../../../canvasjs.react";
import { useStateContext } from "../../../ContextProvider";
import React, { useState, useEffect } from "react";

const CanvasDoughnut = (props) => {
  // console.log("I am here with doughnut -->", props.model_name);
  const [model_name, set_model_name] = useState(null);
  if (model_name != props.model_name && model_name != null) {
    set_model_name(props.model_name);
  }
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [stats, setStats] = useState(null);

  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    theme: "light2",
    data: [
      {
        type: "doughnut",
        radius: "75%",
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Wins", y: 70, color: "#16c784" },
          { name: "Losses", y: 30, color: "#ff2e2e" },
        ],
      },
    ],
  });
  const { stats_cache, Set_stats_cache } = useStateContext();
  useEffect(() => {
    if (model_name != props.model_name) {
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

            // const sorted = Object.keys(model_names)
            //   .map((key) => {
            //     return { ...model_names[key], key };
            //   })
            //   .sort((a, b) => b.total_pnl - a.total_pnl);
            setStats(model_names);
            set_model_name(props.model_name);
            Set_stats_cache({ stats: model_names });
            if (model_name != props.model_name) {
              set_model_name(props.model_name);
            }
            // Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } else {
      // console.log("I am using cached values of stats -->", stats_cache);
      setStats(stats_cache["stats"]);
    }
  }, [model_name]);
  // if (model_name != props.model_name) {
  //   set_model_name(props.model_name);
  // }
  useEffect(() => {
    if (stats == null) {
      return;
    } else {
      var data_for_stat = [];
      data_for_stat.push(stats[props.model_name].win_percentage);
      data_for_stat.push(stats[props.model_name].loss_percentage);
      //console.log("Strategy -->", data["response"][i].strategy_name);
      // data_for_stat.push(data["response"]);
      if (data_for_stat.length !== 0) {
        setOptions({
          backgroundColor: "transparent",
          theme: "light2",
          toolTip: {
            fontSize: 10,
          },
          data: [
            {
              type: "doughnut",
              radius: "75%",
              indexLabel: "{name}: {y}",
              yValueFormatString: "#,###'%'",
              dataPoints: [
                { name: "Wins", y: data_for_stat[0], color: "#16c784" },
                { name: "Losses", y: data_for_stat[1], color: "#ff2e2e" },
              ],
            },
          ],
        });
        // console.log("Data for setting stat -->", data_for_stat);
      }
    }
  }, [model_name]);

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default CanvasDoughnut;
