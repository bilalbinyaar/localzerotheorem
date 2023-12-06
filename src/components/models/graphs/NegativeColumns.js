import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useStateContext } from "../../../ContextProvider";

const NegativeColumns = (props) => {
  const { individual_pnl_graph_cache, Set_individual_pnl_graph_cache, link } =
    useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!individual_pnl_graph_cache[props.model_name]) {
      // console.log("I received model name for graph -->", props.model_name);

      fetch(link + `/${props.model_name}`, {
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
              y: data["response"][index].pnl,
            });
          }

          // await delay(1000);
          if (cum_pnl.length != 0) {
            set_cum_pnl(cum_pnl);
            Set_individual_pnl_graph_cache({ [props.model_name]: cum_pnl });
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(individual_pnl_graph_cache[props.model_name]);

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
      type: "bar",
      height: 250,
      toolbar: {
        show: true,
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
      padding: {
        left: -28,
      },
    },

    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: "#16C784",
            },
            {
              from: -60,
              to: 0,
              color: "#FF2E2E",
            },
          ],
        },
        columnWidth: "88%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 10,
      labels: {
        formatter: function (y) {
          return y.toFixed(0) + "%";
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        rotate: -90,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data_for_pnl_graph}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default NegativeColumns;
