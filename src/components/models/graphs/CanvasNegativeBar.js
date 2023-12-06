import CanvasJSReact from "../../../canvasjs.react";
import { useStateContext } from "../../../ContextProvider";
import React, { useState, useEffect } from "react";

const CanvasNegativeBar = (props) => {
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const {
    individual_pnl_canvasjs_graph_cache,
    Set_individual_pnl_canvasjs_graph_cache, link
  } = useStateContext();
  const [cummulative_pnl, set_cum_pnl] = useState([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    dataPointWidth: 15,
    theme: "light2", //"light1", "dark1", "dark2"
    axisY: {
      includeZero: true,
      gridColor: "#43577533",
      tickColor: "#43577533",
    },

    axisX: {
      lineColor: "#43577577",
    },

    data: [],
  });

  useEffect(() => {
    try {
      if (!individual_pnl_canvasjs_graph_cache[props.model_name]) {
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
            // console.log("Debugging -->", props.model_name, data["response"]);
            var main_series = [];
            var temp_positive_series = [];
            var temp_negative_series = [];
            for (var index = 0; index < data["response"].length; index++) {
              if (index + 1 == data["response"].length) {
                if (temp_positive_series.length != 0) {
                  main_series.push({
                    type: "column",
                    color: "#16c784",
                    dataPoints: temp_positive_series,
                  });
                } else {
                  main_series.push({
                    type: "column",
                    color: "#ff2e2e",
                    dataPoints: temp_negative_series,
                  });
                }
              } else {
                if (parseFloat(data["response"][index].pnl) >= 0) {
                  if (temp_negative_series.length != 0) {
                    main_series.push({
                      type: "column",
                      color: "#ff2e2e",
                      dataPoints: temp_negative_series,
                    });
                    temp_negative_series = [];
                  } else {
                    temp_positive_series.push({
                      x: new Date(
                        parseInt(data["response"][index].ledger_timestamp) *
                        1000
                      ),
                      y: parseInt(data["response"][index].pnl),
                    });
                  }
                } else if (parseFloat(data["response"][index].pnl) < 0) {
                  if (temp_positive_series.length != 0) {
                    main_series.push({
                      type: "column",
                      color: "#16c784",
                      dataPoints: temp_positive_series,
                    });
                    temp_positive_series = [];
                  } else {
                    temp_negative_series.push({
                      x: new Date(
                        parseInt(data["response"][index].ledger_timestamp) *
                        1000
                      ),
                      y: parseInt(data["response"][index].pnl),
                    });
                  }
                }
              }
            }
            // console.log("Bar data -->", main_series, props.model_name);

            if (main_series.length != 0) {
              set_cum_pnl(main_series);
              Set_individual_pnl_canvasjs_graph_cache({
                [props.model_name]: main_series,
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        set_cum_pnl(individual_pnl_canvasjs_graph_cache[props.model_name]);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [model_name]);

  useEffect(() => {
    try {
      if (cummulative_pnl.length != 0) {
        // console.log("Negative data -->", cummulative_pnl);
        setOptions({
          backgroundColor: "transparent",
          type: "bar",

          dataPointWidth: 3,
          type: "column",

          xValueType: "dateTime",
          showInLegend: false,

          theme: "light2", //"light1", "dark1", "dark2"
          axisY: {
            includeZero: true,
            gridColor: "#43577533",
            tickColor: "#43577533",
            labelFontSize: 8,
          },

          axisX: {
            lineColor: "#43577577",
            interval: 50,
            labelFontSize: 8,
          },

          data: cummulative_pnl,
        });
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [cummulative_pnl]);

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default CanvasNegativeBar;
