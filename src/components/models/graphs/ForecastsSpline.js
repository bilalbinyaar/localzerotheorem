import React from "react";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { heIL } from "@mui/x-data-grid";
import { useStateContext } from "../../../ContextProvider";

const ForecastsSpline = (props) => {
  const { forecast_spline_graph_cache, Set_forecast_spline_graph_cache } =
    useStateContext();
  // console.log("Chart pnl -->", props.model_name);
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);
  const [pnl, setPnl] = useState([]);
  useEffect(() => {
    if (!forecast_spline_graph_cache[props.model_name]) {
      fetch(process.env.REACT_APP_API + `/${props.model_name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Data for cum pnl graph -->", data);
          var temp_pnl = [];
          for (var index = 0; index < data["response"].length; index++) {
            temp_pnl.push({
              x: new Date(
                parseInt(data["response"][index].ledger_timestamp) * 1000
              ).toLocaleString(),
              y: data["response"][index].pnl_sum,
            });
          }
          if (temp_pnl.length != 0) {
            setPnl(temp_pnl);
            Set_forecast_spline_graph_cache({ [props.model_name]: temp_pnl });

            // console.log(
            //   "Data for caching model name  -->",
            //   props.model_name,
            //   temp_pnl
            // );
          }
        })
        .catch((err) => console.log(err));
    } else {
      setPnl(forecast_spline_graph_cache[props.model_name]);
      // console.log(
      //   "Data for caching model name  -->",
      //   props.model_name,
      //   forecast_spline_graph_cache[props.model_name]
      // );
    }
  }, []);

  useEffect(() => {
    setSeries([
      {
        data: pnl,
        name: "pnl",
      },
    ]);
  }, [pnl]);
  const options = {
    chart: {
      type: "area",
      height: 100,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },

    xaxis: {
      // min: 0,
      labels: {
        enabled: false,
        show: false,
      },
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      // tickAmount: 4,
      // floating: false,
      forceNiceScale: true,
      min: -7,

      labels: {
        show: false,
        style: {
          colors: "#8e8da4",
        },
        // offsetY: -7,
        // offsetX: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 0.5,
      type: "gradient",
      colors: ["#16C784", "#B32824"],
    },

    colors: ["#16C784", "#16C784", "#16C784"],

    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
      fixed: {
        enabled: false,
        position: "topRight",
      },
    },

    grid: {
      show: false,
      // yaxis: {
      //   lines: {
      //     offsetX: -30,
      //   },
      // },
      padding: {
        left: 0,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={100}
      />
    </div>
  );
};

export default ForecastsSpline;
