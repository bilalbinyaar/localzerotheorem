import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useStateContext } from "../../../ContextProvider";
import { ThreeDots } from "react-loader-spinner";
import { Label } from "recharts";

const GradientDonut = (props) => {
  // console.log("Model name -->", props.model_name);
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const [isLoaded, setIsLoaded] = useState(false);

  const [stats, setStats] = useState(null);
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const { stats_cache, Set_stats_cache, link } = useStateContext();
  useEffect(() => {
    try {
      if (props.model_name.includes("collection")) {
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
            var model_names = [];
            var allocations = [];
            for (var i = 0; i < data["response"].length; i++) {
              // console.log(data["response"][i].strategy_name);
              model_names.push(data["response"][i].strategy_name);
              allocations.push(data["response"][i].portfolio_allocation);
            }
            if (model_name.length > 0) {
              // console.log("Sortable -->", model_names);

              // const sorted = Object.keys(model_names)
              //   .map((key) => {
              //     return { ...model_names[key], key };
              //   })
              //   .sort((a, b) => b.total_pnl - a.total_pnl);
              setSeries(allocations);
              setLabels(model_names);
              setIsLoaded(true);
              // console.log("Allocations ", allocations, data);
              // setIsLoaded(true);

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else if (
        props.model_name.includes("strategy") ||
        props.model_name.split("_").length == 3
      ) {
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
                portfolio_allocaton: data["response"][i].win_loss_ratio,
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

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else if (props.model_name.includes("user_")) {
        fetch(
          link + "/get_stats_backtest" +
          `/${props.model_name}_stats`,
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
            // console.log("Debug stats -->", data);
            var temp_stats = [];
            for (var i = 0; i < data["response"].length; i++) {
              // console.log(data["response"][i].strategy_name);
              temp_stats.push(data["response"][i].win_percentage);
              temp_stats.push(data["response"][i].loss_percentage);

              // model_names[data["response"][i].strategy_name] = {
              //   strategy_name: data["response"][i].strategy_name,
              //   current_drawdown: data["response"][i].current_drawdown,
              //   curr_drawdown_duration:
              //     data["response"][i].curr_drawdown_duration,
              //   average_drawdown: data["response"][i].average_drawdown,
              //   average_drawdown_duration:
              //     data["response"][i].average_drawdown_duration,
              //   max_drawdown: data["response"][i].max_drawdown,
              //   max_drawdown_duration: data["response"][i].max_drawdown_duration,
              //   r2_score: data["response"][i].r2_score,
              //   sharpe: data["response"][i].sharpe,
              //   sortino: data["response"][i].sortino,
              //   total_pnl: data["response"][i].total_pnl,
              //   total_positive_pnl: data["response"][i].total_positive_pnl,
              //   total_negative_pnl: data["response"][i].total_negative_pnl,
              //   total_wins: data["response"][i].total_wins,
              //   total_losses: data["response"][i].total_losses,
              //   consective_wins: data["response"][i].consective_wins,
              //   consective_losses: data["response"][i].consective_losses,
              //   win_percentage: data["response"][i].win_percentage,
              //   loss_percentage: data["response"][i].loss_percentage,
              //   pnl_sum_1: data["response"][i].pnl_sum_1,
              //   pnl_sum_7: data["response"][i].pnl_sum_7,
              //   pnl_sum_15: data["response"][i].pnl_sum_15,
              //   pnl_sum_30: data["response"][i].pnl_sum_30,
              //   pnl_sum_45: data["response"][i].pnl_sum_45,
              //   pnl_sum_60: data["response"][i].pnl_sum_60,
              //   average_daily_pnl: data["response"][i].average_daily_pnl,
              //   win_loss_ratio: data["response"][i].win_loss_ratio,

              //   rank: data["response"][i].rank,
              // };
            }
            if (temp_stats.length > 0) {
              // console.log("Sortable -->", model_names);

              // const sorted = Object.keys(model_names)
              //   .map((key) => {
              //     return { ...model_names[key], key };
              //   })
              //   .sort((a, b) => b.total_pnl - a.total_pnl);
              setStats(temp_stats);

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else if (props.model_name.includes("DailyWinsLosses")) {
        fetch(link + "/get/live_returns", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["response"].length);
            // console.log("Debug stats -->", data);
            var temp_stats = [];
            for (var i = 0; i < data["response"].length; i++) {
              // console.log(data["response"][i].strategy_name);
              var total =
                data["response"][i].daily_wins +
                data["response"][i].daily_losses;
              var loss_percentage = parseFloat(
                ((data["response"][i].daily_losses / total) * 100).toFixed(2)
              );
              var win_percentage = parseFloat(
                ((data["response"][i].daily_wins / total) * 100).toFixed(2)
              );
              temp_stats.push(win_percentage);
              temp_stats.push(loss_percentage);

              // model_names[data["response"][i].strategy_name] = {
              //   strategy_name: data["response"][i].strategy_name,
              //   current_drawdown: data["response"][i].current_drawdown,
              //   curr_drawdown_duration:
              //     data["response"][i].curr_drawdown_duration,
              //   average_drawdown: data["response"][i].average_drawdown,
              //   average_drawdown_duration:
              //     data["response"][i].average_drawdown_duration,
              //   max_drawdown: data["response"][i].max_drawdown,
              //   max_drawdown_duration: data["response"][i].max_drawdown_duration,
              //   r2_score: data["response"][i].r2_score,
              //   sharpe: data["response"][i].sharpe,
              //   sortino: data["response"][i].sortino,
              //   total_pnl: data["response"][i].total_pnl,
              //   total_positive_pnl: data["response"][i].total_positive_pnl,
              //   total_negative_pnl: data["response"][i].total_negative_pnl,
              //   total_wins: data["response"][i].total_wins,
              //   total_losses: data["response"][i].total_losses,
              //   consective_wins: data["response"][i].consective_wins,
              //   consective_losses: data["response"][i].consective_losses,
              //   win_percentage: data["response"][i].win_percentage,
              //   loss_percentage: data["response"][i].loss_percentage,
              //   pnl_sum_1: data["response"][i].pnl_sum_1,
              //   pnl_sum_7: data["response"][i].pnl_sum_7,
              //   pnl_sum_15: data["response"][i].pnl_sum_15,
              //   pnl_sum_30: data["response"][i].pnl_sum_30,
              //   pnl_sum_45: data["response"][i].pnl_sum_45,
              //   pnl_sum_60: data["response"][i].pnl_sum_60,
              //   average_daily_pnl: data["response"][i].average_daily_pnl,
              //   win_loss_ratio: data["response"][i].win_loss_ratio,

              //   rank: data["response"][i].rank,
              // };
            }
            if (temp_stats.length > 0) {
              // console.log("Sortable -->", model_names);

              // const sorted = Object.keys(model_names)
              //   .map((key) => {
              //     return { ...model_names[key], key };
              //   })
              //   .sort((a, b) => b.total_pnl - a.total_pnl);
              setStats(temp_stats);

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else {
        fetch(
          link + "/get_stat" +
          `/${props.model_name}`,
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
            // console.log("Debug stats -->", data);
            var temp_stats = [];
            for (var i = 0; i < data["response"].length; i++) {
              // console.log(data["response"][i].strategy_name);
              temp_stats.push(data["response"][i].win_percentage);
              temp_stats.push(data["response"][i].loss_percentage);

              // model_names[data["response"][i].strategy_name] = {
              //   strategy_name: data["response"][i].strategy_name,
              //   current_drawdown: data["response"][i].current_drawdown,
              //   curr_drawdown_duration:
              //     data["response"][i].curr_drawdown_duration,
              //   average_drawdown: data["response"][i].average_drawdown,
              //   average_drawdown_duration:
              //     data["response"][i].average_drawdown_duration,
              //   max_drawdown: data["response"][i].max_drawdown,
              //   max_drawdown_duration: data["response"][i].max_drawdown_duration,
              //   r2_score: data["response"][i].r2_score,
              //   sharpe: data["response"][i].sharpe,
              //   sortino: data["response"][i].sortino,
              //   total_pnl: data["response"][i].total_pnl,
              //   total_positive_pnl: data["response"][i].total_positive_pnl,
              //   total_negative_pnl: data["response"][i].total_negative_pnl,
              //   total_wins: data["response"][i].total_wins,
              //   total_losses: data["response"][i].total_losses,
              //   consective_wins: data["response"][i].consective_wins,
              //   consective_losses: data["response"][i].consective_losses,
              //   win_percentage: data["response"][i].win_percentage,
              //   loss_percentage: data["response"][i].loss_percentage,
              //   pnl_sum_1: data["response"][i].pnl_sum_1,
              //   pnl_sum_7: data["response"][i].pnl_sum_7,
              //   pnl_sum_15: data["response"][i].pnl_sum_15,
              //   pnl_sum_30: data["response"][i].pnl_sum_30,
              //   pnl_sum_45: data["response"][i].pnl_sum_45,
              //   pnl_sum_60: data["response"][i].pnl_sum_60,
              //   average_daily_pnl: data["response"][i].average_daily_pnl,
              //   win_loss_ratio: data["response"][i].win_loss_ratio,

              //   rank: data["response"][i].rank,
              // };
            }
            if (temp_stats.length > 0) {
              // console.log("Sortable -->", model_names);

              // const sorted = Object.keys(model_names)
              //   .map((key) => {
              //     return { ...model_names[key], key };
              //   })
              //   .sort((a, b) => b.total_pnl - a.total_pnl);
              // console.log("Stats --->", temp_stats);
              setStats(temp_stats);

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log("Error occured ", error);
    }
  }, [model_name]);

  useEffect(() => {
    try {
      if (stats == null) {
        return;
      } else {
        if (props.model_name.includes("collection")) {
          // var data_for_stat = [];
          // for (let i = 0; i < stats.length; i++) {
          //   data_for_stat.push(stats[props.model_name].portfolio_allocaton);
          // }
          // //console.log("Strategy -->", data["response"][i].strategy_name);
          // // data_for_stat.push(data["response"]);
          // if (data_for_stat.length >= 0) {
          //   setSeries(data_for_stat);
          //   setIsLoaded(true);
          //   // console.log("Data for setting stat -->", data_for_stat);
          // }
        } else if (
          props.model_name.includes("strategy") ||
          props.model_name.split("_").length == 3
        ) {
          var data_for_stat = [];
          // console.log("Backtest --->", stats);
          data_for_stat.push(stats[props.model_name].win_percentage);
          data_for_stat.push(stats[props.model_name].loss_percentage);
          setSeries(data_for_stat);
          setLabels(["Wins", "Losses"]);
          setIsLoaded(true);
          // console.log("Strategy -->", data["response"][i].strategy_name);
          // data_for_stat.push(data["response"]);
        } else {
          // var data_for_stat = [];
          // console.log("Backtest --->", stats);
          // data_for_stat.push(stats[props.model_name].win_percentage);
          // data_for_stat.push(stats[props.model_name].loss_percentage);
          //console.log("Strategy -->", data["response"][i].strategy_name);
          // data_for_stat.push(data["response"]);
          setSeries(stats);
          setLabels(["Wins", "Losses"]);
          setIsLoaded(true);
          // console.log("Data for setting stat -->", data_for_stat);
        }
      }
    } catch (error) {
      console.log("Error occured ", error);
    }
  }, [stats]);

  const options = {
    labels: labels,
    colors: props.model_name.includes("collection")
      ? [
        "#16C784",
        "#FF2E2E",
        "#F9A52B",
        "#4287f5",
        "#9B59B6",
        "#FFD700",
        "#00FFFF",
        "#FF1493",
        "#008080",
        "#DA6B85",
      ]
      : ["#16C784", "#FF2E2E"],
    chart: {
      width: 380,
      height: 260,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -70,
        endAngle: 290,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        return (
          val.replace(/_/g, "-") +
          "     " +
          opts.w.globals.series[opts.seriesIndex] +
          "%"
        );
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart" className="donut-chart">
      {isLoaded ? (
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={300}
          width={450}
        />
      ) : (
        <div className="container loader-container">
          <ThreeDots
            className="backtest-loader"
            color="#fddd4e"
            height={80}
            width={80}
          />
        </div>
      )}
    </div>
  );
};

export default GradientDonut;
