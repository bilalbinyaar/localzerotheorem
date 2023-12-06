import React, { useState, useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";
import { useStateContext } from "../ContextProvider";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Kelly_Growth_ApexCharts() {
  const { theme, link } = useStateContext();

  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [data_for_graph_historical, set_data_for_graph_historical] = useState(
    []
  );
  const forColor = (total_pnl, id) => {
    try {
      if (total_pnl < 0) {
        document
          .getElementById(`${id}`)
          .setAttribute("style", "color:#FF2E2E !important");
      } else if (total_pnl >= 0) {
        document
          .getElementById(`${id}`)
          .setAttribute("style", "color:#16C784 !important");
      }
    } catch { }
  };
  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(link + `/get/kelly_growth`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data_1 = [];

            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data_1.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].growth,
              });
            }

            if (temp_data_1.length != 0) {
              set_data_for_graph_historical(temp_data_1);

              // console.log("Here is the data for current position", temp_data);
            }
          });
      }
      setTimeout(() => {
        fetch(link + `/get/kelly_growth`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data_1 = [];

            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data_1.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].growth,
              });
            }

            if (temp_data_1.length != 0) {
              set_data_for_graph_historical(temp_data_1);

              // console.log("Here is the data for current position", temp_data);
            }
          });
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);
  const [datapoint1, setDatapoint1] = useState([]);

  const options = {
    theme: "light2",
    height: 300,

    backgroundColor: "transparent",

    axisX: {
      includeZero: false,
      labelFontSize: 11,
      gridColor: "#43577533",
      tickColor: "#43577533",
      lineColor: "#43577533",
      labelFontColor: theme == "dark-theme" ? "#fff" : "#000000",
    },

    axisY: {
      includeZero: false,
      labelFontSize: 11,
      labelFontColor: theme == "dark-theme" ? "#fff" : "#000000",

      gridColor: "#43577533",
      tickColor: "#43577533",
    },

    axisY2: {
      includeZero: true,
      gridColor: "#B5E5F5",
      tickColor: "#B5E5F5",
      labelFontSize: 10,
    },

    data: [
      {
        type: "line",
        // color: "#16C784",
        axisYType: "primary",
        labelFontSize: 10,
        gridColor: "#43577533",
        tickColor: "#43577533",
        showInLegend: true,
        name: "Growth Rate",
        dataPoints: data_for_graph_historical,
      },
    ],
  };
  //   ["#16C784", "#FF2E2E", "#F9A52B", "#4287f5", "#9B59B6"];
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Kelly_Growth_ApexCharts;
