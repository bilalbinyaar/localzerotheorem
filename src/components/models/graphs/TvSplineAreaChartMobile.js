import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { useState, memo } from "react";
import { useStateContext } from "../../../ContextProvider";
import { faSlash } from "@fortawesome/free-solid-svg-icons";

const TvSplineAreaChartMobile = (props) => {
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
              time: index,
              value: parseInt(data["response"][index].pnl_sum),
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
      //   console.log("Here is the values --->", data_for_pnl_graph);

      set_data_for_pnl_graph(cummulative_pnl);
    }
  }, [cummulative_pnl]);

  const chartContainerRef = useRef();
  const chartRef = useRef();

  //   const data = [];

  //   for (let i = 0; i < 100; i++) {
  //     const x = i;
  //     var y;
  //     if (i % 2 == 0) {
  //       y = i * 1;
  //       data.push({
  //         time: x,
  //         value: y,
  //       });
  //     } else {
  //       y = i * -1;
  //       data.push({
  //         time: x,
  //         value: y,
  //       });
  //     }
  //   }

  useEffect(() => {
    if (data_for_pnl_graph.length == 0) {
      return;
    } else {
      if (data_for_pnl_graph && chartContainerRef.current) {
        // console.log("Here is the values --->", data_for_pnl_graph);
        // Create a new chart
        chartRef.current = createChart(chartContainerRef.current, {
          //   width: 100,
          //   height: 100,
          priceLineVisible: false,

          rightPriceScale: {
            visible: false, // Set to false to hide the y-axis
          },
          handleScale: false, // Set to false to disable scaling
          handleScroll: false, // Set to false to disable scrolling
          handleZoom: false,
          handleScale: {
            visible: false,
            axisPressedMouseMove: {
              time: false,
              price: false,
            },
          },
          layout: {
            background: { color: "transparent" }, // Set background color to transparent
            textColor: "#000000",
          },
          crosshair: {
            // mode: CrosshairMode.Normal,
            visible: false,
          },
          grid: {
            vertLines: {
              visible: false,
              color: "#000000", // Set vertical grid lines color to transparent
              //   lineWidth: 1, // Set a fixed width for the vertical grid lines
            },
            horzLines: {
              visible: false,
              color: "#000000", // Set horizontal grid lines color to transparent
              //   lineWidth: 1, // Set a fixed width for the horizontal grid lines
            },
          },
          priceScale: {
            // borderColor: "#485c7b",
            visible: false,
            priceLineVisible: false,

            // borderWidth: 1, // Set a fixed width for the price scale borders
          },
          timeScale: {
            visible: false,
            borderColor: "#000000",
            borderWidth: 1, // Set a fixed width for the time scale borders
            maxBarSpacing: 20, // Set a maximum bar spacing to prevent bars from becoming too wide
          },
          // Set the container background color to transparent
          containerBackground: "#000000",
        });
        // chartRef.current.setMouseInteractionRectangleFit(false);

        // Add the area series
        const areaSeries = chartRef.current.addAreaSeries({
          priceLineVisible: false,
          // topColor: "rgba(0, 255, 0, 0.5)",
          // bottomColor: "rgba(255, 0, 0, 0.5)",
          // lineColor: "#ffffff",
          // lineWidth: 2,
        });

        const mappedData = data_for_pnl_graph.map(({ time, value }) => ({
          time,
          value,
          topColor: value >= 0 ? "#16c784" : "#ff2e2e",
          lineColor: value >= 0 ? "#16c784" : "#ff2e2e",
        }));

        areaSeries.setData(mappedData);

        // Set up the viewport
        chartRef.current.timeScale().fitContent();
      }

      return () => {
        if (chartRef.current) {
          chartRef.current.remove();
        }
      };
    }
  }, [data_for_pnl_graph]);

  return (
    <div
      className="best-performing-spline"
      ref={chartContainerRef}
      style={{ width: "175px", height: "60px" }} // Set a fixed width and height
    />
  );
};

export default TvSplineAreaChartMobile;
