import React from "react";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect, memo } from "react";
import { useStateContext } from "../../../ContextProvider";

const SplineGraph = (props) => {
  const { spline_graph_cache, Set_spline_graph_cache } = useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!spline_graph_cache[props.model_name]) {
      // console.log("I received model name for graph -->", props.model_name);

      fetch(process.env.REACT_APP_API + `/${props.model_name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          // console.log("I received data for each series -->", data["response"]);
          var cum_pnl = [];
          for (var index = 0; index < data["response"].length; index++) {
            cum_pnl.push({
              x: new Date(
                parseInt(data["response"][index].ledger_timestamp) * 1000
              ).toLocaleString(),
              y: data["response"][index].pnl_sum,
            });
          }

          // await delay(1000);
          if (cum_pnl.length != 0) {
            set_cum_pnl(cum_pnl);
            Set_spline_graph_cache({ [props.model_name]: cum_pnl });
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(spline_graph_cache[props.model_name]);

      // console.log(
      //   "I am using cached value for straight spline graph -->",
      //   straight_spline_graph_cache[props.model_name]
      // );
    }
  }, []);

  useEffect(() => {
    if (cummulative_pnl.length != 0) {
      set_data_for_pnl_graph([
        {
          data: cummulative_pnl,
        },
      ]);
    }
  }, [cummulative_pnl]);

  const options = {
    chart: {
      height: 100,
      type: "area",
      height: 200,
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
      labels: {
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
      tickAmount: 4,
      floating: false,
      forceNiceScale: true,
      min: -7,

      labels: {
        show: false,
        style: {
          colors: "#8e8da4",
        },
        offsetY: -5,
        offsetX: 0,
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
      enabled: false,
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
      yaxis: {
        lines: {
          offsetX: -30,
        },
      },
      // padding: {
      //   left: 10,
      // },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data_for_pnl_graph}
        type="area"
        height={100}
      />
    </div>
  );
};
export default memo(SplineGraph);
