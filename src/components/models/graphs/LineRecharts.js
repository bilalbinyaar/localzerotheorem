import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineRecharts = (props) => {
  const { negative_graph_cache, Set_negative_graph_cache, link } = useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!negative_graph_cache[props.model_name]) {
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
              name: new Date(
                parseInt(data["response"][index].ledger_timestamp) * 1000
              ).toLocaleString(),
              pnl: parseInt(data["response"][index].pnl_sum),
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
      set_data_for_pnl_graph(cummulative_pnl);
    }
  }, [cummulative_pnl]);

  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //   },
  //   {
  //     name: "Page C",
  //     uv: -1000,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 500,
  //   },
  //   {
  //     name: "Page E",
  //     uv: -2000,
  //   },
  //   {
  //     name: "Page F",
  //     uv: -250,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //   },
  // ];

  const gradientOffset = () => {
    const dataMax = Math.max(...data_for_pnl_graph.map((i) => i.pnl));
    const dataMin = Math.min(...data_for_pnl_graph.map((i) => i.pnl));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();
  return (
    <div className="containers">
      <ResponsiveContainer width={"80%"} height={300}>
        <AreaChart
          width={500}
          height={400}
          data={data_for_pnl_graph}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#16c784" stopOpacity={0.5} />
              <stop offset={off} stopColor="#ff2e2e" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="pnl"
            stroke="none"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineRecharts;
