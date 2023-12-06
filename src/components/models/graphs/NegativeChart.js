import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useStateContext } from "../../../ContextProvider";

const NegativeChart = (props) => {
  const { negative_graph_cache, Set_negative_graph_cache } = useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!negative_graph_cache[props.model_name]) {
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
            Set_negative_graph_cache({ [props.model_name]: cum_pnl });
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(negative_graph_cache[props.model_name]);

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
          name: "pnl",
        },
      ]);
    }
  }, [cummulative_pnl]);

  const options = {
    chart: {
      height: 350,
    },

    // annotations: {
    //   yaxis: [
    //     {
    //       y: 0,
    //       y2: -100,
    //       fillColor: "#FF4560",
    //       borderColor: "#FF4560",
    //       strokeColor: "red",

    //       // label: {
    //       //   color: "#FF4560",
    //       //   style: {
    //       //     color: "#FF4560",
    //       //     background: "#FF4560",
    //       //   },
    //       //   // text: "Support",
    //       // },
    //     },
    //     // {
    //     //   y: 8600,
    //     //   y2: 9000,
    //     //   borderColor: "#000",
    //     //   fillColor: "#FEB019",
    //     //   opacity: 0.2,
    //     //   label: {
    //     //     borderColor: "#333",
    //     //     style: {
    //     //       fontSize: "10px",
    //     //       color: "#333",
    //     //       background: "#FEB019",
    //     //     },
    //     //     text: "Y-axis range",
    //     //   },
    //     // },
    //   ],
    //   points: [
    //     {
    //       x: new Date("01 Dec 2017").getTime(),
    //       y: 8607.55,
    //       marker: {
    //         size: 8,
    //         fillColor: "#fff",
    //         strokeColor: "red",
    //         radius: 2,
    //         cssClass: "apexcharts-custom-class",
    //       },
    //       label: {
    //         borderColor: "#FF4560",
    //         offsetY: 0,
    //         style: {
    //           color: "#fff",
    //           background: "#FF4560",
    //         },

    //         text: "Point Annotation",
    //       },
    //     },
    //     {
    //       x: new Date("08 Dec 2017").getTime(),
    //       y: 9340.85,
    //       marker: {
    //         size: 0,
    //       },
    //       image: {
    //         path: "../../assets/images/ico-instagram.png",
    //       },
    //     },
    //   ],
    // },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
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
      // min: 0,
      y: 0,

      // borderColor: "#00E396",

      labels: {
        style: {
          colors: "#8e8da4",
        },
        offsetY: -7,
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
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
      fixed: {
        enabled: false,
        position: "topRight",
      },
    },

    grid: {
      show: true,
      borderColor: "#43577533",
      yaxis: {
        labels: {
          padding: {
            left: -40,
          },
          offsetX: -60,
        },
      },
      xaxis: {
        lines: {
          show: false,
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
export default NegativeChart;
