import React, { Component, useState, useEffect } from "react";
import CanvasJSReact from "../../../canvasjs.react";
import { useStateContext } from "../../../ContextProvider";

function CanvasjsSplineAreaChart(props) {
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const { negative_canvasjs_graph_cache, Set_negative_canvasjs_graph_cache, link } =
    useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    theme: "light2",
    animationEnabled: false,
  });
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  useEffect(() => {
    try {
      if (!negative_canvasjs_graph_cache[props.model_name]) {
        fetch(
          link + `/${props.model_name}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            var main_series = [];
            var temp_positive_series = [];
            var temp_negative_series = [];
            for (var index = 0; index < data["response"].length; index++) {
              if (index + 1 == data["response"].length) {
                if (temp_positive_series.length != 0) {
                  main_series.push({
                    type: "splineArea",
                    color: "#16c784",
                    markerType: "none",
                    fillOpacity: 0.4,
                    dataPoints: temp_positive_series,
                  });
                } else {
                  main_series.push({
                    type: "splineArea",
                    color: "#ff2e2e",
                    markerType: "none",
                    fillOpacity: 0.4,
                    dataPoints: temp_negative_series,
                  });
                }
              } else {
                if (parseInt(data["response"][index].pnl_sum) >= 0) {
                  if (temp_negative_series.length != 0) {
                    main_series.push({
                      type: "splineArea",
                      color: "#ff2e2e",
                      markerType: "none",
                      fillOpacity: 0.4,
                      dataPoints: temp_negative_series,
                    });
                    temp_negative_series = [];
                  } else {
                    temp_positive_series.push({
                      x: new Date(
                        parseInt(data["response"][index].ledger_timestamp) *
                        1000
                      ),
                      y: parseInt(data["response"][index].pnl_sum),
                    });
                  }
                } else {
                  if (temp_positive_series.length != 0) {
                    main_series.push({
                      type: "splineArea",
                      color: "#16c784",
                      markerType: "none",
                      fillOpacity: 0.4,
                      dataPoints: temp_positive_series,
                    });
                    temp_positive_series = [];
                  } else {
                    temp_negative_series.push({
                      x: new Date(
                        parseInt(data["response"][index].ledger_timestamp) *
                        1000
                      ),
                      y: parseInt(data["response"][index].pnl_sum),
                    });
                  }
                }
              }
            }
            // console.log("Testing data -->", main_series);

            if (main_series.length != 0) {
              set_cum_pnl(main_series);
              Set_negative_canvasjs_graph_cache({
                [props.model_name]: main_series,
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        set_cum_pnl(negative_canvasjs_graph_cache[props.model_name]);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [model_name]);

  useEffect(() => {
    try {
      if (cummulative_pnl.length != 0) {
        // console.log("Canvasjs data -->", cummulative_pnl);
        setOptions({
          backgroundColor: "transparent",
          theme: "light2",
          animationEnabled: false,
          data: cummulative_pnl,
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
          toolTip: {
            fontSize: 10,
            contentFormatter: (e) => {
              const date = CanvasJSReact.CanvasJS.formatDate(
                e.entries[0].dataPoint.x,
                "DD/MM/YYYY HH:mm:ss"
              );
              let content = `<strong>${date}</strong><br/><br/>`;

              e.entries.forEach((entry) => {
                content += `<span style="color: ${entry.dataPoint.color};">PNL</span>:  ${entry.dataPoint.y}<br/>`;
              });

              return content;
            },
          },
        });
      }
    } catch (error) {
      console.log("Error occured");
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

export default CanvasjsSplineAreaChart;
