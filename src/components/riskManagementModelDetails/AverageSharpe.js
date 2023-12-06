import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "../../canvasjs.stock.react";
import { useStateContext } from "../../ContextProvider";
import { ThreeDots } from "react-loader-spinner";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// import PerformanceBarChart from "../../graphs/PerformanceBarChart";
function AverageSharpe(props) {
  const { theme } = useStateContext();

  const windowWidth = useRef(window.innerWidth);

  var flag = false;
  // if (windowWidth.current <= 480) {
  //   flag = false;
  // }
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);
  const [colors, setColors] = useState([
    "#16C784",
    "#FF2E2E",
    "#F9A52B",
    "#4287f5",
    "#9B59B6",
    "#FFD700",
    "#00FFFF",
    "#FF1493",
    "#008080",
    "#DA6B85",
  ]);
  useEffect(() => {
    // console.log("I received model name for graph -->", props.model_name);
    try {
      fetch(
        process.env.REACT_APP_API + `/get/live_risk_metrics`,
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
          // console.log("Individual pnl --->", data);
          // console.log("I received data for each series -->", data["response"]);
          var cum_pnl = [];
          for (var index = 0; index < data["response"].length; index++) {
            cum_pnl.push({
              label: data["response"][index].name,
              y: parseFloat(data["response"][index].sharpe),
              color: colors[index],
            });
          }

          // await delay(1000);
          if (cum_pnl.length != 0) {
            set_cum_pnl(cum_pnl);
            // console.log("R2 score -->", cum_pnl);
            // let len = data["response"].length - 1;
            // let start_time = parseInt(data["response"][0].ledger_timestamp);
            // let end_time = parseInt(data["response"][len].ledger_timestamp);
            // let avg = (end_time - start_time) / 2;
            // let result = avg + start_time;
            // console.log("Result -->", len, start_time, avg, result);
            // setStart(result);
            // setEnd(parseInt(data["response"][len].ledger_timestamp));
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("Error occured");
    }
  }, [model_name]);

  useEffect(() => {
    try {
      if (cummulative_pnl.length != 0) {
        // console.log("Negative graph -->", cummulative_pnl);
        setDataPoints(cummulative_pnl);
        setIsLoaded(true);
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

  const options = {
    // title: {
    //   text: "React StockChart with Spline Area Chart",
    // },
    theme: "light2",
    height: 300,
    dataPointWidth: 10,

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
        dataPointWidth: 30,

        axisX: {
          //   lineColor: "#43577533",
          labelFontSize: 11,
          labelAngle: 70,
          labelFontColor: theme == "dark-theme" ? "#fff" : "#000000",

          // crosshair: {
          //   enabled: false,
          //   snapToDataPoint: false,
          //   valueFormatString: "MMM DD YYYY",
          // },
        },
        axisY: {
          //   title: "Bitcoin Price",
          // prefix: "$",
          gridColor: "#43577533",
          tickColor: "#43577533",
          labelFontSize: 11,
          labelFontColor: theme == "dark-theme" ? "#fff" : "#000000",
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
            // const date = CanvasJSReact.CanvasJS.formatDate(
            //   e.entries[0].dataPoint.x,
            //   ""
            // );
            let content = ``;

            e.entries.forEach((entry) => {
              content += `
              <span style="color: ${entry.dataPoint.label};">Name: </span>${entry.dataPoint.label}<br/>
              <span style="color: ${entry.dataPoint.label};">Average Sharpe: </span>${entry.dataPoint.y}<br/>`;
            });

            return content;
          },
        },
        data: [
          {
            showInLegend: false,
            yValueFormatString: "#,##0",
            dataPointWidth: 20,

            // xValueType: "dateTime",
            dataPoints: dataPoints.map((point) => ({
              ...point,
              // color: colors[point.label],
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
      // data: [
      //   {
      //     showInLegend: false,
      //     yValueFormatString: "#,##0",
      //     // xValueType: "dateTime",
      //     dataPoints: dataPoints.map((point) => ({
      //       ...point,
      //       color: point.y >= 0 ? "green" : "red",
      //     })),
      //   },
      // ],

      // slider: {
      //   minimum: new Date(start * 1000),
      //   maximum: new Date(end * 1000),
      //   handleColor: "#fddd4e",
      //   handleBorderThickness: 5,
      //   handleBorderColor: "#fddd4e",
      // },
    },
  };

  const containerProps = {
    // width: "100%",
    // height: "450px",
    margin: "auto",
  };
  return (
    <div className="test-dr">
      <h2 className="for-mb-returns">Average Sharpe</h2>
      {/* <PerformanceBarChart model_name={"live_pnls"} /> */}
      {isLoaded ? (
        <CanvasJSStockChart containerProps={containerProps} options={options} />
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
}

export default AverageSharpe;
