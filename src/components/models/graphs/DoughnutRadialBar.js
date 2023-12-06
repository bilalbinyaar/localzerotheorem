import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useStateContext } from "../../../ContextProvider";
import { ThreeDots } from "react-loader-spinner";

const DoughnutRadialBar = (props) => {
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const [stats, setStats] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [series, setSeries] = useState([]);
  const { stats_cache, Set_stats_cache } = useStateContext();
  useEffect(() => {
    if (
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

            // Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } else {
      if (Object.keys(stats_cache).length == 0) {
        fetch(link + "/get_stats", {
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

                rank: data["response"][i].rank,
                alpha: data["response"][i].alpha,
                beta: data["response"][i].beta,
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
              Set_stats_cache({ stats: model_names });

              // Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else {
        // console.log("I am using cached values of stats -->", stats_cache);
        setStats(stats_cache["stats"]);
      }
    }
  }, [model_name]);

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
        setSeries(data_for_stat);
        setIsLoaded(true);
        // console.log("Data for setting stat -->", data_for_stat);
      }
    }
  }, [stats]);

  const options = {
    labels: ["Win", "Loss"],
    colors: ["#16C784", "#FF2E2E"],
    chart: {
      width: 500,
      height: 300,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "40%",
          background: "transparent",
          image: undefined,
        },
        track: {
          background: "#a6a6a6",
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "right",
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
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
        <div>
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height={350}
          />{" "}
        </div>
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

export default DoughnutRadialBar;
