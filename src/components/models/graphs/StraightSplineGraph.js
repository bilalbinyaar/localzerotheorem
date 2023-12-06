import React from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState, memo } from "react";
import { useStateContext } from "../../../ContextProvider";
const StraightSplineGraph = React.memo(({ model_name }) => {
  // console.log("I am re-rendered :(", model_name);

  const { straight_spline_graph_cache, Set_straight_spline_graph_cache } =
    useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!straight_spline_graph_cache[model_name]) {
      // console.log("I received model name for graph -->", model_name);

      fetch(link + `/${model_name}`, {
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
          for (var i = 0; i < data["response"].length; i++) {
            cum_pnl.push(data["response"][i].pnl_sum);
          }

          // await delay(1000);
          if (cum_pnl.length != 0) {
            set_cum_pnl(cum_pnl);
            Set_straight_spline_graph_cache({ [model_name]: cum_pnl });
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(straight_spline_graph_cache[model_name]);

      // console.log(
      //   "I am using cached value for straight spline graph -->",
      //   straight_spline_graph_cache[model_name]
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
      height: 40,
      width: 140,
      type: "area",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },

    fill: {
      type: "gradient",
      colors: ["#16C784", "#B32824"],
    },

    colors: ["#16C784", "#16C784", "#16C784"],

    grid: {
      show: false,
      padding: {
        right: 15,
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
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data_for_pnl_graph}
        type="area"
        height={40}
        width={110}
      />
    </div>
  );
});

export default memo(StraightSplineGraph);
