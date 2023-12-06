import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useStateContext } from "../../../ContextProvider";

const DrawDownChart = (props) => {
  // const [series, setSeries] = useState([
  //   {
  //     data: [],
  //   },
  // ]);
  // const [pnl, setPnl] = useState([]);
  // useEffect(() => {
  //   fetch(process.env.REACT_APP_API+ `/${props.model_name}`, {
  //       method: "GET",

  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log("Data for cum pnl graph -->", data);
  //       var temp_pnl = [];
  //       for (var index = 0; index < data["response"].length; index++) {
  //         temp_pnl.push({
  //           x: new Date(
  //             parseInt(data["response"][index].ledger_timestamp) * 1000
  //           ).toLocaleString(),
  //           y: data["response"][index].drawdown,
  //         });
  //       }
  //       if (temp_pnl.length !== 0) {
  //         setPnl(temp_pnl);
  //         // console.log("Data for cum pnl graph -->", temp_pnl);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   setSeries([
  //     {
  //       data: pnl,
  //       name: "Drawdown",
  //     },
  //   ]);
  // }, [pnl]);

  const { drawdown_graph_cache, Set_drawdown_graph_cache } = useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!drawdown_graph_cache[props.model_name]) {
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
              y: data["response"][index].drawdown,
            });
          }

          // await delay(1000);
          if (cum_pnl.length != 0) {
            set_cum_pnl(cum_pnl);
            Set_drawdown_graph_cache({ [props.model_name]: cum_pnl });
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(drawdown_graph_cache[props.model_name]);

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
      type: "area",
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },

    plotOption: {
      area: {
        reverseNegativeShade: true,
        enableShade: true,
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: -10000,
              to: 0,
              color: "#FF2E2E",
            },
            {
              from: 10000,
              to: 6,
              color: "#16C784",
            },
          ],
        },
      },
    },

    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 10,
      floating: false,

      labels: {
        style: {
          colors: "#8e8da4",
        },
        offsetY: 0,
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
      // reverseNegativeShade: true,
      colors: ["#FF2E2E", "#FF2E2E"],
    },

    colors: ["#FF2E2E", "#FF2E2E", "#FF2E2E"],

    tooltip: {
      x: {
        format: "yyyy",
      },
      fixed: {
        enabled: false,
        position: "topRight",
      },
    },

    grid: {
      show: true,
      borderColor: "#43577533",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          offsetX: -30,
        },
      },
      padding: {
        left: -28,
      },
    },
  };

  return (
    <div className="negative-chart">
      <div className="container">
        <div id="chart">
          <ReactApexChart
            options={options}
            series={data_for_pnl_graph}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};
export default DrawDownChart;
