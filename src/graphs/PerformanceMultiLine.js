import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "../canvasjs.stock.react";
import { useStateContext } from "../ContextProvider";
import { ThreeDots } from "react-loader-spinner";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const PerformanceMultiLine = (props) => {
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
  const [dataPoints2, setDataPoints2] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const { individual_pnl_graph_cache, Set_individual_pnl_graph_cache } =
    useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    // console.log("I received model name for graph -->", props.model_name);
    if (
      props.model_name.includes("strategy") ||
      props.model_name.split("_").length == 3
    ) {
      fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/${props.model_name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          // console.log("I received data for each series -->", data["response"]);
          var cum_pnl = [];
          for (var index = 0; index < data["response"].length; index++) {
            if (
              (parseFloat(data["response"][index].pnl) != 0 ||
                parseFloat(data["response"][index].pnl) != -0) &&
              parseInt(data["response"][index].in_position) == 0
            ) {
              console.log(
                "Here is PNL -->",
                parseInt(data["response"][index].in_position) == 0
              );
              cum_pnl.push({
                x: new Date(
                  parseInt(data["response"][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data["response"][index].pnl),
              });
            }
          }

          // await delay(1000);
          if (cum_pnl.length != 0) {
            set_cum_pnl(cum_pnl);
            Set_individual_pnl_graph_cache({ [props.model_name]: cum_pnl });
            let len = data["response"].length - 1;
            let start_time = parseInt(data["response"][0].ledger_timestamp);
            let end_time = parseInt(data["response"][len].ledger_timestamp);
            let avg = (end_time - start_time) / 2;
            let result = avg + start_time;
            // console.log("Result -->", len, start_time, avg, result);
            // setStart(result);
            // setEnd(parseInt(data["response"][len].ledger_timestamp));
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_pnls`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          // console.log("I received data for each series -->", data["response"]);
          var cum_pnl = [];
          var cum_pnl_2 = [];
          for (var index = 0; index < data["response"].length; index++) {
            if (
              parseFloat(data["response"][index].pnl_sum) != 0 ||
              parseFloat(data["response"][index].pnl_sum) != -0
            ) {
              cum_pnl.push({
                x: new Date(
                  parseInt(data["response"][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data["response"][index].pnl_sum),
                smooth: false,
              });
              cum_pnl_2.push({
                x: new Date(
                  parseInt(data["response"][index].ledger_timestamp) * 1000
                ),
                y: parseFloat(data["response"][index].smooth_pnl_sum),
                smooth: true,
              });
            }
          }

          // await delay(1000);
          if (cum_pnl.length != 0) {
            set_cum_pnl(cum_pnl);
            setDataPoints2(cum_pnl_2);
            let len = data["response"].length - 1;
            let start_time = parseInt(data["response"][0].ledger_timestamp);
            let end_time = parseInt(data["response"][len].ledger_timestamp);
            let avg = (end_time - start_time) / 2;
            let result = avg + start_time;
            // console.log("Result -->", len, start_time, avg, result);
            // setStart(result);
            // setEnd(parseInt(data["response"][len].ledger_timestamp));
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    }
  }, [model_name]);

  useEffect(() => {
    if (cummulative_pnl.length != 0) {
      // console.log("Negative graph -->", cummulative_pnl);
      setDataPoints(cummulative_pnl);
      setIsLoaded(true);
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

  const options = {
    // title: {
    //   text: "React StockChart with Spline Area Chart",
    // },
    theme: "light2",
    backgroundColor: "transparent",

    rangeSelector: {
      enabled: false, //change it to true
    },
    // subtitles: [
    //   {
    //     text: "BTC/USD",
    //   },
    // ],
    charts: [
      {
        zoomEnabled: false, // Enable zoom

        axisX: {
          //   lineColor: "#43577533",
          labelFontSize: 10,
          crosshair: {
            enabled: false,
            snapToDataPoint: false,
            valueFormatString: "MMM DD YYYY",
          },
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
              if (entry.dataPoint.smooth == false) {
                content += `<span style="color: black;">PNL Sum: </span>${entry.dataPoint.y}<br/>`;
              } else {
                content += `<span style="color: black;">Smooth PNL Sum: </span>${entry.dataPoint.y}<br/>`;
              }
            });

            return content;
          },
        },
        legend: {
          fontSize: 15,
          verticalAlign: "top",
          horizontalAlign: "left",
          markerMargin: 4,
        },
        data: [
          {
            showInLegend: true,
            legendText: "PNL Sum",
            color: "#16c784",
            fontSize: 40,
            margin: 20, // Adjust the value as per your requirements

            type: "spline",
            yValueFormatString: "#,##0",
            legendMarkerBorderColor: "#008000",

            xValueType: "dateTime",
            dataPoints: dataPoints.map((point) => ({
              ...point,
              color: point.y >= 0 ? "#16c784" : "#ff2e2e",
              lineColor: point.y >= 0 ? "#16c784" : "#ff2e2e",
              legendMarkerColor: "#ff2e2e",
            })),
          },
          {
            showInLegend: true,
            type: "spline",
            legendText: "30d PNL Sum",
            color: "#fddd4e",

            yValueFormatString: "#,##0",
            // lineColor: "#fddd4e",
            xValueType: "dateTime",
            dataPoints: dataPoints2.map((point) => ({
              ...point,
              color: "#fddd4e",
              // lineColor: "#fddd4e",
            })),
          },
        ],
      },
    ],
    navigator: {
      enabled: flag,
      axisX: {
        labelFontSize: 10,
      },
      data: [
        {
          showInLegend: false,
          type: "spline",
          yValueFormatString: "#,##0",
          xValueType: "dateTime",
          dataPoints: dataPoints.map((point) => ({
            ...point,
            color: point.y >= 0 ? "#16c784" : "#ff2e2e",
            lineColor: point.y >= 0 ? "#16c784" : "#ff2e2e",
          })),
        },
        {
          showInLegend: false,
          type: "spline",
          yValueFormatString: "#,##0",
          xValueType: "dateTime",
          dataPoints: dataPoints2.map((point) => ({
            ...point,
            color: "#fddd4e",
            lineColor: "#fddd4e",
          })),
        },
      ],

      slider: {
        minimum: new Date(start * 1000),
        maximum: new Date(end * 1000),
        handleColor: "#fddd4e",
        handleBorderThickness: 5,
        handleBorderColor: "#fddd4e",
      },
    },
  };

  const containerProps = {
    // width: "100%",
    // height: "450px",
    margin: "auto",
  };

  return (
    <div>
      {isLoaded ? (
        <CanvasJSStockChart containerProps={containerProps} options={options} />
      ) : (
        <div className="container loader-container">
          <ThreeDots
            className="backtest-loader loader-responsiveness"
            color="#fddd4e"
            height={80}
            width={80}
          />
        </div>
      )}
    </div>
  );
};

export default PerformanceMultiLine;
