import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ThreeDots } from "react-loader-spinner";
import { useStateContext } from "../../../ContextProvider";

const HeatMapChart = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { link } =
    useStateContext();
  const correlationMatrix = [
    [1, 0.8, 0.2, -0.5, -0.9],
    [0.8, 1, -0.3, 0.1, 0.6],
    [0.2, -0.3, 1, -0.9, -0.1],
    [-0.5, 0.1, -0.9, 1, 0.5],
    [-0.9, 0.6, -0.1, 0.5, 1],
  ];

  const variables = [
    "Strategy_1",
    "Strategy_2",
    "Strategy_3",
    "Strategy_4",
    "Strategy_5",
  ];

  const [correlations, setCorrelations] = useState([]);
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    try {
      fetch(
        link + "/get/live_correlations",
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
          var temp_correlations = [];
          for (var i = 0; i < data["response"].length; i++) {
            var temp_arr = [];
            for (let strategy_name in data["response"][i]) {
              if (parseFloat(data["response"][i][strategy_name])) {
                temp_arr.push(parseFloat(data["response"][i][strategy_name]));
              }
            }
            temp_correlations.push(temp_arr);
          }
          if (temp_correlations.length > 0) {
            // console.log("Correlations -->", temp_correlations);
            setCorrelations(temp_correlations);
            // console.log(temp_correlations);
            // console.log("Here are keys -->", Object.keys(data["response"][0]));
            var list_of_names = Object.keys(data["response"][0]);
            for (let i = 0; i < list_of_names; i++) {
              list_of_names[i] = list_of_names[i].replace(/_/g, "-");
            }
            // console.log("List of names -->", list_of_names);

            setStrategies(list_of_names);
            setIsLoaded(true);
            // console.log("Sortable -->", model_names);
            // const sorted = Object.keys(model_names)
            //   .map((key) => {
            //     return { ...model_names[key], key };
            //   })
            //   .sort((a, b) => b.total_pnl - a.total_pnl);
            // setStats(model_names);
            // Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } catch {
      console.log("Error occurred");
    }
  }, []);

  const series = strategies.map((variable, index) => ({
    // name: "Strategy",
    name: " " + variable.replace(/_/g, "-"),
    data: correlations[index],
  }));
  const xLables = strategies.map((variable, index) => [
    // name: "Strategy",
    " " + variable.replace(/_/g, "-"),
    // data: correlations[index],
  ]);

  const options = {
    chart: {
      // height: 350,
      type: "heatmap",
      toolbar: {
        show: false, // Hide the chart toolbar
      },
    },
    // legend: {
    //   position: "left",
    // },
    plotOptions: {
      heatmap: {
        shadeIntensity: 1,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            { from: -1, to: -0.5, name: "Strong Negative", color: "#FF0000" },
            { from: -0.5, to: -0.001, name: "Weak Negative", color: "#FFCC00" },
            { from: 0, to: 0, name: "No Correlation", color: "#FFFFFF" },
            { from: 0.001, to: 0.5, name: "Weak Positive", color: "#00CCFF" },
            { from: 0.5, to: 1, name: "Strong Positive", color: "#0000FF" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 1,
    },
    xaxis: {
      categories: xLables,
      labels: {
        style: {
          colors: "#000000",
        },
      },
    },
    yaxis: {
      // categories: series.name,
      opposite: false,
      forceNiceScale: false,
      floating: false,
      labels: {
        // minWidth: 0,
        // maxWidth: 500,
        align: "center",
        style: {
          colors: "#000000",
        },
      },
    },
    // title: {
    //   text: "HeatMap Chart with Color Range and Correlation",
    // },
  };

  return (
    <div className="container">
      {isLoaded ? (
        <ReactApexChart
          options={options}
          series={series}
          type="heatmap"
          height={350}
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

export default HeatMapChart;
