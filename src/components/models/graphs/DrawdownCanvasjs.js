import React, { Component, useState, useEffect } from "react";
import CanvasJSReact from "../../../canvasjs.react";
import { useStateContext } from "../../../ContextProvider";

function DrawdownCanvasjs(props) {
  const { drawdown_canvasjs_graph_cache, Set_drawdown_canvasjs_graph_cache } =
    useStateContext();
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  // set_model_name(props.model_name);
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    theme: "light2",
    animationEnabled: false,
  });
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  // console.log("I am setting drawdown in cache -->", props.model_name);

  useEffect(() => {
    if (!drawdown_canvasjs_graph_cache[props.model_name]) {
      fetch(`https://zt-rest-api-3hwk7v5hda-uc.a.run.app/${props.model_name}`, {
        method: "get",
      })
        .then((response) => response.json())
        .then(async (data) => {
          var main_series = [];
          for (var index = 0; index < data["response"].length; index++) {
            main_series.push({
              x: new Date(
                parseInt(data["response"][index].ledger_timestamp) * 1000
              ),
              y: parseInt(data["response"][index].drawdown),
            });
          }
          // console.log("Testing data -->", main_series);

          if (main_series.length != 0) {
            set_cum_pnl([
              {
                type: "splineArea",
                color: "#ff2e2e",
                markerType: "none",
                fillOpacity: 0.4,
                dataPoints: main_series,
              },
            ]);
            Set_drawdown_canvasjs_graph_cache({
              [props.model_name]: main_series,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl([
        {
          type: "splineArea",
          color: "#ff2e2e",
          markerType: "none",
          fillOpacity: 0.4,
          dataPoints: drawdown_canvasjs_graph_cache[props.model_name],
        },
      ]);
    }
  }, [model_name]);

  useEffect(() => {
    if (cummulative_pnl.length != 0) {
      // console.log("Canvasjs data -->", cummulative_pnl);
      setOptions({
        backgroundColor: "transparent",
        theme: "light2",
        animationEnabled: false,
        data: cummulative_pnl,

        toolTip: {
          fontSize: 10,
          contentFormatter: (e) => {
            const date = CanvasJSReact.CanvasJS.formatDate(
              e.entries[0].dataPoint.x,
              "DD/MM/YYYY HH:mm:ss"
            );
            let content = `<strong>${date}</strong><br/><br/>`;

            e.entries.forEach((entry) => {
              content += `<span style="color: ${entry.dataPoint.color};">Drawdown</span> :  ${entry.dataPoint.y}<br/>`;
            });

            return content;
          },
        },

        axisY: {
          gridColor: "#43577533",
          labelFontColor: "rgb(55, 61, 63)",
          tickColor: "#43577533",
          labelFontSize: 10,
        },
        axisX: {
          labelFontColor: "rgb(55, 61, 63)",
          tickColor: "#43577533",
          lineColor: "#43577577",
          labelFontSize: 10,
        },
      });
    }
  }, [cummulative_pnl]);

  return (
    <div className="canvas-main-div">
      <div className="container">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
}

export default DrawdownCanvasjs;
