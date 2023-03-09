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
      fetch("https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get_stats", {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data["msg"].length);
          var model_names = {};
          for (var i = 0; i < data["msg"].length; i++) {
            // console.log(data["msg"][i].strategy_name);
            model_names[data["msg"][i].strategy_name] = {
              strategy_name: data["msg"][i].strategy_name,
              current_drawdown: data["msg"][i].current_drawdown,
              curr_drawdown_duration: data["msg"][i].curr_drawdown_duration,
              average_drawdown: data["msg"][i].average_drawdown,
              average_drawdown_duration:
                data["msg"][i].average_drawdown_duration,
              max_drawdown: data["msg"][i].max_drawdown,
              max_drawdown_duration: data["msg"][i].max_drawdown_duration,
              r2_score: data["msg"][i].r2_score,
              sharpe: data["msg"][i].sharpe,
              sortino: data["msg"][i].sortino,
              total_pnl: data["msg"][i].total_pnl,
              total_positive_pnl: data["msg"][i].total_positive_pnl,
              total_negative_pnl: data["msg"][i].total_negative_pnl,
              total_wins: data["msg"][i].total_wins,
              total_losses: data["msg"][i].total_losses,
              consective_wins: data["msg"][i].consective_wins,
              consective_losses: data["msg"][i].consective_losses,
              win_percentage: data["msg"][i].win_percentage,
              loss_percentage: data["msg"][i].loss_percentage,
              pnl_sum_1: data["msg"][i].pnl_sum_1,
              pnl_sum_7: data["msg"][i].pnl_sum_7,
              pnl_sum_15: data["msg"][i].pnl_sum_15,
              pnl_sum_30: data["msg"][i].pnl_sum_30,
              pnl_sum_45: data["msg"][i].pnl_sum_45,
              pnl_sum_60: data["msg"][i].pnl_sum_60,
              average_daily_pnl: data["msg"][i].average_daily_pnl,
              win_loss_ratio: data["msg"][i].win_loss_ratio,

              rank: data["msg"][i].rank,
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
