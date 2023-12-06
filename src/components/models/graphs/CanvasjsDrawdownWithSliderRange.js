import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "../../../canvasjs.stock.react";
import { useStateContext } from "../../../ContextProvider";
import { ThreeDots } from "react-loader-spinner";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CanvasjsDrawdownWithSliderRange = (props) => {
  const windowWidth = useRef(window.innerWidth);

  var flag = true;
  if (windowWidth.current <= 480) {
    flag = false;
  }
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    theme: "light2",
    animationEnabled: false,
    rangeSelector: {
      enabled: false, //change it to true
    },
    navigator: {
      enabled: flag,

      axisX: {
        labelFontSize: 10,
      },
      slider: {
        handleColor: "#fddd4e",
        handleBorderThickness: 1,
        handleBorderColor: "#fddd4e",
        handleBorderThickness: 1,
        handleBorderColor: "#fddd4e",
      },
    },
  });
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const { drawdown_canvasjs_graph_cache, Set_drawdown_canvasjs_graph_cache } =
    useStateContext();
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    try {
      if (!drawdown_canvasjs_graph_cache[props.model_name]) {
        // console.log("I received model name for graph -->", props.model_name);

        fetch(
          process.env.REACT_APP_API + `/${props.model_name}`,
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
              main_series.push({
                x: new Date(
                  parseInt(data["response"][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data["response"][index].drawdown),
              });
            }
            // console.log("Testing data -->", main_series);

            if (main_series.length != 0) {
              let start_time = parseInt(data["response"][0].timestamp);
              let end_time = parseInt(
                data["response"][data["response"].length - 1].timestamp
              );
              let avg = (end_time - start_time) / 2;
              let result = avg + start_time;
              // console.log("Result -->", end_time, start_time, result, result2);
              // options.navigator.slider.minimum = new Date(result * 1000);
              // options.navigator.slider.maximum = new Date(
              //   parseInt(
              //     data["response"][data["response"].length - 1].timestamp
              //   ) * 1000
              // );
              setStart(result);
              setEnd(
                parseInt(
                  data["response"][data["response"].length - 1].timestamp
                )
              );
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
              setIsLoaded(true);
            }
            // console.log("Cum pnl -->", cum_pnl);
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
        setIsLoaded(true);

        // console.log(
        //   "I am using cached value for straight spline graph -->",
        //   straight_spline_graph_cache[props.model_name]
        // );
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [model_name]);

  useEffect(() => {
    try {
      if (cummulative_pnl.length != 0) {
        // console.log("Negative graph -->", cummulative_pnl);
        setDataPoints(cummulative_pnl);
        // console.log("I am here with values -->", start, end);
        setOptions({
          // title: {
          //   text: "React StockChart with Spline Area Chart",
          // },
          theme: "light2",
          backgroundColor: "transparent",

          // subtitles: [
          //   {
          //     text: "BTC/USD",
          //   },
          // ],
          charts: [
            {
              // rangeSelector: {
              //   enabled: false, //change it to true
              // },
              zoomEnabled: false, // Enable zoom

              axisX: {
                //   lineColor: "#43577533",
                labelFontSize: 10,
                gridColor: "#43577533",
                tickColor: "#43577533",
                lineThickness: 1,
                tickLength: 0,
                crosshair: {
                  enabled: false,
                  snapToDataPoint: false,
                  valueFormatString: "MMM DD YYYY",
                },
              },
              rangeSelector: {
                enabled: false, //change it to true
              },
              axisY: {
                //   title: "Bitcoin Price",
                // prefix: "$",
                gridColor: "#43577533",
                tickColor: "#43577533",
                labelFontSize: 10,
                crosshair: {
                  enabled: false,

                  snapToDataPoint: false,
                  valueFormatString: "$#,###.##",
                },
              },
              toolTip: {
                shared: true,
                fontSize: 10,

                contentFormatter: (e) => {
                  const date = CanvasJSReact.CanvasJS.formatDate(
                    e.entries[0].dataPoint.x,
                    "DD/MM/YYYY HH:mm:ss"
                  );
                  let content = `<strong>${date}</strong><br/><br/>`;

                  e.entries.forEach((entry) => {
                    content += `<span style="color: ${entry.dataPoint.color};">Drawdown: </span>${entry.dataPoint.y}<br/>`;
                  });

                  return content;
                },
              },
              data: cummulative_pnl,
            },
          ],
          navigator: {
            enabled: flag,
            axisX: {
              labelFontSize: 10,
            },
            data: cummulative_pnl,
            slider: {
              minimum: new Date(start * 1000),
              maximum: new Date(start * 1000),
              handleColor: "#000000",
              handleBorderThickness: 1,
              handleBorderColor: "#fddd4e",
            },
          },
        });
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [cummulative_pnl]);

  //   useEffect(() => {
  //     fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const dps = [];
  //         for (let i = 0; i < data.length; i++) {
  //           if (i % 2 === 0) {
  //             dps.push({
  //               x: new Date(data[i].date),
  //               y: 1 * Number(data[i].close),
  //             });
  //           } else {
  //             dps.push({
  //               x: new Date(data[i].date),
  //               y: -1 * Number(data[i].close),
  //             });
  //           }
  //         }
  //         setDataPoints(dps);
  //         setIsLoaded(true);
  //       });
  //   }, []);

  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto",
  };

  return (
    // <div>
    //   {isLoaded && (
    //     <CanvasJSStockChart containerProps={containerProps} options={options} />
    //   )}
    //   </div>
    <div className="canvas-main-div">
      {isLoaded ? (
        <div className="container">
          <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
          />
        </div>
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

export default CanvasjsDrawdownWithSliderRange;
